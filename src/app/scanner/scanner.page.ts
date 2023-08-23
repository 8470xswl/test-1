import { Component, OnInit } from "@angular/core"
import { Storage } from "@ionic/storage-angular"
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner/ngx"
import { AlertController } from "@ionic/angular"
import { Router } from "@angular/router"
import { SocketServiceService } from "../service/socket-service.service"

@Component({
    selector: "app-scanner",
    templateUrl: "./scanner.page.html",
    styleUrls: ["./scanner.page.scss"],
})
export class ScannerPage implements OnInit {
    lightAddress = ""
    port = ""
    conversationDefaultVolume = 20
    dancemusicDefaultVolume = 20
    christmasDefaultVolume = 20
    birthdaysDefaultVolume = 20
    showDefaultVolume = 20
    constructor(
        private storage: Storage,
        public barcodeScanner: BarcodeScanner,
        public alertCtrl: AlertController,
        private router: Router,
        private socketServiceService: SocketServiceService
    ) {}

    ngOnInit() {
        this.scan()
    }
    // async setLightAddress(){
    //   this.storage.set("address",this.lightAddress);
    //   const a=await this.storage.get("address");
    //   console.log(a);
    // }
    async scan() {
        //初始化默认音量参数
        this.conversationDefaultVolume = await this.storage.get("conversationDefaultVolume")
        this.dancemusicDefaultVolume = await this.storage.get("dancemusicDefaultVolume")
        this.christmasDefaultVolume = await this.storage.get("christmasDefaultVolume")
        this.birthdaysDefaultVolume = await this.storage.get("birthdaysDefaultVolume")
        this.showDefaultVolume = await this.storage.get("showDefaultVolume")

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
        await this.storage.set("conversationDefaultVolume", this.conversationDefaultVolume)
        await this.storage.set("dancemusicDefaultVolume", this.dancemusicDefaultVolume)
        await this.storage.set("christmasDefaultVolume", this.christmasDefaultVolume)
        await this.storage.set("birthdaysDefaultVolume", this.birthdaysDefaultVolume)
        await this.storage.set("showDefaultVolume", this.showDefaultVolume)

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
                var a = data.text.split(":")
                this.lightAddress = a[0]
                this.port = a[1]

                await this.storage.set("address", this.lightAddress)
                await this.storage.set("port", this.port)
                // this.socketServiceService.socketConnect()
                this.router.navigateByUrl("mode-select")
            })
            .catch(async (err) => {
                const alert = this.alertCtrl.create({
                    header: "Attention!",
                    subHeader: "二维码格式不正确!",
                    buttons: ["Close"],
                })
                ;(await alert).present()
            })
    }
}
