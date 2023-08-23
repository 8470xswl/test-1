import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-light-storage-record',
  templateUrl: './light-storage-record.page.html',
  styleUrls: ['./light-storage-record.page.scss'],
})
export class LightStorageRecordPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goLightStoreOperator(operator){
    //this.router.navigate(['/parameter-setting-tabs/light-storage-record/changge']);

  }
  ionViewWillEnter() {
    console.log("进入light-storage-record")
  }
  ionViewWillLeave() {
    console.log("离开lightstorage");
  }
}
