import { Component, OnInit } from "@angular/core"
import { Storage } from "@ionic/storage-angular"
import { SocketServiceService } from "../../service/socket-service.service"
import { ToastController, AlertController } from "@ionic/angular"
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner/ngx"
import { DefaultMenuSettingService } from "src/app/service/default-menu-setting.service"
import { StorageTool } from "src/app/Util/util"
import { GlobalVariable } from "src/app/Util/globalVariable"
import { TranslateText } from "src/app/Util/tranlateText"

@Component({
    selector: "app-port-setting",
    templateUrl: "./port-setting.page.html",
    styleUrls: ["./port-setting.page.scss"],
})
export class PortSettingPage implements OnInit {
    translateText = TranslateText.parameterSettings.baseSettings
    address = ""
    port = ""
    conversationDefaultVolume = 20
    dancemusicDefaultVolume = 20
    christmasDefaultVolume = 20
    birthdaysDefaultVolume = 20
    showDefaultVolume = 20
    liquorDefaultVolume = 20
    danceDefaultVolume = 20
    beautyDefaultVolume = 20
    proposeDefaultVolume = 20

    permissionCheck = true
    settingPassword = ""
    showDump: boolean
    showState: boolean
    videoState: boolean
    showType: boolean
    // 服务灯颜色
    color: string
    //屏保服务
    screenSaver: boolean

    // CA1105
    CA1105: boolean

    // 自定义区域文字开关
    customize: boolean

    //可隐藏区域开关

    discoState: boolean
    bluetoothState: boolean
    liquorState: boolean
    beautyState: boolean
    GGDanceState: boolean
    proposeState: boolean

    n8ip: number = 1

    destinationPort: string

    monitorPort: string

    constructor(
        private storage: Storage,
        private socketServiceService: SocketServiceService,
        private toastController: ToastController,
        private alertController: AlertController,
        public barcodeScanner: BarcodeScanner,
        private defaultMenuSettingService: DefaultMenuSettingService
    ) {}

    ngOnInit() {}
    ionViewWillEnter() {
        this.init()
    }

