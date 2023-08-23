import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { SocketServiceService } from "../../../service/socket-service.service"
import { WebToolService } from "src/app/service/web-tool.service"
import { GlobalVariable } from "../.././../Util/globalVariable"
import { AlertController, LoadingController, ToastController } from "@ionic/angular"
import { timeout, catchError } from "rxjs/operators"

import { empty } from "rxjs"

@Component({
    selector: "app-record",
    templateUrl: "./record.page.html",
    styleUrls: ["./record.page.scss"],
})
export class RecordPage implements OnInit {
    RECEIVED_MESSAGE = 1
    videoList: string[] = []
    videoNumber: number
    recordName: string
    hour: number = 0
    minute: number = 0
    second: number = 0
    recordInterval: any
    recording: boolean = false
    // true --已切入控台 false --切出控台
    controlState: boolean = false
    playing: boolean = false
    state: string
    subscription: any
    loadResults: boolean = false
    public loadingBox: HTMLIonLoadingElement

    constructor(
        private route: ActivatedRoute,
        private socketServiceService: SocketServiceService,
        private router: Router,
        private webTool: WebToolService,
        private alert: AlertController,
        private toast: ToastController,
        private loading: LoadingController
    ) {}

    ngOnInit() {
        console.log("RecordPageInit")

        this.subscription = this.socketServiceService.modeSelectSubject.subscribe((result) => {
            console.log("RecordPage订阅器收到信息: " + result)
            this.socketOnData(result)
        })
    }
    socketOnData(result: string) {
        console.log(result)
        if (result == "completion") {
            console.log("播放结束")

            this.playing = false
        }
        if (result == "transcribe:finished") {
            if (!this.recording) {
                // 录制结束获取列表
                this.loadList(this.state)
            }
            this.recordSave(this.RECEIVED_MESSAGE)
        }
    }
    ionViewWillEnter() {
        this.state = this.route.snapshot.paramMap.get("state")
        if (this.state.length == 2) {
            this.state = "0" + this.state
        }
        this.loadList(this.state)
        console.log(this.state)
    }

    ionViewWillLeave() {
        clearInterval(this.recordInterval)
        this.setTabsState(false)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
        this.socketServiceService.sendSocketData("transcribe:exit")
    }

