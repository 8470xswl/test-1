import { Component, OnInit, ViewChild } from '@angular/core';
import { WebToolService } from 'src/app/service/web-tool.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController, IonButton, IonModal } from '@ionic/angular';
import { SocketServiceService } from 'src/app/service/socket-service.service';
import { Subscription } from 'rxjs';
import { TranslateText } from 'src/app/Util/tranlateText';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
})
export class RecordListPage implements OnInit {
  translateText = TranslateText.parameterSettings.recordList
  recordList:any[]=[];
  recordDetailChannel="";
  recordDetailDmxAddr="";
  recordDetailUid="";
  recordDetailPort="";
  @ViewChild("recordModal") modal:IonModal;
  subscription: Subscription;
  constructor(private webToolService:WebToolService,private storage: Storage,private alertController:AlertController,private socketService:SocketServiceService) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    
    this.getData();
    this.subscription = this.socketService.recordListSubject.subscribe((result) => {
      console.log(result);
      console.log("订阅器收到信息");
      if(result.includes("3E5")){
        this.refreshData();
      }
      
    })
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  refreshData(){
    this.getData();
  }
  async getData(){
    let address = await this.storage.get("address");

    this.webToolService.getRecordList(address).subscribe((data:any)=>{
      this.recordList=data.data;
      console.log(this.recordList);
    })
  }
  async getAlert(record:any){
    let errorCode=record.error_code;
    if(record.error_code=="OK"){
      errorCode="无"
    }
    let recordMessage=`设备信息<br>机型:${record.product_name}<br>UID:${record.mo_uid}<br>通道模式:${record.type}<br>DMX通道数:${record.channel}<br>DMX地址:${record.addr}<br>记录时间:${record.update_time}<br>model_id:${record.model_id}<br>设备使用时间:${record.run_time}<br>光源使用时间:${record.light_time}`;
    const alert=await this.alertController.create({
      header:"异常信息",
      subHeader:errorCode,
      message:recordMessage,
      buttons:['确认']
    })
    alert.present();
  }
  async editRecord(record){
    let modalButt=document.getElementById("recordDetail-modal");
    this.recordDetailChannel=record.type;
    this.recordDetailDmxAddr=record.addr;
    this.recordDetailPort=record.port;
    this.recordDetailUid=record.mo_uid;
    modalButt.click();
  }
  cancelModal(){
    this.modal.dismiss();
  }
  sendRecordEdit(){
    let channelSocketStr=`00E0|${this.recordDetailPort}|${this.recordDetailUid}|${this.recordDetailChannel}`;
    let dmxSocketStr=`00F0|${this.recordDetailPort}|${this.recordDetailUid}|${this.recordDetailDmxAddr}`
    this.socketService.sendSocketData(channelSocketStr);
    this.socketService.sendSocketData(dmxSocketStr);
    this.refreshData();
    this.modal.dismiss();
  }
}
