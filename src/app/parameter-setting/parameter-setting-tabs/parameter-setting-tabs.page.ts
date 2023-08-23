import { Component, OnInit } from "@angular/core"
import { Storage } from "@ionic/storage-angular"
import { ConfigService } from "src/app/Util/configService"
import { TranslateText } from "src/app/Util/tranlateText"
import { DefaultMenuSettingService } from "src/app/service/default-menu-setting.service"
@Component({
    selector: "app-parameter-setting-tabs",
    templateUrl: "./parameter-setting-tabs.page.html",
    styleUrls: ["./parameter-setting-tabs.page.scss"],
})
export class ParameterSettingTabsPage implements OnInit {
    translateText = TranslateText.parameterSettings.tabs
    lightRecording: boolean = false

    //烟机和视频(产品中心)延迟时间，默认为0
    // showState:number=0;
    // videoState:number=0;
    constructor(private storage: Storage, public defaultMenuSettingService: DefaultMenuSettingService) {
        this.lightRecording = ConfigService.getParameterSettings().lightRecording
    }

    ngOnInit() {}
    async ionViewWillEnter() {
        console.log("进入tabs")
        // this.showState=await this.storage.get("showState");
        // if(this.showState==null){
        //   this.showState=0;
        // }
        // this.videoState=await this.storage.get("videoState");
        // if(this.videoState==null){
        //   this.videoState==0;
        // }
    }
}