    clickVideo() {
        console.log(this.videoNumber)
        //console.log(document.getElementsByTagName("ion-tab-bar")[0]);
    }
    //设置tab栏状态
    setTabsState(state: boolean) {
        let tabs = document.getElementsByTagName("ion-tab-button")
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].disabled = state
        }
        ;(document.getElementById("backButton") as HTMLIonButtonElement).disabled = state
    }

    /**
     *获取文件列表
     * @param type 当前模式
     */
    private loadList(type: string) {
        if (!type) {
            return
        }

        this.webTool
            .getRecordingListById(GlobalVariable.getInstance().getIPAddress(), 8081, type)
            .pipe(
                timeout(3000),
                catchError((err) => {
                    this.presentAlert("获取失败，请检查网络设置")
                    return empty()
                })
            )
            .subscribe(
                (response) => {
                    if (!response) {
                        this.presentAlert("未获取到列表数据，请检查数据源或网络")
                        return
                    }
                    this.videoList = []

                    for (let i = 0; i < response.length; i++) {
                        console.log(response[i])

                        this.videoList.push(response[i])
                    }
                    this.loadResults = true
                },
                (error) => {
                    this.presentAlert("获取失败，请检查网络设置")
                }
            )
    }

    /**
     * 录制准备
     * @returns
     */
    async recordReady() {
        if (!this.loadResults) {
            this.presentAlert("获取数据失败,请检查网络连接")
            return
        }
        if (this.playing) {
            this.presentAlert("请先暂停播放")
            return
        }

        if (!this.controlState) {
            this.presentAlert("请先切入控台")
            return
        }
        let al = await this.alert.create({
            header: "Input Channel",
            inputs: [
                {
                    name: "channel",
                    placeholder: "input channel",
                },
            ],
            cssClass: "alertBlackBackground2",
            backdropDismiss: false,
            buttons: [
                {
                    text: "cancel",
                    handler: () => {
                        al.dismiss()
                    },
                },
                {
                    text: "OK",
                    handler: (data) => {
                        if (data.channel && Number(data.channel) <= 255 && Number(data.channel) >= 0) {
                            this.recordStart(data.channel)
                        } else {
                            this.creatToast("Incorrect input")
                        }
                    },
                },
            ],
        })
        let channel
        // await al.present()
        if (this.videoList.length == 0) {
            this.recordStart("0")
        }
        channel = this.videoList[this.videoList.length - 1]
        channel = (Number(channel.substring(4, 7)) + 1).toString()
        this.recordStart(channel)
    }

    /**
     * 切入切出控台
     */
    switchControl() {
        if (this.playing) {
            this.presentAlert("请先暂停播放")
            return
        }

        if (this.recording) {
            this.presentAlert("请先结束录制")
            return
        }
        if (this.controlState) {
            this.socketServiceService.sendSocketData(`transcribe:exit`)
        } else {
            this.socketServiceService.sendSocketData(`transcribe:ready:showtype${this.state}`)
            this.presentLoading()
        }
        this.controlState = !this.controlState
        this.videoNumber = null
    }

    /**
     * 开始录制
     */
    recordStart(channel: string) {
        if (this.recording) {
            return
        }
        if (channel.length == 1) {
            channel = "00" + channel
        } else if (channel.length == 2) {
            channel = "0" + channel
        }

        this.recording = true

        this.recordInterval = setInterval(() => {
            this.second++
            if (this.second >= 60) {
                this.second = 0
                this.minute++
            }
            if (this.minute >= 60) {
                this.minute = 0
                this.hour++
            }
        }, 1000)
        console.log("开始录制")
        this.recordName = `showtype${this.state}/show${channel}.bin`
        let sendStr = `transcribe:start:showtype${this.state}/show${channel}.bin`
        this.socketServiceService.sendSocketData(sendStr)

        this.setTabsState(true)
    }

    /**
     *
     * @param state 录制结束
     * @returns
     */
    recordSave(state: number) {
        if (!this.recording) {
            return
        }
        this.recording = false
        console.log("录制结束")

        clearInterval(this.recordInterval)

        this.second = 0
        this.minute = 0
        this.hour = 0
        this.setTabsState(false)
        if (state != this.RECEIVED_MESSAGE) {
            this.socketServiceService.sendSocketData("transcribe:end")
        }

        // 录制结束获取列表
        this.loadList(this.state)
    }

    /**
     * 播放
     * @returns
     */
    recordPlay() {
        if (this.recording) {
            return
        }

        if (this.controlState) {
            this.presentAlert("请先切出控台")
            return
        }

        let sendStr

        if (this.videoList[this.videoNumber] == undefined || this.videoList[this.videoNumber] == null) {
            this.presentAlert("请选择文件")
            return
        }

        if (this.playing) {
            console.log("结束播放")
            sendStr = "normal_broadcast:stop showtype" + this.state + "/" + this.videoList[this.videoNumber]
        } else {
            console.log("开始播放")
            sendStr =
                "normal_broadcast:start showtype" + this.state + "/" + this.videoList[this.videoNumber] + "/inside"
        }
        this.playing = !this.playing

        this.socketServiceService.sendSocketData(sendStr)
    }

    recordDelete() {
        if (this.recording || this.playing) {
            this.presentAlert("请先暂停播放或结束录制")
            return
        }

        if (!this.videoNumber) {
            this.presentAlert("请选择文件")
            return
        }
        console.log(`删除文件: ${this.videoList[this.videoNumber]}`)

        let sendStr = "delete:showtype" + this.state + "/" + this.videoList[this.videoNumber]
        this.socketServiceService.sendSocketData(sendStr)
        this.videoList.splice(this.videoNumber, 1)
        this.videoNumber = null
    }

    backStorage() {
        this.router.navigate(["/parameter-setting-tabs/light-storage-record"])
    }

    private async creatToast(message: string) {
        let s = await this.toast.create({
            message: message,
            duration: 2000,
            cssClass: "toastBlackBackground2",
        })
        await s.present()
    }

    async presentAlert(message: string) {
        const alert = await this.alert.create({
            header: "提示",
            message: message,
            cssClass: "alertBlackBackground2",
            buttons: ["OK"],
        })

        await alert.present()
    }

    async presentLoading() {
        this.loadingBox = await this.loading.create({
            message: "Load Recording Tool....",
            translucent: true,
            duration: 5000,
        })
        await this.loadingBox.present()
    }
}
