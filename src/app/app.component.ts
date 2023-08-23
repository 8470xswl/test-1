import { Component } from "@angular/core"
import { Storage } from "@ionic/storage-angular"

import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner/ngx"
import { AlertController, Platform } from "@ionic/angular"
import { Router } from "@angular/router"
import { SocketServiceService } from "./service/socket-service.service"
import { Autostart } from "@ionic-native/autostart/ngx"
import { DefaultMenuSettingService } from "./service/default-menu-setting.service"
import { ConfigService } from "./Util/configService"
import { GlobalVariable } from "./Util/globalVariable"
import { TranslateText } from "./Util/tranlateText"

import { NetworkHelper } from "./Util/network-helper"

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
})
export class AppComponent {
    lightAddress = ""
    port = ""
    conversationDefaultVolume = 20
    dancemusicDefaultVolume = 20
    christmasDefaultVolume = 20
    birthdaysDefaultVolume = 20
    showDefaultVolume = 20
    delayShowTime = 0
    delayShowTime2 = 0
    delayShowTime3 = 0
    delayShowTime4 = 0

    constructor(
        private storage: Storage,
        public barcodeScanner: BarcodeScanner,
        public alertCtrl: AlertController,
        private router: Router,
        private socketServiceService: SocketServiceService,
        private platform: Platform,
        private autostart: Autostart,
        public defaultMenuSettingService: DefaultMenuSettingService,
        private configService: ConfigService,
        public translateText: TranslateText,
        private networkHelper: NetworkHelper
    ) {
        this.storage.create()
        this.translateText.initTranslate(() => {
            this.defaultMenuSettingService.setMenuPages()
            this.defaultMenuSettingService.setState()
        })
        this.platform.ready().then(() => {
            // this.socketServiceService.initialzeSocket()

            // navigator.splashscreen.hide()
            this.networkHelper.getLocalIP()
            console.log("自启开启")
            this.autostart.enable()

            this.socketServiceService.initUDP()
        })
        console.log("程序启动")
        GlobalVariable.getInstance().init(this.storage)
        this.StartProcessing()
    }
    /**
     * 程序启动初始化
     */
    StartProcessing() {
        let dataString = "CA1105|5|255"
        this.socketServiceService.sendSocketData(dataString)
    }

    async scan() {
        //初始化默认音量参数
        this.conversationDefaultVolume = await this.storage.get("conversationDefaultVolume")
        this.dancemusicDefaultVolume = await this.storage.get("dancemusicDefaultVolume")
        this.christmasDefaultVolume = await this.storage.get("christmasDefaultVolume")
        this.birthdaysDefaultVolume = await this.storage.get("birthdaysDefaultVolume")
        this.showDefaultVolume = await this.storage.get("showDefaultVolume")
        this.delayShowTime = await this.storage.get("delayShowTime")
        this.delayShowTime2 = await this.storage.get("delayShowTime2")
        this.delayShowTime3 = await this.storage.get("delayShowTime3")
        this.delayShowTime4 = await this.storage.get("delayShowTime4")

        if (this.conversationDefaultVolume == null || isNaN(this.conversationDefaultVolume)) {
            this.conversationDefaultVolume = 20
        }
        if (this.dancemusicDefaultVolume == null || isNaN(this.dancemusicDefaultVolume)) {
            this.dancemusicDefaultVolume = 20
        }
        if (this.christmasDefaultVolume == null || isNaN(this.christmasDefaultVolume)) {
            this.christmasDefaultVolume = 20
        }
        if (this.birthdaysDefaultVolume == null || isNaN(this.birthdaysDefaultVolume)) {
            this.birthdaysDefaultVolume = 20
        }
        if (this.showDefaultVolume == null || isNaN(this.showDefaultVolume)) {
            this.showDefaultVolume = 20
        }
        if (this.delayShowTime == null || isNaN(this.delayShowTime)) {
            this.delayShowTime = 0
        }
        if (this.delayShowTime2 == null || isNaN(this.delayShowTime2)) {
            this.delayShowTime2 = 0
        }
        if (this.delayShowTime3 == null || isNaN(this.delayShowTime3)) {
            this.delayShowTime3 = 0
        }
        if (this.delayShowTime4 == null || isNaN(this.delayShowTime4)) {
            this.delayShowTime4 = 0
        }
        if (this.delayShowTime < 0) {
            this.delayShowTime = 0
        }
        if (this.delayShowTime2 < 0) {
            this.delayShowTime2 = 0
        }
        if (this.delayShowTime3 < 0) {
            this.delayShowTime3 = 0
        }
        if (this.delayShowTime4 < 0) {
            this.delayShowTime4 = 0
        }
        await this.storage.set("conversationDefaultVolume", this.conversationDefaultVolume)
        await this.storage.set("dancemusicDefaultVolume", this.dancemusicDefaultVolume)
        await this.storage.set("christmasDefaultVolume", this.christmasDefaultVolume)
        await this.storage.set("birthdaysDefaultVolume", this.birthdaysDefaultVolume)
        await this.storage.set("showDefaultVolume", this.showDefaultVolume)
        await this.storage.set("delayShowTime", this.showDefaultVolume)
        await this.storage.set("delayShowTime2", this.delayShowTime2)
        await this.storage.set("delayShowTime3", this.delayShowTime3)
        await this.storage.set("delayShowTime4", this.delayShowTime4)

        const options = {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            prompt: "Place a barcode inside the scan area", // Android
            // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            resultDisplayDuration: 500,
            formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            // Android only (portrait|landscape), default unset so it rotates with the device
            orientation: "portrait",
            disableAnimations: true, // iOS
            disableSuccessBeep: false, // iOS
        }

        this.barcodeScanner
            .scan(options)
            .then(async (data) => {
                console.log("扫码完毕")
                var a = data.text.split(":")
                this.lightAddress = a[0]
                this.port = a[1]
                if (this.lightAddress != null && this.port != null) {
                    await this.storage.set("address", this.lightAddress)
                    await this.storage.set("port", this.port)
                    // this.socketServiceService.socketConnect()
                    this.router.navigate(["/mode-select"], {
                        queryParams: { address: this.lightAddress, port: this.port },
                    })
                }
            })
            .catch(async (err) => {
                const alert = this.alertCtrl.create({
                    header: "错误!",
                    subHeader: err,
                    buttons: ["Close"],
                })
                ;(await alert).present()
            })
    }
}
