import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketServiceService } from '../service/socket-service.service';
import { Storage } from '@ionic/storage-angular';
import { IonModal, Platform, AlertController } from '@ionic/angular';
import { HttpClient } from "@angular/common/http"
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-open-show',
  templateUrl: './open-show.page.html',
  styleUrls: ['./open-show.page.scss'],
})
export class OpenShowPage implements OnInit {
  //socket: any;
  socketInterval: any;
  acmeLogo = "assets/img/mode-select/acme.png";
  state = "assets/img/mode-select/unconnected.png";
  //心跳检测
  //heartBeatCheck: any;
  musicVolume: number = 20;
  musicList: any[];
  musicStr = "";
  @ViewChild("musicModal") modal: IonModal;
  subscription:Subscription;
  constructor(private socketServiceService: SocketServiceService, private storage: Storage, private httpClient: HttpClient,private alertController:AlertController) {

    console.log("初始化constructor")

    // this.socket = socketServiceService.getSocket();
    // if (this.socket != null) {
    //   this.addressInit();
    // }
    // this.heartBeatCheck = setTimeout(() => { this.heartBeatCheckOverTime() }, 60000)
    this.storage.get("showDefaultVolume").then(data => {
      this.musicVolume = data;
      if (this.musicVolume == null || isNaN(this.musicVolume)) {
        this.musicVolume = 20;
      }
    });

  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.socketInterval = setInterval(() => { this.checkSocketConnect() }, 5000);
    console.log("初始化willenter")

    this.subscription=this.socketServiceService.openShowSubject.subscribe((result)=>{
      console.log(result);
      console.log("订阅器收到信息");
      this.synchronizeSocket(result);
    })
  }
  ionViewWillLeave() {
    clearInterval(this.socketInterval);
    // clearTimeout(this.heartBeatCheck);
    this.subscription.unsubscribe();
  }
  // addressInit() {
  //   var that = this;
  //   this.socket.onData = function (data) {
  //     that.heartBeatCheckReset();
  //     let list = new TextDecoder('gbk').decode(data);

  //     if (!that.synchronizeSocket(list)) {
  //       if (list.substring(0, 3) == "###" && list.substring(list.length - 3, list.length) == "###") {

  //         console.log(that.musicStr);
  //         that.musicStr = list.replace(/#/g, '');

  //         console.log("--------------------------------------------------------------------")
  //         console.log(that.musicStr);
  //         that.httpClient.get(that.musicStr).subscribe((data: any[]) => {
  //           console.log("asdasd");
  //           that.musicList = data;
  //           console.log(that.musicList);
  //         })
  //       }
  //     }

  //   }
  //   if (this.socketServiceService.getSocketState() != 2) {
  //     this.state = "assets/img/mode-select/unconnected.png";
  //   } else {
  //     this.state = "assets/img/mode-select/connected.png";

  //   }
  // }
  show1Click(event){
    if (this.socketServiceService.getSocketState() != 2) {
      this.alertNoConnectTips();
      return;
    } else {
      this.state = "assets/img/mode-select/connected.png";
    }
    this.initView();
    event.target.src="assets/img/mode-select/show1Select.png";
    this.sendSocket("musictype_29");
    this.storage.get("showDefaultVolume").then(data => {
      this.musicVolume = data;
      if (this.musicVolume == null || isNaN(this.musicVolume)) {
        this.musicVolume = 20;
      }
    });
  }
  show2Click(event){
    if (this.socketServiceService.getSocketState() != 2) {
      this.alertNoConnectTips();
      return;
    } else {
      this.state = "assets/img/mode-select/connected.png";
    }
    this.initView();
    event.target.src="assets/img/mode-select/show2Select.png";
    this.sendSocket("musictype_30");
    this.storage.get("showDefaultVolume").then(data => {
      this.musicVolume = data;
      if (this.musicVolume == null || isNaN(this.musicVolume)) {
        this.musicVolume = 20;
      }
    });

  }
  show3Click(event){
    if (this.socketServiceService.getSocketState() != 2) {
      this.alertNoConnectTips();
      return;
    } else {
      this.state = "assets/img/mode-select/connected.png";
    }
    this.initView();
    event.target.src="assets/img/mode-select/show3Select.png";
    this.sendSocket("musictype_31");
    this.storage.get("showDefaultVolume").then(data => {
      this.musicVolume = data;
      if (this.musicVolume == null || isNaN(this.musicVolume)) {
        this.musicVolume = 20;
      }
    });

  }
  show4Click(event){
    if (this.socketServiceService.getSocketState() != 2) {
      this.alertNoConnectTips();
      return;
    } else {
      this.state = "assets/img/mode-select/connected.png";
    }
    this.initView();
    event.target.src="assets/img/mode-select/show4Select.png";
    this.sendSocket("musictype_32");
    this.storage.get("showDefaultVolume").then(data => {
      this.musicVolume = data;
      if (this.musicVolume == null || isNaN(this.musicVolume)) {
        this.musicVolume = 20;
      }
    });

  }

