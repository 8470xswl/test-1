import { Component, OnInit } from "@angular/core"
import { Storage } from "@ionic/storage-angular"
import { SocketServiceService } from "../../service/socket-service.service"
import { ToastController, AlertController } from "@ionic/angular"
import { TranslateText } from "src/app/Util/tranlateText"

@Component({
    selector: "app-smoke-setting",
    templateUrl: "./smoke-setting.page.html",
    styleUrls: ["./smoke-setting.page.scss"],
})
export class SmokeSettingPage implements OnInit {
    translateText = TranslateText.parameterSettings.smokeSetting
    //出烟时间
    openIngTime: number = 0
    //间隔时间
    intervalTime: number = 0
    //烟机地址
    smokeAddress: number = 0
    //烟机端口
    smokePort: number = 0
    //烟机模式 smoking0=烟机 smoking1=烟雾系统
    smokeStyle: string = "smoking1"
    //大
    bigChannel1: number
    bigChannel2: number
    bigChannel3: number
    bigChannel4: number
    bigChannel5: number
    // bigChannel6:number;
    // bigChannel7:number;
    // bigChannel8:number;
    // bigChannel9:number;
    // bigChannel10:number;
    //中
    midChannel1: number
    midChannel2: number
    midChannel3: number
    midChannel4: number
    midChannel5: number
    // midChannel6:number;
    // midChannel7:number;
    // midChannel8:number;
    // midChannel9:number;
    // midChannel10:number;
    //小
    smallChannel1: number
    smallChannel2: number
    smallChannel3: number
    smallChannel4: number
    smallChannel5: number
    // smallChannel6:number;
    // smallChannel7:number;
    // smallChannel8:number;
    // smallChannel9:number;
    // smallChannel10:number;
    //关机
    closeChannel1: number
    closeChannel2: number
    closeChannel3: number
    closeChannel4: number
    closeChannel5: number
    // closeChannel6:number;
    // closeChannel7:number;
    // closeChannel8:number;
    // closeChannel9:number;
    // closeChannel10:number;

    constructor(
        private storage: Storage,
        private socketServiceService: SocketServiceService,
        private toastController: ToastController,
        private alertController: AlertController
    ) {}

