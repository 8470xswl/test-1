import { ChangeDetectorRef, Component, OnInit } from "@angular/core"
import { TranslateText } from "../Util/tranlateText"
import { SocketServiceService } from "../service/socket-service.service"
import { AlertController, LoadingController } from "@ionic/angular"

@Component({
    selector: "app-update-program",
    templateUrl: "./update-program.page.html",
    styleUrls: ["./update-program.page.scss"],
})
export class UpdateProgramPage implements OnInit {
    translateText = TranslateText.appPages
    updateProgramItemList: UpdateProgramItem[] = []

    loading: HTMLIonLoadingElement

    constructor(
        private socket: SocketServiceService,
        private loadingController: LoadingController,
        private changeDetectorRef: ChangeDetectorRef,
        private alertController: AlertController
    ) {
        this.socket.modeSelectSubject.subscribe((data) => {
            this.socketOnData(data)
        })
    }
    socketOnData(result: string) {
        console.log("收到数据源:")
        console.log(result)

        this.updateProgramItemList = JSON.parse(result)

        this.dismissLoading()
    }

    ngOnInit() {
        console.log("updateProgram init")

        this.toggle(1)

        // for (let i = 0; i < 10; i++) {
        //     let fakeItem = new UpdateProgramItem()
        //     fakeItem.name = "测试数据" + i
        //     fakeItem.url = "http://localhost:8100/update-program"
        //     fakeItem.select = false
        //     this.updateProgramItemList.push(fakeItem)
        // }
    }

    toggle(number: number) {
        this.updateProgramItemList = []
        this.socket.sendSocketData(`update_${number}`)
        this.presentLoading()
    }

    // 在组件类中
    itemSelect(index: number) {
        // 取消其他项目的选中状态
        this.updateProgramItemList.forEach((item, i) => {
            if (i !== index) {
                item.select = false
            }
        })

        this.changeDetectorRef.detectChanges()
    }

    updateProgram(item: UpdateProgramItem) {
        this.socket.sendSocketData(`update_${item.url}`)
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: "加载中...", // 根据需要自定义消息
            duration: 5000, // 设置持续时间为 5000 毫秒（5 秒）
            cssClass: "custom-loading",
        })

        await loading.present()
        setTimeout(() => {
            if (this.updateProgramItemList.length == 0) {
                this.presentAlert()
            }
        }, 6000)
    }

    dismissLoading() {
        if (this.loading) {
            this.loading.dismiss()
        }
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: "Tips",
            message: "未读取到数据,请重试",
            buttons: ["OK"],
            cssClass: "alertBlackBackground2",
        })

        await alert.present()
    }
}

export class UpdateProgramItem {
    constructor() {}
    select: boolean
    name: string
    url: string
}