    //点击音量加号
    volumeAdd() {
      if(this.musicVolume<10){
        this.musicVolume = this.musicVolume + 1;
  
      }else{
        this.musicVolume = this.musicVolume + 5;
  
      }
      if (this.musicVolume > 100) {
        this.musicVolume = 100;
      }
  
      let dataString = "volume";
      if (this.musicVolume < 10) {
        dataString = dataString + "00" + this.musicVolume;
      } else if (this.musicVolume >= 10 && this.musicVolume < 100) {
        dataString = dataString + "0" + this.musicVolume;
  
      } else if (this.musicVolume == 100) {
        dataString = dataString + this.musicVolume;
  
      } else {
        dataString = dataString + "000";
      }
  
      this.sendSocket(dataString);
      console.log(this.musicVolume)
    }
    //点击音量减号
    volumeSub() {
      if(this.musicVolume<=10){
        this.musicVolume = this.musicVolume - 1;
  
      }else{
        this.musicVolume = this.musicVolume - 5;
  
      }
      if (this.musicVolume < 0) {
        this.musicVolume = 0;
      }
      let dataString = "volume";
      if (this.musicVolume < 10) {
        dataString = dataString + "00" + this.musicVolume;
      } else if (this.musicVolume >= 10 && this.musicVolume < 100) {
        dataString = dataString + "0" + this.musicVolume;
  
      } else if (this.musicVolume == 100) {
        dataString = dataString + this.musicVolume;
  
      } else {
        dataString = dataString + "000";
      }
  
      this.sendSocket(dataString);
      console.log(this.musicVolume)
    }
  //同步控制
  synchronizeSocket(socketStr: string) {
    let ifResult = false;

    switch (socketStr) {
      case "musictype_29":
        this.storage.get("showDefaultVolume").then(data => {
          this.musicVolume = data;
          if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20;
          }
        });
        ifResult=true;
        break;
      case "musictype_30":
        this.storage.get("showDefaultVolume").then(data => {
          this.musicVolume = data;
          if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20;
          }
        });
        ifResult=true;