    ngOnInit() {}
    ionViewWillEnter() {
        this.init()
    }
    async init() {
        this.openIngTime = await this.storage.get("openIngTime")
        this.intervalTime = await this.storage.get("intervalTime")
        this.smokeAddress = await this.storage.get("smokeAddress")
        this.smokePort = await this.storage.get("smokePort")
        this.smokeStyle = await this.storage.get("smokeStyle")

        this.bigChannel1 = await this.storage.get("bigChannel1")
        this.bigChannel2 = await this.storage.get("bigChannel2")
        this.bigChannel3 = await this.storage.get("bigChannel3")
        this.bigChannel4 = await this.storage.get("bigChannel4")
        this.bigChannel5 = await this.storage.get("bigChannel5")
        // this.bigChannel6=await this.storage.get("bigChannel6");
        // this.bigChannel7=await this.storage.get("bigChannel7");
        // this.bigChannel8=await this.storage.get("bigChannel8");
        // this.bigChannel9=await this.storage.get("bigChannel9");
        // this.bigChannel10=await this.storage.get("bigChannel10");

        this.midChannel1 = await this.storage.get("midChannel1")
        this.midChannel2 = await this.storage.get("midChannel2")
        this.midChannel3 = await this.storage.get("midChannel3")
        this.midChannel4 = await this.storage.get("midChannel4")
        this.midChannel5 = await this.storage.get("midChannel5")
        // this.midChannel6=await this.storage.get("midChannel6");
        // this.midChannel7=await this.storage.get("midChannel7");
        // this.midChannel8=await this.storage.get("midChannel8");
        // this.midChannel9=await this.storage.get("midChannel9");
        // this.midChannel10=await this.storage.get("midChannel10");

        this.smallChannel1 = await this.storage.get("smallChannel1")
        this.smallChannel2 = await this.storage.get("smallChannel2")
        this.smallChannel3 = await this.storage.get("smallChannel3")
        this.smallChannel4 = await this.storage.get("smallChannel4")
        this.smallChannel5 = await this.storage.get("smallChannel5")
        // this.smallChannel6=await this.storage.get("smallChannel6");
        // this.smallChannel7=await this.storage.get("smallChannel7");
        // this.smallChannel8=await this.storage.get("smallChannel8");
        // this.smallChannel9=await this.storage.get("smallChannel9");
        // this.smallChannel10=await this.storage.get("smallChannel10");

        this.closeChannel1 = await this.storage.get("closeChannel1")
        this.closeChannel2 = await this.storage.get("closeChannel2")
        this.closeChannel3 = await this.storage.get("closeChannel3")
        this.closeChannel4 = await this.storage.get("closeChannel4")
        this.closeChannel5 = await this.storage.get("closeChannel5")
        // this.closeChannel6=await this.storage.get("closeChannel6");
        // this.closeChannel7=await this.storage.get("closeChannel7");
        // this.closeChannel8=await this.storage.get("closeChannel8");
        // this.closeChannel9=await this.storage.get("closeChannel9");
        // this.closeChannel10=await this.storage.get("closeChannel10");

        if (this.openIngTime == null || isNaN(this.openIngTime)) {
            this.openIngTime = 20
        }
        if (this.intervalTime == null || isNaN(this.intervalTime)) {
            this.intervalTime = 10
        }
        if (this.smokeAddress == null || isNaN(this.smokeAddress)) {
            this.smokeAddress = 10
        }
        if (this.smokePort == null || isNaN(this.smokePort)) {
            this.smokePort = 6
        }
        if (this.smokeStyle == null || this.smokeStyle == "") {
            this.smokeStyle = "smoking1"
        }
        if (this.bigChannel1 == null || isNaN(this.bigChannel1)) {
            this.bigChannel1 = 1
        }
        if (this.bigChannel2 == null || isNaN(this.bigChannel2)) {
            this.bigChannel2 = 2
        }
        if (this.bigChannel3 == null || isNaN(this.bigChannel3)) {
            this.bigChannel3 = 3
        }
        if (this.bigChannel4 == null || isNaN(this.bigChannel4)) {
            this.bigChannel4 = 4
        }
        if (this.bigChannel5 == null || isNaN(this.bigChannel5)) {
            this.bigChannel5 = 5
        }
        // if(this.bigChannel6==null||isNaN(this.bigChannel6)){
        //   this.bigChannel6=6;
        // }
        // if(this.bigChannel7==null||isNaN(this.bigChannel7)){
        //   this.bigChannel7=7;
        // }
        // if(this.bigChannel8==null||isNaN(this.bigChannel8)){
        //   this.bigChannel8=8;
        // }
        // if(this.bigChannel9==null||isNaN(this.bigChannel9)){
        //   this.bigChannel9=9;
        // }
        // if(this.bigChannel10==null||isNaN(this.bigChannel10)){
        //   this.bigChannel10=10;
        // }

        if (this.midChannel1 == null || isNaN(this.midChannel1)) {
            this.midChannel1 = 1
        }
        if (this.midChannel2 == null || isNaN(this.midChannel2)) {
            this.midChannel2 = 2
        }
        if (this.midChannel3 == null || isNaN(this.midChannel3)) {
            this.midChannel3 = 3
        }
        if (this.midChannel4 == null || isNaN(this.midChannel4)) {
            this.midChannel4 = 4
        }
        if (this.midChannel5 == null || isNaN(this.midChannel5)) {
            this.midChannel5 = 5
        }
        // if(this.midChannel6==null||isNaN(this.midChannel6)){
        //   this.midChannel6=6;
        // }
        // if(this.midChannel7==null||isNaN(this.midChannel7)){
        //   this.midChannel7=7;
        // }
        // if(this.midChannel8==null||isNaN(this.midChannel8)){
        //   this.midChannel8=8;
        // }
        // if(this.midChannel9==null||isNaN(this.midChannel9)){
        //   this.midChannel9=9;
        // }
        // if(this.midChannel10==null||isNaN(this.midChannel10)){
        //   this.midChannel10=10;
        // }

        if (this.smallChannel1 == null || isNaN(this.smallChannel1)) {
            this.smallChannel1 = 1
        }
        if (this.smallChannel2 == null || isNaN(this.smallChannel2)) {
            this.smallChannel2 = 2
        }
        if (this.smallChannel3 == null || isNaN(this.smallChannel3)) {
            this.smallChannel3 = 3
        }
        if (this.smallChannel4 == null || isNaN(this.smallChannel4)) {
            this.smallChannel4 = 4
        }
        if (this.smallChannel5 == null || isNaN(this.smallChannel5)) {
            this.smallChannel5 = 5
        }
        // if(this.smallChannel6==null||isNaN(this.smallChannel6)){
        //   this.smallChannel6=6;
        // }
        // if(this.smallChannel7==null||isNaN(this.smallChannel7)){
        //   this.smallChannel7=7;
        // }
        // if(this.smallChannel8==null||isNaN(this.smallChannel8)){
        //   this.smallChannel8=8;
        // }
        // if(this.smallChannel9==null||isNaN(this.smallChannel9)){
        //   this.smallChannel9=9;
        // }
        // if(this.smallChannel10==null||isNaN(this.smallChannel10)){
        //   this.smallChannel10=10;
        // }

        if (this.closeChannel1 == null || isNaN(this.closeChannel1)) {
            this.closeChannel1 = 1
        }
        if (this.closeChannel2 == null || isNaN(this.closeChannel2)) {
            this.closeChannel2 = 2
        }
        if (this.closeChannel3 == null || isNaN(this.closeChannel3)) {
            this.closeChannel3 = 3
        }
        if (this.closeChannel4 == null || isNaN(this.closeChannel4)) {
            this.closeChannel4 = 4
        }
        if (this.closeChannel5 == null || isNaN(this.closeChannel5)) {
            this.closeChannel5 = 5
        }
        // if(this.closeChannel6==null||isNaN(this.closeChannel6)){
        //   this.closeChannel6=6;
        // }
        // if(this.closeChannel7==null||isNaN(this.closeChannel7)){
        //   this.closeChannel7=7;
        // }
        // if(this.closeChannel8==null||isNaN(this.closeChannel8)){
        //   this.closeChannel8=8;
        // }
        // if(this.closeChannel9==null||isNaN(this.closeChannel9)){
        //   this.closeChannel9=9;
        // }
        // if(this.closeChannel10==null||isNaN(this.closeChannel10)){
        //   this.closeChannel10=10;
        // }
    }
    async setSmokeSetting() {
        let str = ""

        if (this.smokeStyle == "smoking1") {
            str = "smoking1"
            this.socketServiceService.sendSocketData(str)
            this.storage.set("smokeStyle", this.smokeStyle)
        } else {
            let smallChannel = `small:"${this.smallChannel1}|${this.smallChannel2}|${this.smallChannel3}|${this.smallChannel4}|${this.smallChannel5}"`
            let midChannel = `middle:"${this.midChannel1}|${this.midChannel2}|${this.midChannel3}|${this.midChannel4}|${this.midChannel5}"`
            let bigChannel = `large:"${this.bigChannel1}|${this.bigChannel2}|${this.bigChannel3}|${this.bigChannel4}|${this.bigChannel5}"`
            let closeChannel = `close:"${this.closeChannel1}|${this.closeChannel2}|${this.closeChannel3}|${this.closeChannel4}|${this.closeChannel5}"`
            str = `smoking0:{address:${this.smokeAddress},port:${this.smokePort},dmx:{${smallChannel},${midChannel},${bigChannel},${closeChannel}},continuetime:${this.openIngTime},spacetime:${this.intervalTime}}`
            this.socketServiceService.sendSocketData(str)
            this.storage.set("smokeStyle", this.smokeStyle)

            this.storage.set("openIngTime", this.openIngTime)
            this.storage.set("intervalTime", this.intervalTime)
            this.storage.set("smokeAddress", this.smokeAddress)
            this.storage.set("smokePort", this.smokePort)
            this.storage.set("bigChannel1", this.bigChannel1)
            this.storage.set("bigChannel2", this.bigChannel2)
            this.storage.set("bigChannel3", this.bigChannel3)
            this.storage.set("bigChannel4", this.bigChannel4)
            this.storage.set("bigChannel5", this.bigChannel5)
            // this.storage.set("bigChannel6",this.bigChannel6);
            // this.storage.set("bigChannel7",this.bigChannel7);
            // this.storage.set("bigChannel8",this.bigChannel8);
            // this.storage.set("bigChannel9",this.bigChannel9);
            // this.storage.set("bigChannel10",this.bigChannel10);

            this.storage.set("midChannel1", this.midChannel1)
            this.storage.set("midChannel2", this.midChannel2)
            this.storage.set("midChannel3", this.midChannel3)
            this.storage.set("midChannel4", this.midChannel4)
            this.storage.set("midChannel5", this.midChannel5)
            // this.storage.set("midChannel6",this.midChannel6);
            // this.storage.set("midChannel7",this.midChannel7);
            // this.storage.set("midChannel8",this.midChannel8);
            // this.storage.set("midChannel9",this.midChannel9);
            // this.storage.set("midChannel10",this.midChannel10);

            this.storage.set("smallChannel1", this.smallChannel1)
            this.storage.set("smallChannel2", this.smallChannel2)
            this.storage.set("smallChannel3", this.smallChannel3)
            this.storage.set("smallChannel4", this.smallChannel4)
            this.storage.set("smallChannel5", this.smallChannel5)
            // this.storage.set("smallChannel6",this.smallChannel6);
            // this.storage.set("smallChannel7",this.smallChannel7);
            // this.storage.set("smallChannel8",this.smallChannel8);
            // this.storage.set("smallChannel9",this.smallChannel9);
            // this.storage.set("smallChannel10",this.smallChannel10);

            this.storage.set("closeChannel1", this.closeChannel1)
            this.storage.set("closeChannel2", this.closeChannel2)
            this.storage.set("closeChannel3", this.closeChannel3)
            this.storage.set("closeChannel4", this.closeChannel4)
            this.storage.set("closeChannel5", this.closeChannel5)
            // this.storage.set("closeChannel6",this.closeChannel6);
            // this.storage.set("closeChannel7",this.closeChannel7);
            // this.storage.set("closeChannel8",this.closeChannel8);
            // this.storage.set("closeChannel9",this.closeChannel9);
            // this.storage.set("closeChannel10",this.closeChannel10);
        }
        const toast = await this.toastController.create({
            message: TranslateText.parameterSettings.toast.message,
            duration: 2000,
        })
        toast.present()
    }
    inputBigSmoke(event) {
        if (event.target.value > 255) {
            event.target.value = 255
        }
        this.bigChannel2 = parseInt(event.target.value) + 1
        this.bigChannel3 = parseInt(event.target.value) + 2
        this.bigChannel4 = parseInt(event.target.value) + 3
        this.bigChannel5 = parseInt(event.target.value) + 4
        // this.bigChannel6=parseInt(event.target.value)+5
        // this.bigChannel7=parseInt(event.target.value)+6
        // this.bigChannel8=parseInt(event.target.value)+7
        // this.bigChannel9=parseInt(event.target.value)+8
        // this.bigChannel10=parseInt(event.target.value)+9

        if (this.bigChannel2 > 255) {
            this.bigChannel2 = 255
        }
        if (this.bigChannel3 > 255) {
            this.bigChannel3 = 255
        }
        if (this.bigChannel4 > 255) {
            this.bigChannel4 = 255
        }
        if (this.bigChannel5 > 255) {
            this.bigChannel5 = 255
        }
        // if(this.bigChannel6>255){
        //   this.bigChannel6=255;
        // }
        // if(this.bigChannel7>255){
        //   this.bigChannel7=255;
        // }
        // if(this.bigChannel8>255){
        //   this.bigChannel8=255;
        // }
        // if(this.bigChannel9>255){
        //   this.bigChannel9=255;
        // }
        // if(this.bigChannel10>255){
        //   this.bigChannel10=255;
        // }
    }
    inputMidSmoke(event) {
        if (event.target.value > 255) {
            event.target.value = 255
        }
        this.midChannel2 = parseInt(event.target.value) + 1
        this.midChannel3 = parseInt(event.target.value) + 2
        this.midChannel4 = parseInt(event.target.value) + 3
        this.midChannel5 = parseInt(event.target.value) + 4
        // this.midChannel6=parseInt(event.target.value)+5
        // this.midChannel7=parseInt(event.target.value)+6
        // this.midChannel8=parseInt(event.target.value)+7
        // this.midChannel9=parseInt(event.target.value)+8
        // this.midChannel10=parseInt(event.target.value)+9
        if (this.midChannel2 > 255) {
            this.midChannel2 = 255
        }
        if (this.midChannel3 > 255) {
            this.midChannel3 = 255
        }
        if (this.midChannel4 > 255) {
            this.midChannel4 = 255
        }
        if (this.midChannel5 > 255) {
            this.midChannel5 = 255
        }
        // if(this.midChannel6>255){
        //   this.midChannel6=255;
        // }
        // if(this.midChannel7>255){
        //   this.midChannel7=255;
        // }
        // if(this.midChannel8>255){
        //   this.midChannel8=255;
        // }
        // if(this.midChannel9>255){
        //   this.midChannel9=255;
        // }
        // if(this.midChannel10>255){
        //   this.midChannel10=255;
        // }
    }
    inputSmallSmoke(event) {
        if (event.target.value > 255) {
            event.target.value = 255
        }
        this.smallChannel2 = parseInt(event.target.value) + 1
        this.smallChannel3 = parseInt(event.target.value) + 2
        this.smallChannel4 = parseInt(event.target.value) + 3
        this.smallChannel5 = parseInt(event.target.value) + 4
        // this.smallChannel6=parseInt(event.target.value)+5
        // this.smallChannel7=parseInt(event.target.value)+6
        // this.smallChannel8=parseInt(event.target.value)+7
        // this.smallChannel9=parseInt(event.target.value)+8
        // this.smallChannel10=parseInt(event.target.value)+9
        if (this.smallChannel2 > 255) {
            this.smallChannel2 = 255
        }
        if (this.smallChannel3 > 255) {
            this.smallChannel3 = 255
        }
        if (this.smallChannel4 > 255) {
            this.smallChannel4 = 255
        }
        if (this.smallChannel5 > 255) {
            this.smallChannel5 = 255
        }
        // if(this.smallChannel6>255){
        //   this.smallChannel6=255;
        // }
        // if(this.smallChannel7>255){
        //   this.smallChannel7=255;
        // }
        // if(this.smallChannel8>255){
        //   this.smallChannel8=255;
        // }
        // if(this.smallChannel9>255){
        //   this.smallChannel9=255;
        // }
        // if(this.smallChannel10>255){
        //   this.smallChannel10=255;
        // }
    }
    inputCloseSmoke(event) {
        if (event.target.value > 255) {
            event.target.value = 255
        }
        this.closeChannel2 = parseInt(event.target.value) + 1
        this.closeChannel3 = parseInt(event.target.value) + 2
        this.closeChannel4 = parseInt(event.target.value) + 3
        this.closeChannel5 = parseInt(event.target.value) + 4
        // this.closeChannel6=parseInt(event.target.value)+5
        // this.closeChannel7=parseInt(event.target.value)+6
        // this.closeChannel8=parseInt(event.target.value)+7
        // this.closeChannel9=parseInt(event.target.value)+8
        // this.closeChannel10=parseInt(event.target.value)+9
        if (this.closeChannel2 > 255) {
            this.closeChannel2 = 255
        }
        if (this.closeChannel3 > 255) {
            this.closeChannel3 = 255
        }
        if (this.closeChannel4 > 255) {
            this.closeChannel4 = 255
        }
        if (this.closeChannel5 > 255) {
            this.closeChannel5 = 255
        }
        // if(this.closeChannel6>255){
        //   this.closeChannel6=255;
        // }
        // if(this.closeChannel7>255){
        //   this.closeChannel7=255;
        // }
        // if(this.closeChannel8>255){
        //   this.closeChannel8=255;
        // }
        // if(this.closeChannel9>255){
        //   this.closeChannel9=255;
        // }
        // if(this.closeChannel10>255){
        //   this.closeChannel10=255;
        // }
    }
    numberCheck(event) {
        if (event.target.value < 0) {
            event.target.value = 0
        }
        if (event.target.value > 255) {
            event.target.value = 255
        }
    }
}
