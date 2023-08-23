import { Component, OnInit } from "@angular/core"
import { SocketServiceService } from "../service/socket-service.service"
import { Storage } from "@ionic/storage-angular"
import { IonModal, Platform, AlertController } from "@ionic/angular"
import { Subscription } from "rxjs"
import { GlobalVariable } from "../Util/globalVariable"
import { TranslateText } from "../Util/tranlateText"

@Component({
    selector: "app-product-center",
    templateUrl: "./product-center.page.html",
    styleUrls: ["./product-center.page.scss"],
})
export class ProductCenterPage implements OnInit {
    //socket: any;
    socketInterval: any
    acmeLogo = "assets/img/mode-select/acme.png"
    state = "assets/img/mode-select/unconnected.png"
    translate = TranslateText.productCenterPage

    baseUrl: string
    //是否播放中
    playing = false
    //心跳检测
    //heartBeatCheck: any;
    //商品列表
    musictype_35 = ""
    musictype_36 = ""
    musictype_37 = ""
    musictype_38 = ""
    musictype_39 = ""
    musictype_40 = ""
    musictype_41 = ""
    musictype_42 = ""
    musictype_43 = ""
    musictype_44 = ""
    musictype_45 = ""
    musictype_46 = ""
    musictype_47 = ""
    musictype_48 = ""
    musictype_49 = ""
    address = ""

    test = "assets/img/product-center/pause.png"
    subscription: Subscription

    constructor(
        private socketServiceService: SocketServiceService,
        private storage: Storage,
        private alertController: AlertController
    ) {
        console.log("初始化constructor")
    }

    ngOnInit() {
        console.log("初始化ngOnInit")
    }

