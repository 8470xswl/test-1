import { Component, OnInit } from "@angular/core"
import { Storage } from "@ionic/storage-angular"
import { SocketServiceService } from "../../service/socket-service.service"
import { ToastController } from "@ionic/angular"
import { StorageTool } from "src/app/Util/util"
import { TranslateText } from "src/app/Util/tranlateText"

@Component({
    selector: "app-show-delay",
    templateUrl: "./show-delay.page.html",
    styleUrls: ["./show-delay.page.scss"],
})
export class ShowDelayPage implements OnInit {
    translateText = TranslateText.parameterSettings.showDelay
    delayShowTime = 0
    delayShowTime2 = 0
    delayShowTime3 = 0
    delayShowTime4 = 0

    constructor(
        private storage: Storage,
        private socketServiceService: SocketServiceService,
        private toastController: ToastController
    ) {}

    ngOnInit() {}
    ionViewWillEnter() {
        this.init()
    }
    async setParameter() {
        await this.storage.set("delayShowTime", this.delayShowTime)
        await this.storage.set("delayShowTime2", this.delayShowTime2)
        await this.storage.set("delayShowTime3", this.delayShowTime3)
        await this.storage.set("delayShowTime4", this.delayShowTime4)

        this.socketServiceService.sendDefaultVolume()
        this.init()
        const toast = await this.toastController.create({
            message: TranslateText.parameterSettings.toast.message,
            duration: 2000,
        })
        toast.present()
    }
    async init() {
        this.delayShowTime = await StorageTool.getNumberFromStorage(this.storage, "delayShowTime", 0)
        this.delayShowTime2 = await StorageTool.getNumberFromStorage(this.storage, "delayShowTime2", 0)
        this.delayShowTime3 = await StorageTool.getNumberFromStorage(this.storage, "delayShowTime3", 0)
        this.delayShowTime4 = await StorageTool.getNumberFromStorage(this.storage, "delayShowTime4", 0)
    }
    delayCheck(event) {
        if (event.target.value < 0) {
            event.target.value = 0
        }
        event.target.value = Math.floor(event.target.value * 10) / 10
    }
}
