import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core"
import { Storage } from "@ionic/storage-angular"
import { IonModal, Platform, AlertController } from "@ionic/angular"
import { Router, ActivatedRoute } from "@angular/router"
import { ModalController } from "@ionic/angular"
import { SocketServiceService } from "../service/socket-service.service"
import { HttpClient } from "@angular/common/http"
import { Subscription } from "rxjs"

import { NavController } from "@ionic/angular"
import { Timer, ColorUtil } from "../Util/util"
import { WebToolService } from "../service/web-tool.service"
import { TranslateText } from "../Util/tranlateText"

@Component({
    selector: "app-mode-select",
    templateUrl: "./mode-select.page.html",
    styleUrls: ["./mode-select.page.scss"],
})
export class ModeSelectPage implements OnInit {
    translateText = TranslateText.modelSelect
    //唱歌
    ktvMode: Boolean = true
    //生日
    bitrhdaysMode: Boolean = false
    //圣诞
    christmasMode: Boolean = false
    // 搁置
    playerBackgroundMode: Boolean = false
    //会话
    conversationMode: Boolean = false
    //舞曲
    danceMusicMode: Boolean = false
    // 是否为蓝牙派对版本
    musicPartyVersion: string = ""
    //K歌派对
    discoPartyMode: Boolean = false
    // 蓝牙派对
    bluetoothPartyMode: Boolean = false
    //DJ派对
    DJPartyMode: Boolean = false
    //灯光控台
    lightControlOpen: Boolean = false
    //VJ控台
    ResolumeControlOpen: Boolean = false
    //照明
    illuminationMode: Boolean = false
    //选秀
    beautyMode: boolean = false
    proposeMode: boolean = false

    //可隐藏区域
    hiddenArea: boolean = false
    areaWidth: number = 12 / 7
    hiddenAreaHeight: string
    hiddenAreaWightType: boolean = false
    discoState: boolean = false
    bluetoothState: boolean = false
    liquorState: boolean = false
    beautyState: boolean = false
    GGDanceState: boolean = false
    proposeState: boolean = false

    //type 1234 对应页面四个位置
    illuminationType: any = 1
    illuminationType1: string
    illuminationType1ReadOnly: Boolean = true
    illuminationType1State: Boolean = false

    illuminationType2: string
    illuminationType2ReadOnly: Boolean = true
    illuminationType2State: Boolean = false

    illuminationType3: string
    illuminationType3ReadOnly: Boolean = true
    illuminationType3State: Boolean = false

    illuminationType4: string
    illuminationType4ReadOnly: Boolean = true
    illuminationType4State: Boolean = false

    // 自定义GG 属性
    GGCustomize1: string
    GGCustomize2: string
    GGCustomize3: string
    GGCustomize4: string
    GGCustomize5: string
    GGCustomize6: string
    // 读写状态
    GGCustomize1ReadOnly: boolean = true
    GGCustomize2ReadOnly: boolean = true
    GGCustomize3ReadOnly: boolean = true
    GGCustomize4ReadOnly: boolean = true
    GGCustomize5ReadOnly: boolean = true
    GGCustomize6ReadOnly: boolean = true
    // 选中状态
    GGCustomize1Clicked = false
    GGCustomize2Clicked = false
    GGCustomize3Clicked = false
    GGCustomize4Clicked = false
    GGCustomize5Clicked = false
    GGCustomize6Clicked = false

    // 自定义meeting 属性
    meetingCustomize1: string
    meetingCustomize2: string
    meetingCustomize3: string
    meetingCustomize4: string
    meetingCustomize5: string
    meetingCustomize6: string
    // 读写状态
    meetingCustomize1ReadOnly: boolean = true
    meetingCustomize2ReadOnly: boolean = true
    meetingCustomize3ReadOnly: boolean = true
    meetingCustomize4ReadOnly: boolean = true
    meetingCustomize5ReadOnly: boolean = true
    meetingCustomize6ReadOnly: boolean = true
    // 选中状态
    meetingCustomize1Clicked = false
    meetingCustomize2Clicked = false
    meetingCustomize3Clicked = false
    meetingCustomize4Clicked = false
    meetingCustomize5Clicked = false
    meetingCustomize6Clicked = false

    // 自定义上酒属性
    liquorCustomize1: string
    liquorCustomize2: string
    liquorCustomize3: string
    liquorCustomize4: string
    liquorCustomize5: string
    liquorCustomize6: string
    // 读写状态
    liquorCustomize1ReadOnly: boolean = true
    liquorCustomize2ReadOnly: boolean = true
    liquorCustomize3ReadOnly: boolean = true
    liquorCustomize4ReadOnly: boolean = true
    liquorCustomize5ReadOnly: boolean = true
    liquorCustomize6ReadOnly: boolean = true
    // 选中状态
    liquorCustomize1Clicked = false
    liquorCustomize2Clicked = false
    liquorCustomize3Clicked = false
    liquorCustomize4Clicked = false
    liquorCustomize5Clicked = false
    liquorCustomize6Clicked = false

    // 自定义DJparty
    DJCustomize1: string
    DJCustomize2: string
    DJCustomize3: string
    DJCustomize4: string
    // 读写状态
    DJCustomize1ReadOnly: boolean = true
    DJCustomize2ReadOnly: boolean = true
    DJCustomize3ReadOnly: boolean = true
    DJCustomize4ReadOnly: boolean = true
    // 选中状态
    DJCustomize1Clicked = false
    DJCustomize2Clicked = false
    DJCustomize3Clicked = false
    DJCustomize4Clicked = false

    // 自定义showparty
    showCustomize1: string
    showCustomize2: string
    showCustomize3: string
    showCustomize4: string
    // 读写状态
    showCustomize1ReadOnly: boolean = true
    showCustomize2ReadOnly: boolean = true
    showCustomize3ReadOnly: boolean = true
    showCustomize4ReadOnly: boolean = true
    // 选中状态
    showCustomize1Clicked = false
    showCustomize2Clicked = false
    showCustomize3Clicked = false
    showCustomize4Clicked = false

    // 自定义KTV
    KTVCustomize1: string
    KTVCustomize2: string
    KTVCustomize3: string
    KTVCustomize4: string
    KTVCustomize5: string
    // 读写状态
    KTVCustomize1ReadOnly: boolean = true
    KTVCustomize2ReadOnly: boolean = true
    KTVCustomize3ReadOnly: boolean = true
    KTVCustomize4ReadOnly: boolean = true
    KTVCustomize5ReadOnly: boolean = true
    // 选中状态
    KTVCustomize1Clicked = false
    KTVCustomize2Clicked = false
    KTVCustomize3Clicked = false
    KTVCustomize4Clicked = false
    KTVCustomize5Clicked = false

    //服务
    serviceModel: Boolean = false
    //开场show
    showMode: Boolean = false
    showType: Boolean = false
    //上酒
    liquorMode: Boolean = false
    //GG模式
    danceMode: Boolean = false
    //总控开关
    masterSwitchMode: Boolean = false
    //总控开关状态
    masterSwitchState: Boolean = true
    //空调
    airconditionerMode: Boolean = false
    //空调开关状态
    airconditionerState: Boolean = false
    //空调大小状态 10大 09 中 08小  6关闭,默认6 7打开
    airconditionerType: any = 6
    //排风
    exhaustMode: Boolean = false
    exhaustState: Boolean = false

    //香薰
    aromatherapyMode: Boolean = false
    aromatherapyState: Boolean = false

    //雾机
    fogMode: Boolean = false

    imageMap = new Map()
    address = ""
    port = ""
    //socket: any;
    acmeLogo = "assets/img/mode-select/acme.png"
    state = "assets/img/mode-select/unconnected.png"
    musicVolume: number = 20
    musicVolumeChange: Boolean = false
    // musicName="";
    musicTime = "00:05:02"
    //音乐播放中
    musicPlaying: Boolean = false
    musicListOpen: Boolean = false
    musicList: any[]
    musicStr = ""
    musicIndex = 0
    socketInterval: any
    subscription: Subscription
    @ViewChild("musicModal") modal: IonModal
    //心跳检测
    // heartBeatCheck:any;
    // birthdaysTempVolume=20;
    // christmasTempVolume=20;
    // conversationTempVolume=20;
    // dancemusicTempVolume=20;
    //banner高度占页面高度比例
    bannerHeightScale: number = 0
    color: string
    CA1105: boolean = true
    //屏保
    screen: number
    // 区域描述是否只读
    customizeReadOnly: boolean = true
    width: number
    //是否横竖屏
    isPortrait: boolean
    lang = "zh"

    constructor(
        private storage: Storage,
        private platform: Platform,
        private router: Router,
        private route: ActivatedRoute,
        public modalController: ModalController,
        private socketServiceService: SocketServiceService,
        private httpClient: HttpClient,
        private alertController: AlertController,
        public navController: NavController,
        public web: WebToolService,
        private cdr: ChangeDetectorRef
    ) {
        this.width = window.screen.width

        this.isPortrait = screen.orientation.type.includes("landscape") ? false : true
        this.lang = TranslateText.lang
        this.calculateSize()
        this.initImageMap()
        this.initFogImageMap()

        // 不受其他按键影响 只在页面重新加载时还原状态
        this.imageMap.set(
            "service",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/service.svg"
        )

        //进入页面服务灯初始化
        Timer.endCycleTimer(async () => {
            await this.initColor()
            this.sendSocket("server_rgb:" + ColorUtil.getColorRGB(this.color) + "000")
            let air: boolean = await this.storage.get("airconditionerState")
            if (!air) {
                this.sendSocket("CA1105|6|255")
            }
        })

        window.addEventListener("orientationchange", (event) => {
            this.isPortrait = screen.orientation.type.includes("landscape") ? false : true
            this.width = window.screen.width
            this.initImageMap()
            this.initFogImageMap()
        })
    }

    ngOnInit() {
        console.log("初始化ngOnInit")
        let that = this
    }

    async ionViewWillEnter() {
        console.log("初始化willEnter")
        this.bannerHeightScale =
            document.getElementById("bannerImage").offsetHeight / window.innerHeight
        this.subscription = this.socketServiceService.modeSelectSubject.subscribe((result) => {
            console.log("订阅器收到信息: " + result)
            this.socketOnData(result)
        })

        this.socketInterval = setInterval(() => {
            this.checkSocketConnect()
        }, 5000)
        // 获取 ip
        this.address = await this.storage.get("address")
        await this.initCustomTepy()
        this.showType = await this.storage.get("showType")
        await this.initColor()

        let customizeInt: number = await this.storage.get("customize")

        if (customizeInt == null || customizeInt == 0) {
            this.customizeReadOnly = true
        } else {
            this.customizeReadOnly = false
        }

        //此处判断是否进入设置页面设置参数
        //未设置参数 CA1105读取不到将会置为false 默认要为true
        let isFiristGet = await this.storage.get("isFirstInitSetting")

        if (isFiristGet != null && isFiristGet != "") {
            this.CA1105 = await await this.storage.get("CA1105")
        }

        this.calculateWidth()
    }

