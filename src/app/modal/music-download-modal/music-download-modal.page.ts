import { Component,Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { MediaData } from '../../models/media-data';
import { SocketJsonData } from '../../models/socket-json-data';

@Component({
  selector: 'app-music-download-modal',
  templateUrl: './music-download-modal.page.html',
  styleUrls: ['./music-download-modal.page.scss'],
})
export class MusicDownloadModalPage implements OnInit {
  @Input() musicList:MediaData[];
  @Input() socket:any;
  musicStr="";
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
    this.musicList.forEach(element => {
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
    this.musicList.forEach(element => {
      element.ifChecked=true;
    });
  }
  unSelectAll(){
    this.musicList.forEach(element => {
      element.ifChecked=false;
    });
  }
  deleteMusic(){
    let deleteList={"op":"deleteFile",param:[]};
    this.musicList.forEach(element => {
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
      that.musicStr=that.musicStr+list;
      console.log(that.musicStr.substring(0,4));
      if(that.musicStr.substring(0,4)=="AAFF"){
        console.log(that.musicStr.substring(that.musicStr.length-4,that.musicStr.length));
        if(that.musicStr.substring(that.musicStr.length-4,that.musicStr.length)=="DCEC"){
          try{
            that.musicStr=that.musicStr.substring(4,that.musicStr.length-4);
            console.log(that.musicStr);
            // that.musicList = JSON.parse(that.musicStr);  
            that.resultData=JSON.parse(that.musicStr);
            if(that.resultData.op=="downFile"){
              that.musicList.forEach(element => {
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

              // let deletefiles:MediaData[];
              // that.resultData.array_data.forEach(deleteFile => {
              //   deletefiles.push(...that.musicList.filter(function(value,index,arr){
              //     return value.id==deleteFile;
              //   }))
                
                
              // })
              // deletefiles.forEach(deletefile=>{
              //   console.log(deletefile.fileName);
              //   deletefile.downNum=0;
              // })
            }
          }catch(e){

          }finally{
            that.musicStr="";

          }
        }
      }else{
        that.musicStr="";
      }
      console.log("音频modalSocket");

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