    // 点击确定时调用
    async setParameter() {
        // let oldAddress = await this.storage.get("address")
        // let oldPort = await this.storage.get("port")

        // console.log(`address: ${this.address}`)
        // console.log(`port: ${this.port}`)
        // if (this.address != oldAddress || this.port != oldPort) {
        //     console.log("服务器变更")

        //     await this.storage.set("address", this.address)
        //     await this.storage.set("port", this.port)
        //     this.socketServiceService.createSocket(this.address, this.port)
        // }

        let oldMonitorPort = await this.storage.get("monitorPort")
        let oldDestinationPort = await this.storage.get("destinationPort")

        console.log(`MonitorPort: ${this.monitorPort}`)
        console.log(`DestinationPort: ${this.destinationPort}`)
        if (this.monitorPort != oldMonitorPort || this.destinationPort != oldDestinationPort) {
            console.log("服务器变更")

            await this.storage.set("monitorPort", this.monitorPort)
            await this.storage.set("destinationPort", this.destinationPort)

            this.socketServiceService.initUDP()
        }

        await this.storage.set("conversationDefaultVolume", this.conversationDefaultVolume)
        await this.storage.set("dancemusicDefaultVolume", this.dancemusicDefaultVolume)
        await this.storage.set("christmasDefaultVolume", this.christmasDefaultVolume)
        await this.storage.set("birthdaysDefaultVolume", this.birthdaysDefaultVolume)
        await this.storage.set("showDefaultVolume", this.showDefaultVolume)
        await this.storage.set("liquorDefaultVolume", this.liquorDefaultVolume)
        await this.storage.set("danceDefaultVolume", this.danceDefaultVolume)
        await this.storage.set("beautyDefaultVolume", this.beautyDefaultVolume)
        await this.storage.set("proposeDefaultVolume", this.proposeDefaultVolume)

        // 将是否第一次进入页面写入stroage --1 已经进入页面
        await this.storage.set("isFirstInitSetting", 1)

        // 设置鼓点
        if (this.showDump) {
            await this.storage.set("showDump", 2)
        } else {
            await this.storage.set("showDump", 0)
        }

        if (this.videoState == true) {
            await this.storage.set("videoState", 1)
        } else {
            await this.storage.set("videoState", 0)
        }
        if (this.showState == true) {
            await this.storage.set("showState", 1)
        } else {
            await this.storage.set("showState", 0)
        }
        // 可隐藏区域状态写入内存
        await this.storage.set("showType", this.showType)
        await this.storage.set("discoState", this.discoState)
        await this.storage.set("bluetoothState", this.bluetoothState)
        await this.storage.set("liquorState", this.liquorState)
        await this.storage.set("beautyState", this.beautyState)
        await this.storage.set("GGDanceState", this.GGDanceState)
        await this.storage.set("proposeState", this.proposeState)

        await this.storage.set("color", this.color)

        // 设置屏保
        if (this.screenSaver == true) {
            await this.storage.set("screenSaver", 1)
        } else {
            await this.storage.set("screenSaver", 0)
        }

        //设置自定义描述状态
        if (this.customize == true) {
            await this.storage.set("customize", 1)
        } else {
            await this.storage.set("customize", 0)
        }

        // 设置是否外接 CA1105
        if (this.CA1105 == true) {
            await this.storage.set("CA1105", 1)
        } else {
            await this.storage.set("CA1105", 0)
        }

        await this.storage.set("n8ip", this.n8ip)

        this.socketServiceService.sendDefaultVolume()
        this.init()
        const toast = await this.toastController.create({
            message: TranslateText.parameterSettings.toast.message,
            duration: 2000,
        })

        GlobalVariable.getInstance().setIPAddress(this.address)
        GlobalVariable.getInstance().setIPPort(this.port)
        console.log(GlobalVariable.getInstance().getIPPort())

        toast.present()
        this.defaultMenuSettingService.setMenuPages()
        this.defaultMenuSettingService.setState()
    }
    // 初始化
    async init() {
        console.log("port-setting.page --  init() ")

        this.address = await this.storage.get("address")
        this.port = await this.storage.get("port")

        this.monitorPort = await this.storage.get("monitorPort")
        this.destinationPort = await this.storage.get("destinationPort")

        // 获取 birthdaysDefaultVolume
        this.birthdaysDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "birthdaysDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("birthdaysDefaultVolume")
                if (result > 100) {
                    return 100
                }
            }
        )
        // 获取 christmasDefaultVolume
        this.christmasDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "christmasDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("christmasDefaultVolume")
                if (result > 100) {
                    return 100
                }
            }
        )
        // 获取 conversationDefaultVolume
        this.conversationDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "conversationDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("conversationDefaultVolume")
                if (result > 100) {
                    return 100
                }
            }
        )
        // 获取 dancemusicDefaultVolume
        this.dancemusicDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "dancemusicDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("dancemusicDefaultVolume")
                if (result > 100) {
                    return 100
                }
            }
        )
        // 获取 showDefaultVolume
        this.showDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "showDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("showDefaultVolume")
                if (result > 100) {
                    return 100
                }
            }
        )
        // 获取 liquorDefaultVolume
        this.liquorDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "liquorDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("liquorDefaultVolume")
                if (result > 100) {
                    return 100
                }
            }
        )
        // 获取 danceDefaultVolume
        this.danceDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "danceDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("danceDefaultVolume")
                if (result > 100) {
                    return 100
                }
            }
        )
        // 获取 beautyDefaultVolume
        this.beautyDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "beautyDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("beautyDefaultVolume")
                if (result > 100) {
                    return 100
                }
            }
        )
        // 获取 proposeDefaultVolume
        this.proposeDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "proposeDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("proposeDefaultVolume")
                if (result > 100) {
                    return 100
                }
            }
        )

        // 开关区域
        this.showState = await StorageTool.getNumberFromStorageToBoolean(
            this.storage,
            "showState",
            false
        )
        this.videoState = await StorageTool.getNumberFromStorageToBoolean(
            this.storage,
            "videoState",
            false
        )
        this.showType = await StorageTool.getBooleanFromStorage(this.storage, "showType", false)
        this.screenSaver = await StorageTool.getNumberFromStorageToBoolean(
            this.storage,
            "screenSaver",
            false
        )
        this.customize = await StorageTool.getNumberFromStorageToBoolean(
            this.storage,
            "customize",
            false
        )
        this.color = await StorageTool.getStringFromStorage(this.storage, "color", "blue")
        this.discoState = await StorageTool.getBooleanFromStorage(this.storage, "discoState", false)
        this.bluetoothState = await StorageTool.getBooleanFromStorage(
            this.storage,
            "bluetoothState",
            false
        )
        this.liquorState = await StorageTool.getBooleanFromStorage(
            this.storage,
            "liquorState",
            false
        )
        this.beautyState = await StorageTool.getBooleanFromStorage(
            this.storage,
            "beautyState",
            false
        )
        this.GGDanceState = await StorageTool.getBooleanFromStorage(
            this.storage,
            "GGDanceState",
            false
        )
        this.proposeState = await StorageTool.getBooleanFromStorage(
            this.storage,
            "proposeState",
            false
        )

        this.showDump = await StorageTool.getNumberFromStorageToBoolean(
            this.storage,
            "showDump",
            true,
            async () => {
                let result = await this.storage.get("showDump")
                if (result == 2) {
                    return true
                }
            }
        )
        this.CA1105 = await StorageTool.getNumberFromStorageToBoolean(this.storage, "CA1105", true)
        this.n8ip = await StorageTool.getNumberFromStorage(this.storage, "n8ip", 1)
    }

    numberCheck(event) {
        if (event.target.value > 10) {
            event.target.value = event.target.value - (event.target.value % 5)
        }
        if (event.target.value > 100) {
            event.target.value = 100
        } else if (event.target.value < 0) {
            event.target.value = 0
        }
    }
    delayCheck(event) {
        if (event.target.value < 0) {
            event.target.value = 0
        }
        event.target.value = Math.floor(event.target.value * 10) / 10
    }

    async scan() {
        console.log("asdasd")
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
                this.address = a[0]
                this.port = a[1]
            })
            .catch(async (err) => {
                const alert = this.alertController.create({
                    header: "错误!",
                    subHeader: err,
                    buttons: ["Close"],
                })
                ;(await alert).present()
            })
    }
}