    ionViewWillLeave() {
        clearInterval(this.socketInterval)
        //clearTimeout(this.heartBeatCheck);

        this.subscription.unsubscribe()
    }

    checkSocketConnect() {
        if (this.socketServiceService.getSocketState() != 2) {
            console.log("未连接")
            this.state = "assets/img/mode-select/unconnected.png"
        } else {
            console.log("连接")
            this.state = "assets/img/mode-select/connected.png"
        }
    }

    modalOpen() {
        this.modal.present()
    }

    closeModal() {
        this.modal.dismiss()
    }

    socketOnData(data) {
        console.log("收到数据")
        // let list = new TextDecoder('gbk').decode(data);
        //console.log(list);
        if (!this.synchronizeSocket(data)) {
            if (data.includes("AckSmoke")) {
                this.initFogImageMap()
                if (data == "AckSmoke0") {
                    this.imageMap.set(
                        "fog0",
                        "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog0.png"
                    )
                } else if (data == "AckSmoke1") {
                    this.imageMap.set(
                        "fog1",
                        "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog1Select.png"
                    )
                    this.imageMap.set(
                        "fog0",
                        "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog0Select.png"
                    )
                } else if (data == "AckSmoke2") {
                    this.imageMap.set(
                        "fog2",
                        "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog2Select.png"
                    )
                    this.imageMap.set(
                        "fog0",
                        "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog0Select.png"
                    )
                } else if (data == "AckSmoke3") {
                    this.imageMap.set(
                        "fog3",
                        "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog3Select.png"
                    )
                    this.imageMap.set(
                        "fog0",
                        "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog0Select.png"
                    )
                }
            } else {
                console.log(data)
                console.log("--------------------------------------------------------------------")
                console.log(data.substring(0, 3))
                console.log(data.substring(data.length - 3, data.length))

                if (/###http:\d*/.test(data)) {
                    console.log(this.musicStr)
                    this.musicStr = data.replace(/#/g, "")

                    console.log(
                        "--------------------------------------------------------------------"
                    )
                    console.log(this.musicStr)
                    this.httpClient.get(this.musicStr).subscribe(
                        (data: any[]) => {
                            //console.log("asdasd");
                            this.musicList = data
                            console.log(this.musicList)
                        },
                        (err) => {
                            console.log(err)
                        }
                    )
                }
            }
        }
        console.log("处理完成")

        this.cdr.detectChanges()
    }

    //点击 KTV
    async ktvSendtype(event, musicType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()
        this.ktvMode = true

        let state: string = this.imageMap.get("KTV")
        if (name == "KTV" && state.includes(`${name}Select`)) {
            this.initCA1105ImageMap()
            return
        }

        this.sendSocket(musicType)
        this.initImageMap()

        this.imageMap.set(
            "KTV",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTVSelect.svg"
        )

        // 点击状态
        switch (name) {
            case "soft":
                this.KTVCustomize1Clicked = true
                break
            case "romantic":
                this.KTVCustomize2Clicked = true
                break
            case "hazy":
                this.KTVCustomize3Clicked = true
                break
            case "passion":
                this.KTVCustomize4Clicked = true
                break
            case "dynamic":
                this.KTVCustomize5Clicked = true
                break
        }
    }

    //点击会客
    async sendConversationType(event, musicType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()
        this.conversationMode = true

        let state: string = this.imageMap.get("conversation")
        if (name == "conversation" && state.includes(`${name}Select`)) {
            this.initCA1105ImageMap()
            return
        }

        //音量设置
        this.musicVolume = await this.storage.get("conversationDefaultVolume")
        if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20
        }

        this.musicPlaying = true
        this.initImageMap()
        if (musicType) {
            this.sendSocket(musicType)
        }

        this.imageMap.set(
            "conversation",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/conversationSelect.svg"
        )

        // 点击状态
        switch (name) {
            case "meetingOption1":
                this.meetingCustomize1Clicked = true
                break
            case "meetingOption2":
                this.meetingCustomize2Clicked = true
                break
            case "meetingOption3":
                this.meetingCustomize3Clicked = true
                break
            case "meetingOption4":
                this.meetingCustomize4Clicked = true
                break
            case "meetingOption5":
                this.meetingCustomize5Clicked = true
                break
            case "meetingOption6":
                this.meetingCustomize6Clicked = true
                break
        }
    }

    //点击舞曲
    async sendDanceMusicType(event, musicType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()
        this.danceMusicMode = true

        let state: string = this.imageMap.get("danceMusic")
        if (name == "danceMusic" && state.includes(`${name}Select`)) {
            this.initCA1105ImageMap()
            return
        }

        this.musicVolume = await this.storage.get("dancemusicDefaultVolume")
        if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20
        }

        this.musicPlaying = true