    async ionViewWillEnter() {
        console.log("初始化willenter")

        this.init()
        this.socketInterval = setInterval(() => {
            this.checkSocketConnect()
        }, 5000)
        this.subscription = this.socketServiceService.productCenterSubject.subscribe((result) => {
            console.log(result)
            console.log("订阅器收到信息")
            this.synchronizeSocket(result)
        })
        this.address = await this.storage.get("address")
        let port = "8081"
        this.baseUrl = `http://${this.address}${
            GlobalVariable.getInstance().getPlatformVersion() === "Android" ? `:${port}` : ""
        }/temp/product/`
    }
    async init() {
        this.musictype_35 = await this.storage.get("musictype_35")
        this.musictype_36 = await this.storage.get("musictype_36")
        this.musictype_37 = await this.storage.get("musictype_37")
        this.musictype_38 = await this.storage.get("musictype_38")
        this.musictype_39 = await this.storage.get("musictype_39")
        this.musictype_40 = await this.storage.get("musictype_40")
        this.musictype_41 = await this.storage.get("musictype_41")
        this.musictype_42 = await this.storage.get("musictype_42")
        this.musictype_43 = await this.storage.get("musictype_43")
        this.musictype_44 = await this.storage.get("musictype_44")
        this.musictype_45 = await this.storage.get("musictype_45")
        this.musictype_46 = await this.storage.get("musictype_46")
        this.musictype_47 = await this.storage.get("musictype_47")
        this.musictype_48 = await this.storage.get("musictype_48")
        this.musictype_49 = await this.storage.get("musictype_49")
    }
    ionViewWillLeave() {
        clearInterval(this.socketInterval)
        //clearTimeout(this.heartBeatCheck);
        this.subscription.unsubscribe()
    }
    async sendProduct(productId: string) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            // await this.addressInit();
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let product = document.getElementById(productId) as HTMLIonInputElement
        if (product.value == null || product.value == "") {
            return
        }
        this.initVideoView()
        product.parentElement.classList.add("videoPlaying")
        product.nextElementSibling.classList.remove("playInformationHidden")
        // let playerButton=document.getElementById("playerButton") as HTMLIonIconElement;
        // playerButton.name="pause";
        this.playing = true
        console.log("发送事件")
        this.sendSocket(productId)
    }
    //初始化页面样式
    initVideoView() {
        let videoCollection = document.getElementsByClassName("videoPlaying")
        let videoArray = Array.from(videoCollection)
        console.log(videoCollection)
        videoArray.forEach((element) => {
            element.classList.remove("videoPlaying")
        })

        let playInformationCollection = document.getElementsByClassName("playInformation")
        let playInformationArray = Array.from(playInformationCollection)
        playInformationArray.forEach((data) => {
            data.classList.add("playInformationHidden")
        })
        this.playing = false
    }
    async editProduct(productId: string, event) {
        event.stopPropagation()
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let product = document.getElementById(productId) as HTMLIonInputElement

        const alter = await this.alertController.create({
            header: "设置商品名字",
            buttons: [
                {
                    text: "取消",
                    role: "cancel",
                    handler: () => {
                        console.log("用户取消编辑")
                    },
                },
                {
                    text: "确认",
                    role: "confirm",
                    handler: async (data) => {
                        console.log("用户输入了" + data.productName)
                        await this.storage.set(productId, data.productName)
                        product.value = data.productName
                    },
                },
            ],
            inputs: [
                {
                    name: "productName",
                    value: product.value,
                },
            ],
        })
        await alter.present()
    }
    async clickPlayerButton(event) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let videoCollection = document.getElementsByClassName("videoPlaying")
        if (videoCollection.length < 1) {
            return
        }

        if (this.playing) {
            this.playing = !this.playing
            this.sendSocket("calloff")
        } else {
            this.playing = !this.playing
            this.sendSocket("callon")
        }
    }
    // async confirmName(productId:string){
    //   console.log(productId);
    //   let product = document.getElementById(productId) as HTMLIonInputElement;
    //   await this.storage.set(productId,product.value);
    //   product.readonly=true;
    //   let productedit = document.getElementById(productId+"Edit") as HTMLElement;
    //   productedit.classList.add("hiddenEdit");

    // }
    // async cancelName(productId:string){
    //   console.log(productId);
    //   let product = document.getElementById(productId) as HTMLIonInputElement;
    //   product.value=await this.storage.get(productId);
    //   product.readonly=true;
    //   let productedit = document.getElementById(productId+"Edit") as HTMLElement;
    //   productedit.classList.add("hiddenEdit");

    // }
    // addressInit() {
    //   var that = this;

    //   this.socket.onData = function (data) {
    //     that.heartBeatCheckReset();
    //     let list = new TextDecoder('gbk').decode(data);
    //     that.synchronizeSocket(list);

    //   }
    //   if (this.socketServiceService.getSocketState() != 2) {
    //     this.state = "assets/img/mode-select/unconnected.png";
    //   } else {
    //     this.state = "assets/img/mode-select/connected.png";

    //   }
    // }
    //同步控制
    synchronizeSocket(socketStr: string) {
        let ifResult = false

        switch (socketStr) {
            case "musictype_35":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_36":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_37":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_38":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_39":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_40":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_41":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_42":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_43":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_44":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_45":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_46":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_47":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_48":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
            case "musictype_49":
                ifResult = true
                this.initVideoView()
                document.getElementById(socketStr).parentElement.classList.add("videoPlaying")
                this.playing = true

                break
        }
        // if (socketStr.substring(0, 9) == "initvoice") {

        //   console.log("参数同步")

        //   let parameterSync = socketStr.substring(9, socketStr.length);
        //   let parameterSyncs = parameterSync.split("|");
        //   console.log(parameterSyncs.length);
        //   console.log(parameterSyncs);
        //   this.storage.set("birthdaysDefaultVolume", parseInt(parameterSyncs[0]));
        //   console.log(parameterSyncs[0]);
        //   this.storage.set("christmasDefaultVolume", parseInt(parameterSyncs[1]));
        //   console.log(parameterSyncs[1]);
        //   this.storage.set("conversationDefaultVolume", parseInt(parameterSyncs[2]));
        //   console.log(parameterSyncs[2]);
        //   this.storage.set("dancemusicDefaultVolume", parseInt(parameterSyncs[3]));
        //   console.log(parameterSyncs[3]);
        //   this.storage.set("showDefaultVolume", parseInt(parameterSyncs[4]));
        //   console.log(parameterSyncs[4]);
        //   this.storage.set("liquorDefaultVolume",parseInt(parameterSyncs[24]));
        //   console.log(parameterSyncs[24]);
        //   this.storage.set("danceDefaultVolume",parseInt(parameterSyncs[25]));
        //   console.log(parameterSyncs[25]);

        //     console.log("开场秀延迟时间");
        //     console.log(parameterSyncs[5]);
        //     console.log(parameterSyncs[6]);
        //     console.log(parameterSyncs[7]);
        //     console.log(parameterSyncs[8]);

        //     this.storage.set("delayShowTime",parameterSyncs[5]);
        //     this.storage.set("delayShowTime2",parameterSyncs[6]);
        //     this.storage.set("delayShowTime3",parameterSyncs[7]);
        //     this.storage.set("delayShowTime4",parameterSyncs[8]);
        //     //产品列表演示视频音量
        //     this.storage.set("videoDelayTime1",parameterSyncs[9]);
        //     this.storage.set("videoDelayTime2",parameterSyncs[10]);
        //     this.storage.set("videoDelayTime3",parameterSyncs[11]);
        //     this.storage.set("videoDelayTime4",parameterSyncs[12]);
        //     this.storage.set("videoDelayTime5",parameterSyncs[13]);
        //     this.storage.set("videoDelayTime6",parameterSyncs[14]);
        //     this.storage.set("videoDelayTime7",parameterSyncs[15]);
        //     this.storage.set("videoDelayTime8",parameterSyncs[16]);
        //     this.storage.set("videoDelayTime9",parameterSyncs[17]);
        //     this.storage.set("videoDelayTime10",parameterSyncs[18]);
        //     this.storage.set("videoDelayTime11",parameterSyncs[19]);
        //     this.storage.set("videoDelayTime12",parameterSyncs[20]);
        //     this.storage.set("videoDelayTime13",parameterSyncs[21]);
        //     this.storage.set("videoDelayTime14",parameterSyncs[22]);
        //     this.storage.set("videoDelayTime15",parameterSyncs[23]);

        //   ifResult = true;

        // }
        return ifResult
    }
    sendSocket(musicType) {
        this.socketServiceService.sendSocketData(musicType)
    }
    async checkSocketConnect() {
        console.log("检查socket")
        // console.log("-------------------------------"+this.socketServiceService.getSocketState()+"-------------------------------------")
        //心跳检测
        this.sendSocket("checkConnect")

        if (this.socketServiceService.getSocketState() != 2) {
            console.log("未连接")
            this.state = "assets/img/mode-select/unconnected.png"
        } else {
            console.log("连接")
            this.state = "assets/img/mode-select/connected.png"
        }
    }
    //心跳检测超时
    // heartBeatCheckOverTime() {
    //   console.log("超时!")
    //   if (this.socket != null) {
    //     this.socket.close();

    //   }
    //   clearTimeout(this.heartBeatCheck);
    //   this.heartBeatCheck = setTimeout(() => { this.heartBeatCheckOverTime() }, 60000);

    // }
    //  心跳检测未超时
    //   heartBeatCheckReset() {
    //   console.log("心跳返回!")
    //   clearTimeout(this.heartBeatCheck);
    //   this.heartBeatCheck = setTimeout(() => { this.heartBeatCheckOverTime() }, 60000);
    // }
    //弹出未连接提示
    async alertNoConnectTips() {
        const alert = await this.alertController.create({
            header: "提示",
            message: "指挥家设备未连接,请等待指挥家设备连接",
            cssClass: "alertBlackBackground",
            buttons: ["确认"],
        })
        alert.present()
    }
}
