import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { TranslateText } from "src/app/Util/tranlateText"
import { AlertController } from "@ionic/angular"
import { GlobalVariable } from "src/app/Util/globalVariable"
import { Storage } from "@ionic/storage-angular"

@Component({
    selector: "app-parameter-verify",
    templateUrl: "./parameter-verify.page.html",
    styleUrls: ["./parameter-verify.page.scss"],
})
export class ParameterVerifyPage implements OnInit {
    password: string = ""
    translateText = TranslateText.parameterVerify
    constructor(
        private router: Router,
        private alertController: AlertController,
        private storage: Storage
    ) {}

    ngOnInit() {
        console.log("verifyPage -- init")
    }
    async submitPass() {
        if (this.password == "acme") {
            this.router.navigate(["/parameter-setting-tabs"])
        } else {
            const alert = await this.alertController.create({
                header: this.translateText.alert_header,
                message: this.translateText.alert_message,
                cssClass: "alertBlackBackground2",
                buttons: [this.translateText.alert_confirmBtn],
            })
            alert.present()
        }

        if (this.password == "off") {
            navigator["app"].exitApp()
        }

        if (this.password == "android") {
            GlobalVariable.getInstance().setPlatformVersion("Android")
            this.storage.set("platform", "Android")
        } else if (this.password == "windows") {
            GlobalVariable.getInstance().setPlatformVersion("Windows")
            this.storage.set("platform", "Windows")
        }
    }
}