        this.sendSocket(musicType)
        this.initImageMap()
        this.imageMap.set(
            "danceMusic",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/danceMusicSelect.svg"
        )
        if (name != "danceMusic") {
            this.imageMap.set(name, "assets/img/mode-select/" + name + "Select.png")
        }
    }

    //点击DJ派对
    async sendDJPartyType(event, musicPlayType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()
        this.DJPartyMode = true

        // let state: string = this.imageMap.get("DJParty")
        // if (name == "DJParty" && state.includes(`${name}Select`)) {
        //     this.initCA1105ImageMap()
        //     return
        // }

        this.sendSocket(musicPlayType)
        this.initImageMap()
        this.imageMap.set(
            "DJParty",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/DJPartySelect.svg"
        )
        // 点击状态
        switch (name) {
            case "DJ1":
                this.DJCustomize1Clicked = true
                break
            case "DJ2":
                this.DJCustomize2Clicked = true
                break
            case "DJ3":
                this.DJCustomize3Clicked = true
                break
            case "party":
                this.DJCustomize4Clicked = true
                break
        }
    }

    //点击生日
    async sendBirthdaysType(event, musicType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()
        this.bitrhdaysMode = true

        let state: string = this.imageMap.get("birthdays")
        if (name == "birthdays" && state.includes(`${name}Select`)) {
            this.initCA1105ImageMap()
            return
        }

        this.musicVolume = await this.storage.get("birthdaysDefaultVolume")
        if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20
        }

        this.musicPlaying = true

        this.initImageMap()
        if (!(musicType == "" || musicType == null || musicType == undefined)) {
            this.sendSocket(musicType)
        }

        this.imageMap.set(
            "birthdays",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/birthdaysSelect.svg"
        )
        if (name != "birthdays") {
            this.imageMap.set(
                name,
                "assets/img/mode-select/SVG_" + TranslateText.lang + "/" + name + "Select.png"
            )
        }
    }

    //点击上酒
    async sendLiquorType(event, musicPlayType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }

        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()
        this.liquorMode = true

        let state: string = this.imageMap.get("liquor")
        if (name == "liquor" && state.includes(`${name}Select`)) {
            this.initCA1105ImageMap()
            return
        }
        this.musicPlaying = true

        this.initImageMap()
        if (musicPlayType != "") {
            this.sendSocket(musicPlayType)
        }

        this.musicVolume = await this.storage.get("liquorDefaultVolume")
        if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20
        }

        this.imageMap.set(
            "liquor",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/liquorSelect.svg"
        )

        // 点击状态
        switch (name) {
            case "liquorOption1":
                this.liquorCustomize1Clicked = true
                break
            case "liquorOption2":
                this.liquorCustomize2Clicked = true
                break
            case "liquorOption3":
                this.liquorCustomize3Clicked = true
                break
            case "liquorOption4":
                this.liquorCustomize4Clicked = true
                break
            case "liquorOption5":
                this.liquorCustomize5Clicked = true
                break
            case "liquorOption6":
                this.liquorCustomize6Clicked = true
                break
        }
    }

    //点击蓝牙派对
    async sendBluetoothPartyType(event, musicType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()
        this.bluetoothPartyMode = true

        let state: string = this.imageMap.get("bluetoothParty")

        if (name == "bluetoothParty" && state.includes(`${name}Select`)) {
            this.initCA1105ImageMap()
            return
        }

        this.sendSocket(musicType)
        this.initImageMap()
        this.imageMap.set(
            "bluetoothParty",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/bluetoothPartySelect.svg"
        )
    }

    //点击K歌派对
    async sendDiscoPartyType(event, musicType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()

        this.discoPartyMode = true

        let state: string = this.imageMap.get("discoParty")
        if (name == "discoParty" && state.includes(`${name}Select`)) {
            this.initCA1105ImageMap()
            return
        }
        this.sendSocket(musicType)
        this.initImageMap()
        this.imageMap.set(
            "discoParty",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/discoPartySelect.svg"
        )
    }

    //点击K歌开关窗口
    async sendDiscoPartyWindows(event, musicType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }

        this.initsynchronizeSocket()
        this.discoPartyMode = true
        if (event.target.getAttribute("name") == "DiscoPartyWindows") {
            let url: string = this.imageMap.get("discoPartyWindows").toString()
            if (url.includes("windowsOFF.png")) {
                this.imageMap.set(
                    "discoPartyWindows",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/windowsON.png"
                )
                musicType = "kopen01"
            } else {
                this.imageMap.set(
                    "discoPartyWindows",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/windowsOFF.png"
                )
                musicType = "kopen00"
            }
        }
        this.sendSocket(musicType)
    }

    //点击圣诞
    async sendChristmasType(event, musicType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()
        this.christmasMode = true

        let state: string = this.imageMap.get("christmas")
        if (name == "christmas" && state.includes(`${name}Select`)) {
            this.initCA1105ImageMap()
            return
        }

        this.musicVolume = await this.storage.get("christmasDefaultVolume")
        if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20
        }
        this.musicPlaying = true

        this.sendSocket(musicType)
        this.initImageMap()

        this.imageMap.set(
            "christmas",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/christmasSelect.svg"
        )
        if (name != "christmas") {
            this.imageMap.set(name, "assets/img/mode-select/" + name + "Select.png")
        }
    }

    //点击GGdance
    async sendDanceType(event, musicPlayType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }

        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()
        this.danceMode = true

        let state: string = this.imageMap.get("dance")
        if (name == "dance" && state.includes(`${name}Select`)) {
            this.initCA1105ImageMap()
            return
        }
        this.musicPlaying = true

        if (musicPlayType != "") {
            this.sendSocket(musicPlayType)
        }
        this.initImageMap()
        this.musicVolume = await this.storage.get("danceDefaultVolume")
        if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20
        }

        this.imageMap.set(
            "dance",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/danceSelect.svg"
        )

        // 点击状态
        switch (name) {
            case "GGOption1":
                this.GGCustomize1Clicked = true
                break
            case "GGOption2":
                this.GGCustomize2Clicked = true
                break
            case "GGOption3":
                this.GGCustomize3Clicked = true
                break
            case "GGOption4":
                this.GGCustomize4Clicked = true
                break
            case "GGOption5":
                this.GGCustomize5Clicked = true
                break
            case "GGOption6":
                this.GGCustomize6Clicked = true
                break
        }
    }
    //点击求婚
    async sendProposeType(event, musicType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()

        this.proposeMode = true

        let state: string = this.imageMap.get("propose")
        if (name == "propose" && state.includes(`${name}Select`)) {
            this.initCA1105ImageMap()
            return
        }
        this.musicPlaying = true

        this.musicVolume = await this.storage.get("proposeDefaultVolume")
        if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20
        }

        this.sendSocket(musicType)
        this.initImageMap()

        this.imageMap.set(
            "propose",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/proposeSelect.svg"
        )
        if (name != "propose") {
            this.imageMap.set(name, "assets/img/mode-select/" + name + "Select.png")
        }
    }
    //点击选秀
    async sendBeautyType(event, musicType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()

        this.beautyMode = true

        let state: string = this.imageMap.get("beauty")
        if (name == "beauty" && state.includes(`${name}Select`)) {
            this.initCA1105ImageMap()
            return
        }
        this.musicPlaying = true

        this.musicVolume = await this.storage.get("beautyDefaultVolume")
        if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20
        }
        console.log(musicType)

        this.sendSocket(musicType)
        this.initImageMap()

        this.imageMap.set(
            "beauty",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/beautySelect.svg"
        )
        if (name != "beauty") {
            this.imageMap.set(name, "assets/img/mode-select/" + name + "Select.png")
        }
    }

    //总控开关
    sendMasterSwitchType(event, type) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()

            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        this.initsynchronizeSocket()
        this.masterSwitchMode = true

        this.initCA1105ImageMap()
        this.sendSocket(type)

        this.imageMap.set(
            "masterSwitch",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/masterSwitchSelect.svg"
        )
        if (type == "switchon") {
            this.masterSwitchState = true
        } else {
            this.masterSwitchState = false
            this.initImageMap()
        }
    }

    //照明 port 1234 value 255 打开 0 关闭
    async sendIlluminationType(event, port, value) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let name = event.target.getAttribute("name")
        this.initsynchronizeSocket()

        // CA1105 判断
        if (this.CA1105 == true) {
            this.illuminationMode = true
            this.initCA1105ImageMap()
            this.imageMap.set(
                "illumination",
                "assets/img/mode-select/SVG_" + TranslateText.lang + "/illuminationSelect.svg"
            )
            let illTempType: Boolean
            if (value == 255) {
                illTempType = true
            }
            if (value == 0) {
                illTempType = false
            }
            if (port == 1) {
                this.illuminationType1State = illTempType
                let dataString = "CA1105|1|" + value
                this.sendSocket(dataString)
            } else if (port == 2) {
                this.illuminationType2State = illTempType
                let dataString = "CA1105|2|" + value
                this.sendSocket(dataString)
            } else if (port == 3) {
                this.illuminationType3State = illTempType
                let dataString = "CA1105|3|" + value
                this.sendSocket(dataString)
            } else if (port == 4) {
                this.illuminationType4State = illTempType
                let dataString = "CA1105|4|" + value
                this.sendSocket(dataString)
            }
        } else {
            if (this.imageMap.get(name).includes("Select")) {
                this.initImageMap()
                this.imageMap.set(
                    "illumination",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/illumination.svg"
                )
                this.sendSocket("musictype_28")
            } else {
                this.initImageMap()
                this.imageMap.set(
                    "illumination",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/illuminationSelect.svg"
                )
                this.sendSocket("musictype_04")
            }
        }
    }

    //空调控制
    sendAirconditionerType(event, type) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        this.initsynchronizeSocket()
        this.airconditionerMode = true
        this.initCA1105ImageMap()
        this.imageMap.set(
            "airconditioner",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/airconditionerSelect.svg"
        )
    }

    //排风 value=0 关闭  255 打开 其他 不发送
    sendExhaustType($event, value) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        this.initsynchronizeSocket()
        this.exhaustMode = true

        this.initCA1105ImageMap()

        this.imageMap.set(
            "exhaust",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/exhaustSelect.svg"
        )
        if (value == 0 || value == 255) {
            let dataString = "CA1105|11|" + value
            this.sendSocket(dataString)
            if (value == 0) {
                this.exhaustState = false
            }
            if (value == 255) {
                this.exhaustState = true
            }
        }
    }

    //香薰 value=0 关闭  255 打开 其他 不发送
    sendAromatherapyType($event, value) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        this.initsynchronizeSocket()
        this.aromatherapyMode = true
        this.initCA1105ImageMap()

        this.imageMap.set(
            "aromatherapy",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/aromatherapySelect.svg"
        )
        if (value == 0 || value == 255) {
            let dataString = "CA1105|5|" + value
            this.sendSocket(dataString)
            if (value == 0) {
                this.aromatherapyState = false
            }
            if (value == 255) {
                this.aromatherapyState = true
            }
        }
    }

    // 点击雾机
    async sendFogType(event, fogType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()
        this.fogMode = true
        this.initCA1105ImageMap()

        if (fogType != "") {
            this.initFogImageMap()
            this.sendSocket(fogType)
            this.imageMap.set(
                name,
                "assets/img/mode-select/SVG_" + TranslateText.lang + "/" + name + "Select.png"
            )
            this.imageMap.set(
                "fog0",
                "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog0Select.png"
            )
        }

        this.imageMap.set(
            "fog",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/fogSelect.svg"
        )
    }

    // 雾机选项 --点击关
    async closeFogMachine(event, fogType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        let imageName = event.target.src
        console.log(imageName)
        this.sendSocket(fogType)
        this.initFogImageMap()

        this.imageMap.set(
            "fogOption",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/fogSelect.svg"
        )
        this.imageMap.set(
            "fog",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/fogSelect.svg"
        )
    }

    //灯光控台控制
    async sendLightControlType(event, type) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()

            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        this.sendSocket(type)
        this.lightControlOpen = !this.lightControlOpen
    }

    //VJ控台控制
    async sendResolumeControlType(event, type) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        this.sendSocket(type)
        this.ResolumeControlOpen = !this.ResolumeControlOpen
    }

    //点击音乐播放器按钮
    musicPlayerSend(event, musicPlayType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        }

        this.sendSocket(musicPlayType)
        if (musicPlayType == "play" || musicPlayType == "pause") {
            this.musicPlaying = !this.musicPlaying
        }
    }

    /**
     * 点击开场秀
     * @param event
     * @param musicPlayType
     * @returns
     */
    async sendShowType(event, musicPlayType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        }
        let name = event.target.getAttribute("name")

        this.initsynchronizeSocket()
        this.showMode = true

        let state: string = this.imageMap.get("show")
        if (name == "show" && state.includes(`${name}Select`)) {
            this.initCA1105ImageMap()
            return
        }

        this.musicVolume = await this.storage.get("showDefaultVolume")
        if (this.musicVolume == null || isNaN(this.musicVolume)) {
            this.musicVolume = 20
        }
        if (musicPlayType != "") {
            this.sendSocket(musicPlayType)
        }
        this.initImageMap()

        this.imageMap.set(name, "assets/img/mode-select/" + name + "Select.png")
        this.imageMap.set(
            "show",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/showSelect.svg"
        )
        // 点击状态
        switch (name) {
            case "show1":
                this.showCustomize1Clicked = true
                break
            case "show2":
                this.showCustomize2Clicked = true
                break
            case "show3":
                this.showCustomize3Clicked = true
                break
            case "show4":
                this.showCustomize4Clicked = true
                break
        }
    }

    //音量同步发送
    volumeSend() {
        let dataString = "volume"
        if (this.musicVolume < 10) {
            dataString = dataString + "0" + this.musicVolume
        } else if (this.musicVolume > 10 && this.musicVolume < 100) {
            dataString = dataString + this.musicVolume
        } else if (this.musicVolume == 100) {
            //没有100,用95代替
            dataString = dataString + "95"
        } else {
            dataString = dataString + "00"
        }
        this.sendSocket(dataString)
    }
    //音量改变
    volumeChange(event) {
        this.musicVolume = event.target.value
        let dataString = "volume"
        if (this.musicVolume < 10) {
            dataString = dataString + "00" + this.musicVolume
        } else if (this.musicVolume > 10 && this.musicVolume < 100) {
            dataString = dataString + "0" + this.musicVolume
        } else if (this.musicVolume == 100) {
            dataString = dataString + this.musicVolume
        } else {
            dataString = dataString + "000"
        }

        this.sendSocket(dataString)
        console.log(this.musicVolume)
    }
    //点击音量加号
    volumeAdd() {
        if (this.musicVolume < 10) {
            this.musicVolume = this.musicVolume + 1
        } else {
            this.musicVolume = this.musicVolume + 5
        }
        if (this.musicVolume > 100) {
            this.musicVolume = 100
        }

        let dataString = "volume"
        if (this.musicVolume < 10) {
            dataString = dataString + "00" + this.musicVolume
        } else if (this.musicVolume >= 10 && this.musicVolume < 100) {
            dataString = dataString + "0" + this.musicVolume
        } else if (this.musicVolume == 100) {
            dataString = dataString + this.musicVolume
        } else {
            dataString = dataString + "000"
        }

        this.sendSocket(dataString)
    }
    //点击音量减号
    volumeSub() {
        if (this.musicVolume <= 10) {
            this.musicVolume = this.musicVolume - 1
        } else {
            this.musicVolume = this.musicVolume - 5
        }
        if (this.musicVolume < 0) {
            this.musicVolume = 0
        }
        let dataString = "volume"
        if (this.musicVolume < 10) {
            dataString = dataString + "00" + this.musicVolume
        } else if (this.musicVolume >= 10 && this.musicVolume < 100) {
            dataString = dataString + "0" + this.musicVolume
        } else if (this.musicVolume == 100) {
            dataString = dataString + this.musicVolume
        } else {
            dataString = dataString + "000"
        }

        this.sendSocket(dataString)
        console.log(this.musicVolume)
    }
    //点击音量条
    clickMusicVolume(event) {
        this.musicVolumeChange = !this.musicVolumeChange
    }
    /**
     * 播放音乐
     * @param id music.id
     * @param musicTitle
     * @returns
     */
    playMusic(id, musicTitle) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        }
        let dataString: String = "listselect"
        dataString = dataString + id + "#"
        // let data = new Uint8Array(dataString.length);
        // for (let i = 0; i < data.length; i++) {
        //   console.log(dataString);
        //   data[i] = dataString.charCodeAt(i);

        // }
        this.sendSocket(dataString)

        // let musicDetail={musicTitle:musicTitle,id}
        // this.modalController.dismiss(musicDetail);
        this.modal.dismiss()
    }
    //发送空调指令,port -- 7开启空调 8低  9中 10高 value-- 0关闭 255打开
    airconditionerSendType(event, port, value) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }
        if (this.airconditionerType == 6 && port != 7 && port != 6) {
            console.log(port)
            return
        }
        let dataString = "CA1105|"
        if (port == 7) {
            if (
                this.airconditionerType == 8 ||
                this.airconditionerType == 9 ||
                this.airconditionerType == 10
            ) {
                dataString = dataString + this.airconditionerType + "|" + value
            } else {
                dataString = dataString + "8|" + value
                this.airconditionerType = "8"
            }

            this.sendSocket("CA1105|7|255")
        } else {
            dataString = dataString + port + "|" + value
            this.airconditionerType = port
        }

        this.sendSocket(dataString)
        if (port == 6) {
            this.storage.set("airconditionerState", false)
            this.airconditionerState = false
        } else if (port == 7) {
            this.storage.set("airconditionerState", true)
            this.airconditionerState = true
        } else if (value == 0) {
            this.airconditionerState = false
        }
    }
    // 蓝牙
    sendBluetoothType(event, musicType) {
        console.log(musicType)

        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }

        this.initsynchronizeSocket()
        this.sendSocket(musicType)
    }
    //服务
    async sendServiceType(event, musicPlayType) {
        if (this.socketServiceService.getSocketState() != 2) {
            this.alertNoConnectTips()
            return
        } else {
            this.state = "assets/img/mode-select/connected.png"
        }

        this.initsynchronizeSocket()
        this.serviceModel = true

        let name = event.target.getAttribute("name")
        console.log(name)

        //照明服务不重置
        let illuminationState = this.imageMap.get("illumination")
        if (this.imageMap.get(name).includes("Select")) {
            this.initCA1105ImageMap()
            this.imageMap.set(
                name,
                "assets/img/mode-select/SVG_" + TranslateText.lang + "/" + name + ".svg"
            )
            //读取照明参数,不重置
            this.imageMap.set("illumination", illuminationState)

            //取消定时器 重置服务灯状态
            Timer.endCycleTimer(() => {
                this.initColor()
                this.sendSocket("server_rgb:" + ColorUtil.getColorRGB(this.color) + "000")
            })
        } else {
            let imageUrl =
                "assets/img/mode-select/SVG_" + TranslateText.lang + "/" + name + "Select.svg"

            this.initCA1105ImageMap()
            this.imageMap.set(name, imageUrl)
            //读取照明参数,不重置
            this.imageMap.set("illumination", illuminationState)

            //  开启定时器 循环发送 蜂鸣器 循环开关
            let count = 0
            let type = true
            Timer.startCycleTimer(() => {
                this.initColor()
                let string: string
                if (count == 4) {
                    count = 0
                }
                let list: Array<string> = ColorUtil.getOtherColorRGB(this.color)
                if (type) {
                    string = list[count] + "255"
                    type = false
                } else {
                    string = list[count] + "000"
                    type = true
                }
                console.log("server_rgb:" + string)
                this.sendSocket("server_rgb:" + string)
                count++
            })
        }
    }

    /**
     * 初始化图片imageMap
     */
    initImageMap() {
        this.imageMap.set("KTV", "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTV.svg")
        this.imageMap.set(
            "birthdays",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/birthdays.svg"
        )
        this.imageMap.set(
            "christmas",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/christmas.svg"
        )
        this.imageMap.set(
            "DJParty",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/DJParty.svg"
        )
        this.imageMap.set(
            "conversation",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/conversation.svg"
        )
        this.imageMap.set(
            "danceMusic",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/danceMusic.svg"
        )
        this.imageMap.set("show", "assets/img/mode-select/SVG_" + TranslateText.lang + "/show.svg")

        //上酒
        this.imageMap.set(
            "liquor",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/liquor.svg"
        )
        //GGdance
        this.imageMap.set(
            "dance",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/dance.svg"
        )
        // k歌派对
        this.imageMap.set(
            "discoParty",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/discoParty.svg"
        )
        // 蓝牙派对
        this.imageMap.set(
            "bluetoothParty",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/bluetoothParty.svg"
        )

        this.imageMap.set(
            "propose",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/propose.svg"
        )

        this.imageMap.set(
            "beauty",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/beauty.svg"
        )

        //总控开关
        this.initCA1105ImageMap()
        // k歌 选项
        this.imageMap.set(
            "discoPartyWindows",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/windowsOFF.png"
        )
        //生日 选项
        this.imageMap.set(
            "children",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/children.png"
        )
        this.imageMap.set("lady", "assets/img/mode-select/SVG_" + TranslateText.lang + "/lady.png")
        this.imageMap.set("man", "assets/img/mode-select/SVG_" + TranslateText.lang + "/man.png")
        //会话 选项
        this.meetingCustomize1Clicked = false
        this.meetingCustomize2Clicked = false
        this.meetingCustomize3Clicked = false
        this.meetingCustomize4Clicked = false
        this.meetingCustomize5Clicked = false
        this.meetingCustomize6Clicked = false

        //GG 选项
        this.GGCustomize1Clicked = false
        this.GGCustomize2Clicked = false
        this.GGCustomize3Clicked = false
        this.GGCustomize4Clicked = false
        this.GGCustomize5Clicked = false
        this.GGCustomize6Clicked = false

        //上酒 选项
        this.liquorCustomize1Clicked = false
        this.liquorCustomize2Clicked = false
        this.liquorCustomize3Clicked = false
        this.liquorCustomize4Clicked = false
        this.liquorCustomize5Clicked = false
        this.liquorCustomize6Clicked = false

        //DJ派对 选项
        this.DJCustomize1Clicked = false
        this.DJCustomize2Clicked = false
        this.DJCustomize3Clicked = false
        this.DJCustomize4Clicked = false

        //开场秀 选项
        this.showCustomize1Clicked = false
        this.showCustomize2Clicked = false
        this.showCustomize3Clicked = false
        this.showCustomize4Clicked = false

        //唱歌 选项
        this.KTVCustomize1Clicked = false
        this.KTVCustomize2Clicked = false
        this.KTVCustomize3Clicked = false
        this.KTVCustomize4Clicked = false
        this.KTVCustomize5Clicked = false
    }

    private initCA1105ImageMap() {
        //照明
        this.imageMap.set(
            "illumination",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/illumination.svg"
        )
        this.imageMap.set(
            "illumination1.0",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/illumination.svg"
        )
        //总控开关
        this.imageMap.set(
            "masterSwitch",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/masterSwitch.svg"
        )
        //空调
        this.imageMap.set(
            "airconditioner",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/airconditioner.svg"
        )
        //排风
        this.imageMap.set(
            "exhaust",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/exhaust.svg"
        )
        //香薰
        this.imageMap.set(
            "aromatherapy",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/aromatherapy.svg"
        )
        //雾机
        this.imageMap.set("fog", "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog.svg")
        this.imageMap.set(
            "fogOption",
            "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog.svg"
        )
    }

    initFogImageMap() {
        this.imageMap.set("fog", "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog.svg")
        this.imageMap.set("fog0", "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog0.png")
        this.imageMap.set("fog1", "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog1.png")
        this.imageMap.set("fog2", "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog2.png")
        this.imageMap.set("fog3", "assets/img/mode-select/SVG_" + TranslateText.lang + "/fog3.png")
    }

    sendSocket(musicType) {
        this.socketServiceService.sendSocketData(musicType)
    }
    //同步初始化所有模式
    initsynchronizeSocket() {
        this.bitrhdaysMode = false

        this.ktvMode = false
        this.christmasMode = false
        this.playerBackgroundMode = false
        this.conversationMode = false
        this.musicVolumeChange = false
        this.danceMusicMode = false
        this.discoPartyMode = false
        this.bluetoothPartyMode = false

        this.DJPartyMode = false
        this.illuminationMode = false
        this.musicPlaying = false
        this.serviceModel = false
        this.showMode = false
        this.liquorMode = false
        this.danceMode = false
        this.beautyMode = false
        this.proposeMode = false

        //总控开关
        this.masterSwitchMode = false
        //空调
        this.airconditionerMode = false
        //排风
        this.exhaustMode = false
        //香薰
        this.aromatherapyMode = false
        //雾机
        this.fogMode = false
    }

    async calculateSize() {
        await this.initHiddenArea()
        this.hiddenArea =
            this.discoState ||
            this.bluetoothState ||
            this.liquorState ||
            this.beautyState ||
            this.GGDanceState ||
            this.proposeState

        if (
            this.hiddenAreaHeight == null ||
            this.hiddenAreaHeight == undefined ||
            this.hiddenAreaHeight == ""
        ) {
            let count: number = 0

            if (this.discoState || this.bluetoothState) {
                count = count + 1
            }
            if (this.liquorState || this.beautyState) {
                count = count + 1
            }
            if (this.GGDanceState || this.proposeState) {
                count = count + 1
            }

            this.hiddenAreaHeight = count == 1 ? "99%" : count == 2 ? "49.5%" : "33%"
        }
    }

    private async initHiddenArea() {
        this.discoState = await this.storage.get("discoState")
        this.bluetoothState = await this.storage.get("bluetoothState")
        this.liquorState = await this.storage.get("liquorState")
        this.beautyState = await this.storage.get("beautyState")
        this.GGDanceState = await this.storage.get("GGDanceState")
        this.proposeState = await this.storage.get("proposeState")
    }

    calculateWidth() {
        //区域状态尺寸
        let areaWidth_column_5 = 12 / 5
        let areaWidth_column_7 = 12 / 7
        let areaWidth_column_6 = 2
        let areaWidth_hiddenAreaOFF_showTypeOFF = 2

        // 判断可隐藏区域列数 是否为2列
        this.hiddenAreaWightType =
            (this.discoState && this.bluetoothState) ||
            (this.liquorState && this.beautyState) ||
            (this.GGDanceState && this.proposeState)

        if (this.hiddenArea) {
            if (this.showType && this.hiddenAreaWightType) {
                this.areaWidth = areaWidth_column_7
            } else if (!this.showType && this.hiddenAreaWightType) {
                this.areaWidth = areaWidth_column_6
            } else if (!this.showType && !this.hiddenAreaWightType) {
                this.areaWidth = areaWidth_column_5
            } else {
                this.areaWidth = areaWidth_column_6
            }
        } else {
            if (this.showType) {
                this.areaWidth = areaWidth_column_5
            } else {
                this.areaWidth = areaWidth_hiddenAreaOFF_showTypeOFF
            }
        }
    }

    //弹出未连接提示
    async alertNoConnectTips() {
        const alert = await this.alertController.create({
            header: TranslateText.modelSelect.alert.header,
            message: TranslateText.modelSelect.alert.message,
            cssClass: "alertBlackBackground",
            buttons: [TranslateText.modelSelect.alert.confirmBtn],
        })
        alert.present()
    }

    ionViewDidEnter() {
        console.log("进入页面之后")
        this.checkScreenSaver()
    }
    async checkScreenSaver() {
        this.screen = await this.storage.get("screenSaver")

        if (this.screen == undefined || this.screen == 0) {
            console.log("屏保计时未开启")
            return
        }
        console.log("屏保计时开启")
        Timer.startAndGetTaskId(() => {
            console.log("跳转页面")
            this.navController.navigateForward("/screen")
        })
    }

    ionViewDidLeave() {
        if (this.screen == undefined || this.screen == 0) {
            return
        }
        Timer.endTimeTask()
    }

    resetTimer() {
        if (this.screen == undefined || this.screen == 0) {
            return
        }
        Timer.resetTimeTask()
    }

    // 获取自定义类型 --照明区 --会客 --上酒 --GG --DJ --选秀 --求婚
    private async initCustomTepy() {
        this.web.getParameterByType(this.address, "1").subscribe(async (res) => {
            if (res.code == 200) {
                for (let i = 0; i < res.data.length; i++) {
                    switch (res.data[i].key) {
                        case "light_area_01":
                            await this.storage.set("illuminationType1", res.data[i].value)
                            this.illuminationType1 = res.data[i].value
                            break
                        case "light_area_02":
                            await this.storage.set("illuminationType2", res.data[i].value)
                            this.illuminationType2 = res.data[i].value
                            break
                        case "light_area_03":
                            await this.storage.set("illuminationType3", res.data[i].value)
                            this.illuminationType3 = res.data[i].value
                            break
                        case "light_area_04":
                            await this.storage.set("illuminationType4", res.data[i].value)
                            this.illuminationType4 = res.data[i].value
                            break
                    }
                }
            }
        })
        // 照明
        this.illuminationType1 = await this.storage.get("illuminationType1")
        this.illuminationType2 = await this.storage.get("illuminationType2")
        this.illuminationType3 = await this.storage.get("illuminationType3")
        this.illuminationType4 = await this.storage.get("illuminationType4")
        if (!this.illuminationType1) {
            this.illuminationType1 = "吧台区"
        }
        if (!this.illuminationType2) {
            this.illuminationType2 = "桌球区"
        }
        if (!this.illuminationType3) {
            this.illuminationType3 = "休闲区"
        }
        if (!this.illuminationType4) {
            this.illuminationType4 = "自定义"
        }

        // 区域文字获取 --GG
        this.web.getParameterByType(this.address, "2").subscribe(async (res) => {
            if (res.code == 200) {
                for (let i = 0; i < res.data.length; i++) {
                    switch (res.data[i].key) {
                        case "GG_area_01":
                            await this.storage.set("GGCustomize1", res.data[i].value)
                            this.GGCustomize1 = res.data[i].value
                            break
                        case "GG_area_02":
                            await this.storage.set("GGCustomize2", res.data[i].value)
                            this.GGCustomize2 = res.data[i].value
                            break
                        case "GG_area_03":
                            await this.storage.set("GGCustomize3", res.data[i].value)
                            this.GGCustomize3 = res.data[i].value
                            break
                        case "GG_area_04":
                            await this.storage.set("GGCustomize4", res.data[i].value)
                            this.GGCustomize4 = res.data[i].value
                            break
                        case "GG_area_05":
                            await this.storage.set("GGCustomize5", res.data[i].value)
                            this.GGCustomize5 = res.data[i].value
                            break
                        case "GG_area_06":
                            await this.storage.set("GGCustomize6", res.data[i].value)
                            this.GGCustomize6 = res.data[i].value
                            break
                    }
                }
            }
        })
        this.GGCustomize1 = await this.storage.get("GGCustomize1")
        this.GGCustomize2 = await this.storage.get("GGCustomize2")
        this.GGCustomize3 = await this.storage.get("GGCustomize3")
        this.GGCustomize4 = await this.storage.get("GGCustomize4")
        this.GGCustomize5 = await this.storage.get("GGCustomize5")
        this.GGCustomize6 = await this.storage.get("GGCustomize6")
        if (!this.GGCustomize1) {
            this.GGCustomize1 = "1"
        }
        if (!this.GGCustomize2) {
            this.GGCustomize2 = "2"
        }
        if (!this.GGCustomize3) {
            this.GGCustomize3 = "3"
        }
        if (!this.GGCustomize4) {
            this.GGCustomize4 = "4"
        }
        if (!this.GGCustomize5) {
            this.GGCustomize5 = "5"
        }
        if (!this.GGCustomize6) {
            this.GGCustomize6 = "6"
        }

        // 区域文字获取 --会客
        this.web.getParameterByType(this.address, "3").subscribe(async (res) => {
            if (res.code == 200) {
                for (let i = 0; i < res.data.length; i++) {
                    switch (res.data[i].key) {
                        case "meeting_area_01":
                            await this.storage.set("meetingCustomize1", res.data[i].value)
                            this.meetingCustomize1 = res.data[i].value
                            break
                        case "meeting_area_02":
                            await this.storage.set("meetingCustomize2", res.data[i].value)
                            this.meetingCustomize2 = res.data[i].value
                            break
                        case "meeting_area_03":
                            await this.storage.set("meetingCustomize3", res.data[i].value)
                            this.meetingCustomize3 = res.data[i].value
                            break
                        case "meeting_area_04":
                            await this.storage.set("meetingCustomize4", res.data[i].value)
                            this.meetingCustomize4 = res.data[i].value
                            break
                        case "meeting_area_05":
                            await this.storage.set("meetingCustomize5", res.data[i].value)
                            this.meetingCustomize5 = res.data[i].value
                            break
                        case "meeting_area_06":
                            await this.storage.set("meetingCustomize6", res.data[i].value)
                            this.meetingCustomize6 = res.data[i].value
                            break
                    }
                }
            }
        })
        this.meetingCustomize1 = await this.storage.get("meetingCustomize1")
        this.meetingCustomize2 = await this.storage.get("meetingCustomize2")
        this.meetingCustomize3 = await this.storage.get("meetingCustomize3")
        this.meetingCustomize4 = await this.storage.get("meetingCustomize4")
        this.meetingCustomize5 = await this.storage.get("meetingCustomize5")
        this.meetingCustomize6 = await this.storage.get("meetingCustomize6")
        if (!this.meetingCustomize1) {
            this.meetingCustomize1 = "1"
        }
        if (!this.meetingCustomize2) {
            this.meetingCustomize2 = "2"
        }
        if (!this.meetingCustomize3) {
            this.meetingCustomize3 = "3"
        }
        if (!this.meetingCustomize4) {
            this.meetingCustomize4 = "4"
        }
        if (!this.meetingCustomize5) {
            this.meetingCustomize5 = "5"
        }
        if (!this.meetingCustomize6) {
            this.meetingCustomize6 = "6"
        }

        //区域文字获取 --上酒
        this.web.getParameterByType(this.address, "4").subscribe(async (res) => {
            if (res.code == 200) {
                for (let i = 0; i < res.data.length; i++) {
                    switch (res.data[i].key) {
                        case "liquor_area_01":
                            await this.storage.set("liquorCustomize1", res.data[i].value)
                            this.liquorCustomize1 = res.data[i].value
                            break
                        case "liquor_area_02":
                            await this.storage.set("liquorCustomize2", res.data[i].value)
                            this.liquorCustomize2 = res.data[i].value
                            break
                        case "liquor_area_03":
                            await this.storage.set("liquorCustomize3", res.data[i].value)
                            this.liquorCustomize3 = res.data[i].value
                            break
                        case "liquor_area_04":
                            await this.storage.set("liquorCustomize4", res.data[i].value)
                            this.liquorCustomize4 = res.data[i].value
                            break
                        case "liquor_area_05":
                            await this.storage.set("liquorCustomize5", res.data[i].value)
                            this.liquorCustomize5 = res.data[i].value
                            break
                        case "liquor_area_06":
                            await this.storage.set("liquorCustomize6", res.data[i].value)
                            this.liquorCustomize6 = res.data[i].value
                            break
                    }
                }
            }
        })
        this.liquorCustomize1 = await this.storage.get("liquorCustomize1")
        this.liquorCustomize2 = await this.storage.get("liquorCustomize2")
        this.liquorCustomize3 = await this.storage.get("liquorCustomize3")
        this.liquorCustomize4 = await this.storage.get("liquorCustomize4")
        this.liquorCustomize5 = await this.storage.get("liquorCustomize5")
        this.liquorCustomize6 = await this.storage.get("liquorCustomize6")
        if (!this.liquorCustomize1) {
            this.liquorCustomize1 = "1"
        }
        if (!this.liquorCustomize2) {
            this.liquorCustomize2 = "2"
        }
        if (!this.liquorCustomize3) {
            this.liquorCustomize3 = "3"
        }
        if (!this.liquorCustomize4) {
            this.liquorCustomize4 = "4"
        }
        if (!this.liquorCustomize5) {
            this.liquorCustomize5 = "5"
        }
        if (!this.liquorCustomize6) {
            this.liquorCustomize6 = "6"
        }
        //区域文字获取 --DJ
        this.web.getParameterByType(this.address, "5").subscribe(async (res) => {
            if (res.code == 200) {
                for (let i = 0; i < res.data.length; i++) {
                    switch (res.data[i].key) {
                        case "DJ_area_01":
                            await this.storage.set("DJCustomize1", res.data[i].value)
                            this.DJCustomize1 = res.data[i].value
                            break
                        case "DJ_area_02":
                            await this.storage.set("DJCustomize2", res.data[i].value)
                            this.DJCustomize2 = res.data[i].value
                            break
                        case "DJ_area_03":
                            await this.storage.set("DJCustomize3", res.data[i].value)
                            this.DJCustomize3 = res.data[i].value
                            break
                        case "DJ_area_04":
                            await this.storage.set("DJCustomize4", res.data[i].value)
                            this.DJCustomize4 = res.data[i].value
                            break
                    }
                }
            }
        })

        this.DJCustomize1 = await this.storage.get("DJCustomize1")
        this.DJCustomize2 = await this.storage.get("DJCustomize2")
        this.DJCustomize3 = await this.storage.get("DJCustomize3")
        this.DJCustomize4 = await this.storage.get("DJCustomize4")

        if (!this.DJCustomize1) {
            this.DJCustomize1 = "DJ1"
        }
        if (!this.DJCustomize2) {
            this.DJCustomize2 = "DJ2"
        }
        if (!this.DJCustomize3) {
            this.DJCustomize3 = "DJ3"
        }
        if (!this.DJCustomize4) {
            this.DJCustomize4 = "party"
        }

        //区域文字获取 --KTV
        this.web.getParameterByType(this.address, "6").subscribe(async (res) => {
            if (res.code == 200) {
                for (let i = 0; i < res.data.length; i++) {
                    switch (res.data[i].key) {
                        case "KTV_area_01":
                            await this.storage.set("KTVCustomize1", res.data[i].value)
                            this.KTVCustomize1 = res.data[i].value
                            break
                        case "KTV_area_02":
                            await this.storage.set("KTVCustomize2", res.data[i].value)
                            this.KTVCustomize2 = res.data[i].value
                            break
                        case "KTV_area_03":
                            await this.storage.set("KTVCustomize3", res.data[i].value)
                            this.KTVCustomize3 = res.data[i].value
                            break
                        case "KTV_area_04":
                            await this.storage.set("KTVCustomize4", res.data[i].value)
                            this.KTVCustomize4 = res.data[i].value
                            break
                        case "KTV_area_05":
                            await this.storage.set("KTVCustomize5", res.data[i].value)
                            this.KTVCustomize5 = res.data[i].value
                            break
                    }
                }
            }
        })
        this.KTVCustomize1 = await this.storage.get("KTVCustomize1")
        this.KTVCustomize2 = await this.storage.get("KTVCustomize2")
        this.KTVCustomize3 = await this.storage.get("KTVCustomize3")
        this.KTVCustomize4 = await this.storage.get("KTVCustomize4")
        this.KTVCustomize5 = await this.storage.get("KTVCustomize5")
        if (!this.KTVCustomize1) {
            this.KTVCustomize1 = "柔和"
        }
        if (!this.KTVCustomize2) {
            this.KTVCustomize2 = "浪漫"
        }
        if (!this.KTVCustomize3) {
            this.KTVCustomize3 = "朦胧"
        }
        if (!this.KTVCustomize4) {
            this.KTVCustomize4 = "激情"
        }
        if (!this.KTVCustomize5) {
            this.KTVCustomize5 = "动感"
        }

        //show
        this.web.getParameterByType(this.address, "7").subscribe(async (res) => {
            if (res.code == 200) {
                for (let i = 0; i < res.data.length; i++) {
                    switch (res.data[i].key) {
                        case "show_area_01":
                            await this.storage.set("showCustomize1", res.data[i].value)
                            this.showCustomize1 = res.data[i].value
                            break
                        case "show_area_02":
                            await this.storage.set("showCustomize2", res.data[i].value)
                            this.showCustomize2 = res.data[i].value
                            break
                        case "show_area_03":
                            await this.storage.set("showCustomize3", res.data[i].value)
                            this.showCustomize3 = res.data[i].value
                            break
                        case "show_area_04":
                            await this.storage.set("showCustomize4", res.data[i].value)
                            this.showCustomize4 = res.data[i].value
                            break
                    }
                }
            }
        })

        this.showCustomize1 = await this.storage.get("showCustomize1")
        this.showCustomize2 = await this.storage.get("showCustomize2")
        this.showCustomize3 = await this.storage.get("showCustomize3")
        this.showCustomize4 = await this.storage.get("showCustomize4")

        if (!this.showCustomize1) {
            this.showCustomize1 = "1"
        }
        if (!this.showCustomize2) {
            this.showCustomize2 = "2"
        }
        if (!this.showCustomize3) {
            this.showCustomize3 = "3"
        }
        if (!this.showCustomize4) {
            this.showCustomize4 = "4"
        }
    }
    // 照明区文字状态改变
    async changeIlluminationText(event) {
        this.illuminationType1ReadOnly = true
        this.illuminationType2ReadOnly = true
        this.illuminationType3ReadOnly = true
        this.illuminationType4ReadOnly = true
        let name = event.target.getAttribute("name")
        let type = "1"
        switch (name) {
            case "illuminationType1":
                if (this.illuminationType1 == null || this.illuminationType1 == "") {
                    this.illuminationType1 = "吧台区"
                }

                await this.storage.set("illuminationType1", this.illuminationType1)
                this.web
                    .setParameter(this.address, type, "light_area_01", this.illuminationType1)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "illuminationType2":
                if (this.illuminationType2 == null || this.illuminationType2 == "") {
                    this.illuminationType2 = "桌球区"
                }
                await this.storage.set("illuminationType2", this.illuminationType2)
                this.web
                    .setParameter(this.address, type, "light_area_02", this.illuminationType2)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "illuminationType3":
                if (this.illuminationType3 == null || this.illuminationType3 == "") {
                    this.illuminationType3 = "休闲区"
                }
                await this.storage.set("illuminationType3", this.illuminationType3)
                this.web
                    .setParameter(this.address, type, "light_area_03", this.illuminationType3)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "illuminationType4":
                if (this.illuminationType4 == null || this.illuminationType4 == "") {
                    this.illuminationType4 = "自定义"
                }
                await this.storage.set("illuminationType4", this.illuminationType4)
                this.web
                    .setParameter(this.address, type, "light_area_04", this.illuminationType4)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
        }
    }
    // GG区文字状态改变
    async changeGGCustomizeText(event) {
        this.GGCustomize1ReadOnly = true
        this.GGCustomize2ReadOnly = true
        this.GGCustomize3ReadOnly = true
        this.GGCustomize4ReadOnly = true
        this.GGCustomize5ReadOnly = true
        this.GGCustomize6ReadOnly = true

        let name = event.target.getAttribute("name")
        let type = "2"
        switch (name) {
            case "GGOption1":
                if (this.GGCustomize1 == null || this.GGCustomize1 == "") {
                    this.GGCustomize1 = "1"
                }
                await this.storage.set("GGCustomize1", this.GGCustomize1)
                this.web
                    .setParameter(this.address, type, "GG_area_01", this.GGCustomize1)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "GGOption2":
                if (this.GGCustomize2 == null || this.GGCustomize2 == "") {
                    this.GGCustomize2 = "2"
                }
                await this.storage.set("GGCustomize2", this.GGCustomize2)
                this.web
                    .setParameter(this.address, type, "GG_area_02", this.GGCustomize2)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "GGOption3":
                if (this.GGCustomize3 == null || this.GGCustomize3 == "") {
                    this.GGCustomize3 = "3"
                }
                await this.storage.set("GGCustomize3", this.GGCustomize3)
                this.web
                    .setParameter(this.address, type, "GG_area_03", this.GGCustomize3)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "GGOption4":
                if (this.GGCustomize4 == null || this.GGCustomize4 == "") {
                    this.GGCustomize4 = "4"
                }
                await this.storage.set("GGCustomize4", this.GGCustomize4)
                this.web
                    .setParameter(this.address, type, "GG_area_04", this.GGCustomize4)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "GGOption5":
                if (this.GGCustomize5 == null || this.GGCustomize5 == "") {
                    this.GGCustomize5 = "5"
                }
                await this.storage.set("GGCustomize5", this.GGCustomize5)
                this.web
                    .setParameter(this.address, type, "GG_area_05", this.GGCustomize5)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "GGOption6":
                if (this.GGCustomize6 == null || this.GGCustomize6 == "") {
                    this.GGCustomize6 = "6"
                }
                await this.storage.set("GGCustomize6", this.GGCustomize6)
                this.web
                    .setParameter(this.address, type, "GG_area_06", this.GGCustomize6)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
        }
    }

    // 会客区文字状态改变
    async changeMeetingCustomizeText(event) {
        this.meetingCustomize1ReadOnly = true
        this.meetingCustomize2ReadOnly = true
        this.meetingCustomize3ReadOnly = true
        this.meetingCustomize4ReadOnly = true
        this.meetingCustomize5ReadOnly = true
        this.meetingCustomize6ReadOnly = true
        let name = event.target.getAttribute("name")
        let type = "3"
        switch (name) {
            case "meetingOption1":
                if (this.meetingCustomize1 == null || this.meetingCustomize1 == "") {
                    this.meetingCustomize1 = "1"
                }
                await this.storage.set("meetingCustomize1", this.meetingCustomize1)
                this.web
                    .setParameter(this.address, type, "meeting_area_01", this.meetingCustomize1)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "meetingOption2":
                if (this.meetingCustomize2 == null || this.meetingCustomize2 == "") {
                    this.meetingCustomize2 = "2"
                }
                await this.storage.set("meetingCustomize2", this.meetingCustomize2)
                this.web
                    .setParameter(this.address, type, "meeting_area_02", this.meetingCustomize2)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "meetingOption3":
                if (this.meetingCustomize3 == null || this.meetingCustomize3 == "") {
                    this.meetingCustomize3 = "3"
                }
                await this.storage.set("meetingCustomize3", this.meetingCustomize3)
                this.web
                    .setParameter(this.address, type, "meeting_area_03", this.meetingCustomize3)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "meetingOption4":
                if (this.meetingCustomize4 == null || this.meetingCustomize4 == "") {
                    this.meetingCustomize4 = "4"
                }
                await this.storage.set("meetingCustomize4", this.meetingCustomize4)
                this.web
                    .setParameter(this.address, type, "meeting_area_04", this.meetingCustomize4)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "meetingOption5":
                if (this.meetingCustomize5 == null || this.meetingCustomize5 == "") {
                    this.meetingCustomize5 = "5"
                }
                await this.storage.set("meetingCustomize5", this.meetingCustomize5)
                this.web
                    .setParameter(this.address, type, "meeting_area_05", this.meetingCustomize5)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "meetingOption6":
                if (this.meetingCustomize6 == null || this.meetingCustomize6 == "") {
                    this.meetingCustomize6 = "6"
                }
                await this.storage.set("meetingCustomize6", this.meetingCustomize6)
                this.web
                    .setParameter(this.address, type, "meeting_area_06", this.meetingCustomize6)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
        }
    }
    // 上酒区文字状态改变
    async changeLiquorCustomizeText(event) {
        this.liquorCustomize1ReadOnly = true
        this.liquorCustomize2ReadOnly = true
        this.liquorCustomize3ReadOnly = true
        this.liquorCustomize4ReadOnly = true
        this.liquorCustomize5ReadOnly = true
        this.liquorCustomize6ReadOnly = true

        let name = event.target.getAttribute("name")
        let type = "4"
        switch (name) {
            case "liquorOption1":
                if (this.liquorCustomize1 == null || this.liquorCustomize1 == "") {
                    this.liquorCustomize1 = "1"
                }
                await this.storage.set("liquorCustomize1", this.liquorCustomize1)
                this.web
                    .setParameter(this.address, type, "liquor_area_01", this.liquorCustomize1)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "liquorOption2":
                if (this.liquorCustomize2 == null || this.liquorCustomize2 == "") {
                    this.liquorCustomize2 = "2"
                }
                await this.storage.set("liquorCustomize2", this.liquorCustomize2)
                this.web
                    .setParameter(this.address, type, "liquor_area_02", this.liquorCustomize2)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "liquorOption3":
                if (this.liquorCustomize3 == null || this.liquorCustomize3 == "") {
                    this.liquorCustomize3 = "3"
                }
                await this.storage.set("liquorCustomize3", this.liquorCustomize3)
                this.web
                    .setParameter(this.address, type, "liquor_area_03", this.liquorCustomize3)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "liquorOption4":
                if (this.liquorCustomize4 == null || this.liquorCustomize4 == "") {
                    this.liquorCustomize4 = "4"
                }
                await this.storage.set("liquorCustomize4", this.liquorCustomize4)
                this.web
                    .setParameter(this.address, type, "liquor_area_04", this.liquorCustomize4)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "liquorOption5":
                if (this.liquorCustomize5 == null || this.liquorCustomize5 == "") {
                    this.liquorCustomize5 = "5"
                }
                await this.storage.set("liquorCustomize5", this.liquorCustomize5)
                this.web
                    .setParameter(this.address, type, "liquor_area_05", this.liquorCustomize5)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "liquorOption6":
                if (this.liquorCustomize6 == null || this.liquorCustomize6 == "") {
                    this.liquorCustomize6 = "6"
                }
                await this.storage.set("liquorCustomize6", this.liquorCustomize6)
                this.web
                    .setParameter(this.address, type, "liquor_area_06", this.liquorCustomize6)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
        }
    }

    // DJ区文字状态改变
    async changeDJCustomizeText(event) {
        this.DJCustomize1ReadOnly = true
        this.DJCustomize2ReadOnly = true
        this.DJCustomize3ReadOnly = true
        this.DJCustomize4ReadOnly = true

        let name = event.target.getAttribute("name")
        let type = "5"
        switch (name) {
            case "DJ1":
                // 状态判定 若为空则为默认值
                if (this.DJCustomize1 == null || this.DJCustomize1 == "") {
                    this.DJCustomize1 = "DJ1"
                }

                await this.storage.set("DJCustomize1", this.DJCustomize1)

                this.web
                    .setParameter(this.address, type, "DJ_area_01", this.DJCustomize1)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "DJ2":
                if (this.DJCustomize2 == null || this.DJCustomize2 == "") {
                    this.DJCustomize2 = "DJ2"
                }

                await this.storage.set("DJCustomize2", this.DJCustomize2)

                this.web
                    .setParameter(this.address, type, "DJ_area_02", this.DJCustomize2)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "DJ3":
                if (this.DJCustomize3 == null || this.DJCustomize3 == "") {
                    this.DJCustomize3 = "DJ3"
                }

                await this.storage.set("DJCustomize3", this.DJCustomize3)

                this.web
                    .setParameter(this.address, type, "DJ_area_03", this.DJCustomize3)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "party":
                if (this.DJCustomize4 == null || this.DJCustomize4 == "") {
                    this.DJCustomize4 = "party"
                }

                await this.storage.set("DJCustomize4", this.DJCustomize4)

                this.web
                    .setParameter(this.address, type, "DJ_area_04", this.DJCustomize4)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
        }
    }

    // KTV区文字状态改变
    async changeKTVCustomizeText(event) {
        this.KTVCustomize1ReadOnly = true
        this.KTVCustomize2ReadOnly = true
        this.KTVCustomize3ReadOnly = true
        this.KTVCustomize4ReadOnly = true
        this.KTVCustomize5ReadOnly = true

        let name = event.target.getAttribute("name")
        let type = "6"
        switch (name) {
            case "soft":
                // 状态判定 若为空则为默认值
                if (this.KTVCustomize1 == null || this.KTVCustomize1 == "") {
                    this.KTVCustomize1 = "柔和"
                }

                await this.storage.set("KTVCustomize1", this.KTVCustomize1)

                this.web
                    .setParameter(this.address, type, "KTV_area_01", this.KTVCustomize1)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "romantic":
                if (this.KTVCustomize2 == null || this.KTVCustomize2 == "") {
                    this.KTVCustomize2 = "浪漫"
                }

                await this.storage.set("KTVCustomize2", this.KTVCustomize2)

                this.web
                    .setParameter(this.address, type, "KTV_area_02", this.KTVCustomize2)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "hazy":
                if (this.KTVCustomize3 == null || this.KTVCustomize3 == "") {
                    this.KTVCustomize3 = "朦胧"
                }

                await this.storage.set("KTVCustomize3", this.KTVCustomize3)

                this.web
                    .setParameter(this.address, type, "KTV_area_03", this.KTVCustomize3)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "passion":
                if (this.KTVCustomize4 == null || this.KTVCustomize4 == "") {
                    this.KTVCustomize4 = "激情"
                }

                await this.storage.set("KTVCustomize4", this.KTVCustomize4)

                this.web
                    .setParameter(this.address, type, "KTV_area_04", this.KTVCustomize4)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "dynamic":
                if (this.KTVCustomize5 == null || this.KTVCustomize5 == "") {
                    this.KTVCustomize5 = "动感"
                }

                await this.storage.set("KTVCustomize5", this.KTVCustomize5)

                this.web
                    .setParameter(this.address, type, "KTV_area_05", this.KTVCustomize5)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
        }
    }

    // show区文字状态改变
    async changeShowCustomizeText(event) {
        this.showCustomize1ReadOnly = true
        this.showCustomize2ReadOnly = true
        this.showCustomize3ReadOnly = true
        this.showCustomize4ReadOnly = true

        let name = event.target.getAttribute("name")
        let type = "7"
        switch (name) {
            case "show1":
                // 状态判定 若为空则为默认值
                if (this.showCustomize1 == null || this.showCustomize1 == "") {
                    this.showCustomize1 = "show1"
                }

                await this.storage.set("showCustomize1", this.showCustomize1)

                this.web
                    .setParameter(this.address, type, "show_area_01", this.showCustomize1)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "show2":
                if (this.showCustomize2 == null || this.showCustomize2 == "") {
                    this.showCustomize2 = "show2"
                }

                await this.storage.set("showCustomize2", this.showCustomize2)

                this.web
                    .setParameter(this.address, type, "show_area_02", this.showCustomize2)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "show3":
                if (this.showCustomize3 == null || this.showCustomize3 == "") {
                    this.showCustomize3 = "show3"
                }

                await this.storage.set("showCustomize3", this.showCustomize3)

                this.web
                    .setParameter(this.address, type, "show_area_03", this.showCustomize3)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
            case "show4":
                if (this.showCustomize4 == null || this.showCustomize4 == "") {
                    this.showCustomize4 = "show4"
                }

                await this.storage.set("showCustomize4", this.showCustomize4)

                this.web
                    .setParameter(this.address, type, "show_area_04", this.showCustomize4)
                    .subscribe((res) => {
                        if (res.code == 200) {
                            console.log("Success")
                        }
                    })
                break
        }
    }

    // 获取color
    private async initColor() {
        this.color = await this.storage.get("color")
    }

    //返回同步控制
    synchronizeSocket(socketStr: string) {
        console.log(`-------同步控制------- \n-------scoketString: ${socketStr}------- `)
        let ifResult = false
        switch (socketStr) {
            case "musictype_01":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.ktvMode = true
                this.imageMap.set(
                    "KTV",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTVSelect.svg"
                )
                ifResult = true
                break
            case "musictype_02":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.DJPartyMode = true
                this.imageMap.set(
                    "DJParty",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/DJPartySelect.svg"
                )
                ifResult = true

                break
            case "musictype_04":
                this.initImageMap()
                this.initsynchronizeSocket()
                if (this.CA1105 == true) {
                    this.illuminationMode = true
                    this.imageMap.set(
                        "illumination",
                        "assets/img/mode-select/SVG_" +
                            TranslateText.lang +
                            "/illuminationSelect.svg"
                    )
                } else {
                    this.imageMap.set(
                        "illumination",
                        "assets/img/mode-select/SVG_" +
                            TranslateText.lang +
                            "/illuminationSelect.svg"
                    )
                }

                ifResult = true

                break
            case "musictype_07":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.musicPlaying = true
                this.conversationMode = true
                this.imageMap.set(
                    "conversation",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/conversationSelect.svg"
                )
                this.storage.get("conversationDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                ifResult = true

                break
            case "musictype_03":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.discoPartyMode = true
                this.imageMap.set(
                    "discoParty",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/discoPartySelect.svg"
                )
                ifResult = true

                break
            case "musictype_11":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.danceMusicMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "danceMusic",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/danceMusicSelect.svg"
                )
                this.storage.get("dancemusicDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                ifResult = true

                break
            case "musictype_05":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.bitrhdaysMode = true
                this.musicPlaying = true
                // this.musicVolume = this.birthdaysTempVolume;
                // if(this.musicVolume==null||isNaN(this.musicVolume)){
                //   this.musicVolume=20;
                // }
                this.storage.get("birthdaysDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.imageMap.set(
                    "birthdays",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/birthdaysSelect.svg"
                )
                ifResult = true

                break
            case "musictype_06":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.christmasMode = true
                this.musicPlaying = true

                this.storage.get("christmasDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.imageMap.set(
                    "christmas",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/christmasSelect.svg"
                )
                ifResult = true

                break
            case "musictype_12":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.ktvMode = true
                this.imageMap.set(
                    "KTV",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTVSelect.svg"
                )
                this.KTVCustomize1Clicked = true
                ifResult = true

                break
            case "musictype_13":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.ktvMode = true
                this.imageMap.set(
                    "KTV",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTVSelect.svg"
                )
                this.KTVCustomize2Clicked = true
                ifResult = true

                break
            case "musictype_14":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.ktvMode = true
                this.imageMap.set(
                    "KTV",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTVSelect.svg"
                )
                this.KTVCustomize3Clicked = true
                ifResult = true

                break
            case "musictype_15":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.ktvMode = true
                this.imageMap.set(
                    "KTV",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTVSelect.svg"
                )
                this.KTVCustomize4Clicked = true
                ifResult = true

                break
            case "musictype_16":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.ktvMode = true
                this.imageMap.set(
                    "KTV",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTVSelect.svg"
                )
                this.KTVCustomize5Clicked = true
                ifResult = true

                break
            case "musictype_17":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.ktvMode = true
                this.imageMap.set(
                    "KTV",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTVSelect.svg"
                )
                ifResult = true

                break
            case "musictype_18":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.ktvMode = true
                this.imageMap.set(
                    "KTV",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTVSelect.svg"
                )
                ifResult = true

                break
            case "musictype_19":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.ktvMode = true
                this.imageMap.set(
                    "KTV",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTVSelect.svg"
                )
                ifResult = true

                break
            case "musictype_20":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.ktvMode = true
                this.imageMap.set(
                    "KTV",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTVSelect.svg"
                )
                ifResult = true

                break
            case "musictype_21":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.ktvMode = true
                this.imageMap.set(
                    "KTV",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/KTVSelect.svg"
                )
                ifResult = true

                break
            case "musictype_28":
                this.initImageMap()
                this.initsynchronizeSocket()
                if (this.CA1105 == true) {
                    this.illuminationMode = true
                    this.imageMap.set(
                        "illumination",
                        "assets/img/mode-select/SVG_" +
                            TranslateText.lang +
                            "/illuminationSelect.png"
                    )
                } else {
                    this.imageMap.set(
                        "illumination",
                        "assets/img/mode-select/SVG_" + TranslateText.lang + "/illumination.svg"
                    )
                }
                ifResult = true

                break
            case "musictype_29":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.showMode = true
                this.imageMap.set(
                    "show",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/showSelect.svg"
                )
                this.storage.get("showDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.showCustomize1Clicked = true
                break
            case "musictype_30":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.showMode = true
                this.imageMap.set(
                    "show",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/showSelect.svg"
                )
                this.storage.get("showDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.showCustomize2Clicked = true
                break
            case "musictype_31":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.showMode = true
                this.imageMap.set(
                    "show",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/showSelect.svg"
                )
                this.storage.get("showDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.showCustomize3Clicked = true
                break
            case "musictype_32":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.showMode = true
                this.imageMap.set(
                    "show",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/showSelect.svg"
                )
                this.storage.get("showDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.showCustomize4Clicked = true
                break
            case "musictype_33":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.liquorMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "liquor",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/liquorSelect.svg"
                )
                this.storage.get("liquorDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                break
            case "musictype_34":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.danceMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "dance",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/danceSelect.svg"
                )
                this.storage.get("danceDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                break
            case "musictype_50":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.conversationMode = true
                this.musicPlaying = true
                this.storage.get("conversationDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.imageMap.set(
                    "conversation",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/conversationSelect.svg"
                )
                this.meetingCustomize1Clicked = true
                ifResult = true
                break
            case "musictype_51":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.conversationMode = true
                this.musicPlaying = true
                this.storage.get("conversationDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.meetingCustomize2Clicked = true
                this.imageMap.set(
                    "conversation",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/conversationSelect.svg"
                )
                ifResult = true
                break
            case "musictype_52":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.conversationMode = true
                this.musicPlaying = true
                this.storage.get("conversationDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.meetingCustomize3Clicked = true
                this.imageMap.set(
                    "conversation",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/conversationSelect.svg"
                )
                ifResult = true
                break
            case "musictype_53":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.conversationMode = true
                this.musicPlaying = true
                this.storage.get("conversationDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.meetingCustomize4Clicked = true
                this.imageMap.set(
                    "conversation",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/conversationSelect.svg"
                )
                ifResult = true
                break
            case "musictype_54":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.conversationMode = true
                this.musicPlaying = true
                this.storage.get("conversationDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.meetingCustomize5Clicked = true
                this.imageMap.set(
                    "conversation",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/conversationSelect.svg"
                )
                ifResult = true
                break
            case "musictype_55":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.conversationMode = true
                this.musicPlaying = true
                this.storage.get("conversationDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.meetingCustomize6Clicked = true
                this.imageMap.set(
                    "conversation",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/conversationSelect.svg"
                )
                ifResult = true
                break
            case "musictype_56":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.bitrhdaysMode = true
                this.musicPlaying = true
                // this.musicVolume = this.birthdaysTempVolume;
                // if(this.musicVolume==null||isNaN(this.musicVolume)){
                //   this.musicVolume=20;
                // }
                this.storage.get("birthdaysDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.imageMap.set(
                    "birthdays",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/birthdaysSelect.svg"
                )
                this.imageMap.set(
                    "children",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/childrenSelect.png"
                )

                ifResult = true

                break
            case "musictype_57":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.bitrhdaysMode = true
                this.musicPlaying = true
                // this.musicVolume = this.birthdaysTempVolume;
                // if(this.musicVolume==null||isNaN(this.musicVolume)){
                //   this.musicVolume=20;
                // }
                this.storage.get("birthdaysDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.imageMap.set(
                    "birthdays",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/birthdaysSelect.svg"
                )
                this.imageMap.set(
                    "lady",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/ladySelect.png"
                )

                ifResult = true

                break
            case "musictype_58":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.bitrhdaysMode = true
                this.musicPlaying = true
                // this.musicVolume = this.birthdaysTempVolume;
                // if(this.musicVolume==null||isNaN(this.musicVolume)){
                //   this.musicVolume=20;
                // }
                this.storage.get("birthdaysDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })
                this.imageMap.set(
                    "birthdays",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/birthdaysSelect.svg"
                )
                this.imageMap.set(
                    "man",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/manSelect.png"
                )

                ifResult = true

                break
            case "musictype_61":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.danceMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "dance",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/danceSelect.svg"
                )

                this.GGCustomize1Clicked = true
                this.storage.get("danceDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                ifResult = true

                break
            case "musictype_62":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.danceMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "dance",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/danceSelect.svg"
                )

                this.GGCustomize2Clicked = true
                this.storage.get("danceDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                ifResult = true

                break
            case "musictype_63":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.danceMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "dance",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/danceSelect.svg"
                )

                this.GGCustomize3Clicked = true
                this.storage.get("danceDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                ifResult = true

                break
            case "musictype_64":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.danceMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "dance",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/danceSelect.svg"
                )
                this.GGCustomize4Clicked = true
                this.storage.get("danceDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                ifResult = true

                break
            case "musictype_65":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.danceMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "dance",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/danceSelect.svg"
                )

                this.GGCustomize5Clicked = true
                this.storage.get("danceDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                ifResult = true

                break
            case "musictype_66":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.danceMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "dance",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/danceSelect.svg"
                )

                this.GGCustomize6Clicked = true
                this.storage.get("danceDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                ifResult = true

                break
            case "musictype_67":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.liquorMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "liquor",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/liquorSelect.svg"
                )

                this.liquorCustomize1Clicked = true
                this.storage.get("liquorDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                break
            case "musictype_68":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.liquorMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "liquor",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/liquorSelect.svg"
                )

                this.liquorCustomize2Clicked = true
                this.storage.get("liquorDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                break
            case "musictype_69":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.liquorMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "liquor",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/liquorSelect.svg"
                )

                this.liquorCustomize3Clicked = true
                this.storage.get("liquorDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                break
            case "musictype_70":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.liquorMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "liquor",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/liquorSelect.svg"
                )

                this.liquorCustomize4Clicked = true
                this.storage.get("liquorDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                break
            case "musictype_71":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.liquorMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "liquor",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/liquorSelect.svg"
                )

                this.liquorCustomize5Clicked = true
                this.storage.get("liquorDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                break
            case "musictype_72":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.liquorMode = true
                this.musicPlaying = true
                this.imageMap.set(
                    "liquor",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/liquorSelect.svg"
                )
                this.liquorCustomize6Clicked = true
                this.storage.get("liquorDefaultVolume").then((data) => {
                    this.musicVolume = data
                    if (this.musicVolume == null || isNaN(this.musicVolume)) {
                        this.musicVolume = 20
                    }
                })

                break
            case "play":
                this.musicPlaying = true
                ifResult = true

                break
            case "pause":
                this.musicPlaying = false
                ifResult = true

                break
            case "next":
                this.musicPlaying = true
                ifResult = true

                break
            case "pre":
                this.musicPlaying = true
                ifResult = true

                break
            case "djparty04":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.DJPartyMode = true

                this.imageMap.set(
                    "DJParty",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/DJPartySelect.svg"
                )
                this.DJCustomize4Clicked = true
                ifResult = true

                break
            case "djparty02":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.DJPartyMode = true
                this.imageMap.set(
                    "DJParty",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/DJPartySelect.svg"
                )
                this.DJCustomize2Clicked = true
                ifResult = true

                break
            case "djparty01":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.DJPartyMode = true
                this.imageMap.set(
                    "DJParty",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/DJPartySelect.svg"
                )
                this.DJCustomize1Clicked = true
                ifResult = true

                break
            case "djparty03":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.DJPartyMode = true

                this.imageMap.set(
                    "DJParty",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/DJPartySelect.svg"
                )
                this.DJCustomize3Clicked = true
                ifResult = true

                break
            case "musictype_99":
                this.initImageMap()
                this.initsynchronizeSocket()

                this.bluetoothPartyMode = true
                this.imageMap.set(
                    "musicParty",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/bluetoothPartySelect.svg"
                )
                ifResult = true

                break
            case "kopen00":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.discoPartyMode = true
                this.imageMap.set("discoPartyWindows", "assets/img/mode-select/windowsOFF.png")
                ifResult = true

                break
            case "kopen01":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.discoPartyMode = true
                this.imageMap.set("discoPartyWindows", "assets/img/mode-select/windowsON.png")
                ifResult = true

                break
            case "switchoff":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.masterSwitchMode = true
                this.masterSwitchState = false
                this.imageMap.set(
                    "masterSwitch",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/masterSwitchSelect.svg"
                )
                ifResult = true
                break
            case "switchon":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.masterSwitchMode = true
                this.masterSwitchState = true
                this.imageMap.set(
                    "masterSwitch",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/masterSwitchSelect.svg"
                )
                ifResult = true
                break
            case "musictype_59":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.masterSwitchMode = true
                this.masterSwitchState = false
                this.imageMap.set(
                    "masterSwitch",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/masterSwitchSelect.svg"
                )
                ifResult = true
                break
            case "musictype_60":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.masterSwitchMode = true
                this.masterSwitchState = true
                this.imageMap.set(
                    "masterSwitch",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/masterSwitchSelect.svg"
                )
                ifResult = true
                break

            case "CA1105|1|255":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.illuminationMode = true
                this.illuminationType1State = true

                ifResult = true
                break
            case "CA1105|1|0":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.illuminationMode = true
                this.illuminationType1State = false

                ifResult = true
                break
            case "CA1105|2|255":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.illuminationMode = true
                this.illuminationType2State = true

                ifResult = true
                break
            case "CA1105|2|0":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.illuminationMode = true
                this.illuminationType2State = false

                ifResult = true
                break
            case "CA1105|3|255":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.illuminationMode = true
                this.illuminationType3State = true

                ifResult = true
                break
            case "CA1105|3|0":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.illuminationMode = true
                this.illuminationType3State = false

                ifResult = true
                break
            case "CA1105|4|255":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.illuminationMode = true
                this.illuminationType4State = true

                ifResult = true
                break
            case "CA1105|4|0":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.illuminationMode = true
                this.illuminationType4State = false

                ifResult = true
                break

            case "CA1105|5|255":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.exhaustMode = true
                this.exhaustState = true

                ifResult = true
                break
            case "CA1105|5|0":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.exhaustMode = true
                this.exhaustState = false

                ifResult = true
                break

            case "CA1105|6|255":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.airconditionerMode = true
                this.airconditionerState = false
                this.airconditionerType = "6"
                ifResult = true
                break
            case "CA1105|7|255":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.airconditionerMode = true
                this.airconditionerState = true
                this.airconditionerType = "7"

                ifResult = true
                break
            case "CA1105|8|255":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.airconditionerMode = true
                this.airconditionerState = true
                this.airconditionerType = "8"
                ifResult = true
                break
            case "CA1105|9|255":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.airconditionerMode = true
                this.airconditionerState = true
                this.airconditionerType = "9"
                ifResult = true
                break
            case "CA1105|10|255":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.airconditionerMode = true
                this.airconditionerState = true
                this.airconditionerType = "10"
                ifResult = true
                break
            case "CA1105|11|255":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.exhaustMode = true
                this.exhaustState = true

                ifResult = true
                break
            case "CA1105|11|0":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.exhaustMode = true
                this.exhaustState = true

                ifResult = true
                break

            case "server_rgb:000000000":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.serviceModel = true
                this.imageMap.set(
                    "service",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/service.svg"
                )
                ifResult = true

                break
            case "server_rgb:255255255":
                this.initImageMap()
                this.initsynchronizeSocket()
                this.serviceModel = true
                this.imageMap.set(
                    "service",
                    "assets/img/mode-select/SVG_" + TranslateText.lang + "/serviceSelect.svg"
                )
                ifResult = true

                break
        }

        if (socketStr.substring(0, 6) == "volume" && socketStr.length == 9) {
            console.log("音量同步" + socketStr.substring(6, socketStr.length))
            let volume = parseInt(socketStr.substring(6, socketStr.length))
            this.musicVolume = volume
            ifResult = true
        }

        return ifResult
    }
}
