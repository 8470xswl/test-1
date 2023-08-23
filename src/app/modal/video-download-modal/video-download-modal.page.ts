import { Component,Input, OnInit } from '@angular/core';
import { MediaData } from '../../models/media-data';
import { SocketJsonData } from '../../models/socket-json-data';
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-video-download-modal',
  templateUrl: './video-download-modal.page.html',
  styleUrls: ['./video-download-modal.page.scss'],
})
export class VideoDownloadModalPage implements OnInit {
  @Input() videoList:MediaData[];
  @Input() socket:any;
  videoStr="";
  resultData:SocketJsonData;
  constructor(public modalController: ModalController) {

    console.log("modal打开")
   }

  ngOnInit() {
    this.initSocketOnData();

  }
  musicSelectChange(music){
    console.log(music.fileName);
  }
  downloadMusic(){
    let downloadList={"op":"downFile",param:[]};
    this.videoList.forEach(element => {
      if(element.ifChecked==true){
        console.log(element.id)
        downloadList.param.push(element.id)
        element.downNum=-999;
      }
    });
   
    this.sendSocket( JSON.stringify(downloadList));
    console.log(downloadList.param);;
  }
  selectAll(){
    this.videoList.forEach(element => {
      element.ifChecked=true;
    });
  }
  unSelectAll(){
    this.videoList.forEach(element => {
      element.ifChecked=false;
    });
  }
  deleteMusic(){
    let deleteList={"op":"deleteFile",param:[]};
    this.videoList.forEach(element => {
      if(element.ifChecked==true){
        console.log(element.id)
        deleteList.param.push(element.id)
        // element.downNum=-999;
      }
    });
   
    this.sendSocket( JSON.stringify(deleteList));

  }
  closeModal(){
    this.modalController.dismiss();
  }
  getById(){

  }
  initSocketOnData(){
    let that=this;
    console.log(1);
    console.log(this.socket)
    this.socket.onData = function (data) {

      console.log(data);
      let list = new TextDecoder('gbk').decode(data);
      that.videoStr=that.videoStr+list;
      console.log(that.videoStr.substring(0,4));
      if(that.videoStr.substring(0,4)=="AAFF"){
        console.log(that.videoStr.substring(that.videoStr.length-4,that.videoStr.length));
        if(that.videoStr.substring(that.videoStr.length-4,that.videoStr.length)=="DCEC"){
          try{
            that.videoStr=that.videoStr.substring(4,that.videoStr.length-4);
            console.log(that.videoStr);
            // that.videoList = JSON.parse(that.videoStr);  
            that.resultData=JSON.parse(that.videoStr);
            if(that.resultData.op=="downFile"){
              that.videoList.forEach(element => {
                console.log(element.id);
                if(element.id==that.resultData.num_data){
                  element.progress=that.resultData.progress;
                  console.log("-------------");

                  console.log(element.progress);
                  if(that.resultData.status==3){
                    element.downNum=1;

                  }
                }
              });
            }else if(that.resultData.op=="deleteFile"){

              let deletefiles:MediaData[];
              that.resultData.array_data.forEach(deleteFile => {
                deletefiles.push(...that.videoList.filter(function(value,index,arr){
                  return value.id==deleteFile;
                }))
                
                
              })
              deletefiles.forEach(deletefile=>{
                console.log(deletefile.fileName);
                deletefile.downNum=0;
              })
            }
          }catch(e){

          }finally{
            that.videoStr="";

          }
        }
      }else{
        that.videoStr="";
      }
      console.log("视频modalSocket");

     };

  }
  sendSocket(dataString) {
    var data = new Uint8Array(dataString.length);
    for (var i = 0; i < data.length; i++) {
      data[i] = dataString.charCodeAt(i);
    }
    if (this.socket != null) {
      this.socket.write(data);

    }
  }
}
