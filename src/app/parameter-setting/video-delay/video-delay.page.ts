import { Component, OnInit } from "@angular/core"
import { ToastController } from "@ionic/angular"
import { Storage } from "@ionic/storage-angular"
import { StorageTool } from "src/app/Util/util"
import { SocketServiceService } from "../../service/socket-service.service"
import { TranslateText } from "src/app/Util/tranlateText"

@Component({
    selector: "app-video-delay",
    templateUrl: "./video-delay.page.html",
    styleUrls: ["./video-delay.page.scss"],
})
export class VideoDelayPage implements OnInit {
    translateText = TranslateText.parameterSettings.videoDelay
    videoDelayTime1 = 0
    videoDelayTime2 = 0
    videoDelayTime3 = 0
    videoDelayTime4 = 0
    videoDelayTime5 = 0
    videoDelayTime6 = 0
    videoDelayTime7 = 0
    videoDelayTime8 = 0
    videoDelayTime9 = 0
    videoDelayTime10 = 0
    videoDelayTime11 = 0
    videoDelayTime12 = 0
    videoDelayTime13 = 0
    videoDelayTime14 = 0
    videoDelayTime15 = 0

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
        await this.storage.set("videoDelayTime1", this.videoDelayTime1)
        await this.storage.set("videoDelayTime2", this.videoDelayTime2)
        await this.storage.set("videoDelayTime3", this.videoDelayTime3)
        await this.storage.set("videoDelayTime4", this.videoDelayTime4)
        await this.storage.set("videoDelayTime5", this.videoDelayTime5)
        await this.storage.set("videoDelayTime6", this.videoDelayTime6)
        await this.storage.set("videoDelayTime7", this.videoDelayTime7)
        await this.storage.set("videoDelayTime8", this.videoDelayTime8)
        await this.storage.set("videoDelayTime9", this.videoDelayTime9)
        await this.storage.set("videoDelayTime10", this.videoDelayTime10)
        await this.storage.set("videoDelayTime11", this.videoDelayTime11)
        await this.storage.set("videoDelayTime12", this.videoDelayTime12)
        await this.storage.set("videoDelayTime13", this.videoDelayTime13)
        await this.storage.set("videoDelayTime14", this.videoDelayTime14)
        await this.storage.set("videoDelayTime15", this.videoDelayTime15)

        this.socketServiceService.sendDefaultVolume()
        this.init()
        const toast = await this.toastController.create({
            message: TranslateText.parameterSettings.toast.message,
            duration: 2000,
        })
        toast.present()
    }

    async init() {
        this.videoDelayTime1 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime1", 0)
        this.videoDelayTime2 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime2", 0)
        this.videoDelayTime3 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime3", 0)
        this.videoDelayTime4 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime4", 0)
        this.videoDelayTime5 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime5", 0)
        this.videoDelayTime6 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime6", 0)
        this.videoDelayTime7 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime7", 0)
        this.videoDelayTime8 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime8", 0)
        this.videoDelayTime9 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime9", 0)
        this.videoDelayTime10 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime10", 0)
        this.videoDelayTime11 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime11", 0)
        this.videoDelayTime12 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime12", 0)
        this.videoDelayTime13 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime13", 0)
        this.videoDelayTime14 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime14", 0)
        this.videoDelayTime15 = await StorageTool.getNumberFromStorage(this.storage, "videoDelayTime15", 0)
    }

    delayCheck(event) {
        if (event.target.value < 0) {
            event.target.value = 0
        }
        event.target.value = Math.floor(event.target.value * 10) / 10
    }
}