        break;
      case "musictype_31":
        this.storage.get("showDefaultVolume").then(data => {
          this.musicVolume = data;
          if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20;
          }
        });
        ifResult=true;

        break;
      case "musictype_32":
        this.storage.get("showDefaultVolume").then(data => {
          this.musicVolume = data;
          if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20;
          }
        });
        ifResult=true;

        break;
    }

    if (socketStr.substring(0, 6) == "volume" && socketStr.length == 9) {
      console.log("音量同步" + socketStr.substring(6, socketStr.length));
      let volume = parseInt(socketStr.substring(6, socketStr.length));
      this.musicVolume = volume;
      ifResult = true;
    }
    // if (socketStr.substring(0, 9) == "initvoice") {

    //   console.log("参数同步")

    //   let parameterSync=socketStr.substring(9,socketStr.length);
    //   let parameterSyncs=parameterSync.split("|");
    //   console.log(parameterSyncs.length);
    //   console.log(parameterSyncs);
    //   this.storage.set("birthdaysDefaultVolume",parseInt(parameterSyncs[0]));
    //   console.log(parameterSyncs[0]);
    //   this.storage.set("christmasDefaultVolume",parseInt(parameterSyncs[1]));
    //   console.log(parameterSyncs[1]);
    //   this.storage.set("conversationDefaultVolume",parseInt(parameterSyncs[2]));
    //   console.log(parameterSyncs[2]);
    //   this.storage.set("dancemusicDefaultVolume",parseInt(parameterSyncs[3]));
    //   console.log(parameterSyncs[3]);
    //   this.storage.set("showDefaultVolume",parseInt(parameterSyncs[4]));
    //   console.log(parameterSyncs[4]);
    //   this.storage.set("liquorDefaultVolume",parseInt(parameterSyncs[24]));
    //   console.log(parameterSyncs[24]);
    //   this.storage.set("danceDefaultVolume",parseInt(parameterSyncs[25]));
    //   console.log(parameterSyncs[25]);

    //     console.log("开场秀延迟时间");
    //     console.log(parameterSyncs[5]);
    //     console.log(parameterSyncs[6]);
    //     console.log(parameterSyncs[7]);
    //     console.log(parameterSyncs[8]);

    //     this.storage.set("delayShowTime",parameterSyncs[5]);
    //     this.storage.set("delayShowTime2",parameterSyncs[6]);
    //     this.storage.set("delayShowTime3",parameterSyncs[7]);
    //     this.storage.set("delayShowTime4",parameterSyncs[8]);
    //     //产品列表演示视频音量
    //     this.storage.set("videoDelayTime1",parameterSyncs[9]);
    //     this.storage.set("videoDelayTime2",parameterSyncs[10]);
    //     this.storage.set("videoDelayTime3",parameterSyncs[11]);
    //     this.storage.set("videoDelayTime4",parameterSyncs[12]);
    //     this.storage.set("videoDelayTime5",parameterSyncs[13]);
    //     this.storage.set("videoDelayTime6",parameterSyncs[14]);
    //     this.storage.set("videoDelayTime7",parameterSyncs[15]);
    //     this.storage.set("videoDelayTime8",parameterSyncs[16]);
    //     this.storage.set("videoDelayTime9",parameterSyncs[17]);
    //     this.storage.set("videoDelayTime10",parameterSyncs[18]);
    //     this.storage.set("videoDelayTime11",parameterSyncs[19]);
    //     this.storage.set("videoDelayTime12",parameterSyncs[20]);
    //     this.storage.set("videoDelayTime13",parameterSyncs[21]);
    //     this.storage.set("videoDelayTime14",parameterSyncs[22]);
    //     this.storage.set("videoDelayTime15",parameterSyncs[23]);

      
    //   ifResult = true;

    // }
    return ifResult;

  }
  modalOpen() {
    this.modal.present();
  }
  closeModal() {
    this.modal.dismiss();
  }
  //初始化页面
  initView() {
    let show1 = document.getElementById("show1") as HTMLImageElement
    let show2 = document.getElementById("show2") as HTMLImageElement
    let show3 = document.getElementById("show3") as HTMLImageElement
    let show4 = document.getElementById("show4") as HTMLImageElement
    show1.src = "assets/img/mode-select/show1.png";
    show2.src = "assets/img/mode-select/show2.png";
    show3.src = "assets/img/mode-select/show3.png";
    show4.src = "assets/img/mode-select/show4.png";

  }



  sendSocket(musicType) {
    this.socketServiceService.sendSocketData(musicType);


  }
  async checkSocketConnect() {
    console.log("检查socket");
    // console.log("-------------------------------"+this.socketServiceService.getSocketState()+"-------------------------------------")
    //心跳检测
    this.sendSocket("checkConnect");

    if (this.socketServiceService.getSocketState() != 2) {
      console.log("未连接")
      this.state = "assets/img/mode-select/unconnected.png";
    } else {
      console.log("连接")

      this.state = "assets/img/mode-select/connected.png";

    }
  }
  //心跳检测超时
  // heartBeatCheckOverTime() {
  //   console.log("超时!")
  //   if (this.socket != null) {
  //     this.socket.close();

  //   }
  //   clearTimeout(this.heartBeatCheck);
  //   this.heartBeatCheck = setTimeout(() => { this.heartBeatCheckOverTime() }, 60000);

  // }
  // //心跳检测未超时
  // heartBeatCheckReset() {
  //   console.log("心跳返回!")
  //   clearTimeout(this.heartBeatCheck);
  //   this.heartBeatCheck = setTimeout(() => { this.heartBeatCheckOverTime() }, 60000);
  // }
    //弹出未连接提示
    async alertNoConnectTips(){
      const alert= await this.alertController.create({
        header:"提示",
        message:"指挥家设备未连接,请等待指挥家设备连接",
        cssClass:'alertBlackBackground',
        buttons:["确认"]
      })
      alert.present();
    }
}
