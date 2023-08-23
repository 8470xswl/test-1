import { Component, OnInit } from "@angular/core"
import { Storage } from "@ionic/storage-angular"
import { SocketServiceService } from "../../service/socket-service.service"
import { ToastController } from "@ionic/angular"
import { StorageTool } from "src/app/Util/util"
import { TranslateText } from "src/app/Util/tranlateText"

@Component({
    selector: "app-other-delay",
    templateUrl: "./other-delay.page.html",
    styleUrls: ["./other-delay.page.scss"],
})
export class OtherDelayPage implements OnInit {
    translateText = TranslateText.parameterSettings.otherDelay
    GGDelayShowTime1 = 0
    GGDelayShowTime2 = 0
    GGDelayShowTime3 = 0
    GGDelayShowTime4 = 0
    GGDelayShowTime5 = 0
    GGDelayShowTime6 = 0
    liquorDelayShowTime1 = 0
    liquorDelayShowTime2 = 0
    liquorDelayShowTime3 = 0
    liquorDelayShowTime4 = 0
    liquorDelayShowTime5 = 0
    liquorDelayShowTime6 = 0

    constructor(
        private storage: Storage,
        private socketServiceService: SocketServiceService,
        private toastController: ToastController
    ) {}

    ngOnInit() {}

    ionViewWillEnter() {
        this.init()
    }

    // 初始化
    async init() {
        //GG
        this.GGDelayShowTime1 = await StorageTool.getNumberFromStorage(this.storage, "GGDelayShowTime1", 0)
        this.GGDelayShowTime2 = await StorageTool.getNumberFromStorage(this.storage, "GGDelayShowTime2", 0)
        this.GGDelayShowTime3 = await StorageTool.getNumberFromStorage(this.storage, "GGDelayShowTime3", 0)
        this.GGDelayShowTime4 = await StorageTool.getNumberFromStorage(this.storage, "GGDelayShowTime4", 0)
        this.GGDelayShowTime5 = await StorageTool.getNumberFromStorage(this.storage, "GGDelayShowTime5", 0)
        this.GGDelayShowTime6 = await StorageTool.getNumberFromStorage(this.storage, "GGDelayShowTime6", 0)
        //上酒 liquor
        this.liquorDelayShowTime1 = await StorageTool.getNumberFromStorage(this.storage, "liquorDelayShowTime1", 0)
        this.liquorDelayShowTime2 = await StorageTool.getNumberFromStorage(this.storage, "liquorDelayShowTime2", 0)
        this.liquorDelayShowTime3 = await StorageTool.getNumberFromStorage(this.storage, "liquorDelayShowTime3", 0)
        this.liquorDelayShowTime4 = await StorageTool.getNumberFromStorage(this.storage, "liquorDelayShowTime4", 0)
        this.liquorDelayShowTime5 = await StorageTool.getNumberFromStorage(this.storage, "liquorDelayShowTime5", 0)
        this.liquorDelayShowTime6 = await StorageTool.getNumberFromStorage(this.storage, "liquorDelayShowTime6", 0)
    }

    //设置参数到内存
    async setParameter() {
        await this.storage.set("GGDelayShowTime1", this.GGDelayShowTime1)
        await this.storage.set("GGDelayShowTime2", this.GGDelayShowTime2)
        await this.storage.set("GGDelayShowTime3", this.GGDelayShowTime3)
        await this.storage.set("GGDelayShowTime4", this.GGDelayShowTime4)
        await this.storage.set("GGDelayShowTime5", this.GGDelayShowTime5)
        await this.storage.set("GGDelayShowTime6", this.GGDelayShowTime6)
        await this.storage.set("liquorDelayShowTime1", this.liquorDelayShowTime1)
        await this.storage.set("liquorDelayShowTime2", this.liquorDelayShowTime2)
        await this.storage.set("liquorDelayShowTime3", this.liquorDelayShowTime3)
        await this.storage.set("liquorDelayShowTime4", this.liquorDelayShowTime4)
        await this.storage.set("liquorDelayShowTime5", this.liquorDelayShowTime5)
        await this.storage.set("liquorDelayShowTime6", this.liquorDelayShowTime6)

        this.socketServiceService.sendDefaultVolume()
        this.init()
        const toast = await this.toastController.create({
            message: TranslateText.parameterSettings.toast.message,
            duration: 2000,
        })
        toast.present()
    }

    delayCheck(event) {
        if (event.target.value < 0) {
            event.target.value = 0
        }
        event.target.value = Math.floor(event.target.value * 10) / 10
    }
}
