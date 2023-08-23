import { Injectable } from "@angular/core"
import { Storage } from "@ionic/storage-angular"
import { Router, ActivatedRoute } from "@angular/router"
import { Subject } from "rxjs"
// import { ModeSelectPage } from '../mode-select/mode-select.page';
// import { ProductCenterPage } from '../product-center/product-center.page';
// import { OpenShowPage } from '../open-show/open-show.page';

import { StorageTool, ColorUtil } from "../Util/util"
import { ConfigService } from "../Util/configService"
import { GlobalVariable } from "../Util/globalVariable"
import { NetworkHelper } from "../Util/network-helper"
import { AlertController } from "@ionic/angular"

declare var chrome
@Injectable({
    providedIn: "root",
})
export class SocketServiceService {
    socketInterval: any
    socket: any
    heartBeatCheck: any
    imageMap = new Map()
    modeSelectSubject: Subject<string>
    productCenterSubject: Subject<string>
    openShowSubject: Subject<string>
    recordListSubject: Subject<string>

    private socketid: number = -1
    monitorPort: string
    destinationPort: string
    sendingTimer: any

    constructor(
        private storage: Storage,
        private router: Router,
        private route: ActivatedRoute,
        private alter: AlertController
    ) {}

    // initialzeSocket() {
    //     try {
    //         this.socket = new (<any>window).Socket()
    //     } catch (error) {
    //         console.log("无法新建socket")
    //     }
    //     this.socketConnect()
    //     this.socketInterval = setInterval(() => {
    //         this.checkSocketConnect()
    //     }, 5000)
    //     this.heartBeatCheck = setTimeout(() => {
    //         this.heartBeatCheckOverTime()
    //     }, 60000)
    //     this.modeSelectSubject = new Subject<string>()
    //     this.productCenterSubject = new Subject<string>()
    //     this.openShowSubject = new Subject<string>()
    //     this.recordListSubject = new Subject<string>()
    // }

    async initUDP() {
        this.modeSelectSubject = new Subject<string>()
        this.productCenterSubject = new Subject<string>()
        this.openShowSubject = new Subject<string>()
        this.recordListSubject = new Subject<string>()

        this.destinationPort = await this.storage.get("destinationPort")
        this.monitorPort = await this.storage.get("monitorPort")

        // 关闭现有的 UDP 套接字，然后在回调函数中创建新的套接字
        this.closeSocket(() => {
            console.log(1)

            this.createSocket(this.monitorPort, this.destinationPort)
        })

        // 开启循环定时器
        this.startSendingLoop()
    }

    // 开启循环发送定时器
    startSendingLoop() {
        const that = this
        this.sendingTimer = setInterval(() => {
            that.sendSocketData("powerOnCheck")
        }, 5000) // 每隔1秒发送一次数据
    }

    /**
     * 创建 UDP 套接字
     * @param monitorPort 监听端口
     * @param destinationPort 目标端口
     */
    createSocket(monitorPort: string, destinationPort: string) {
        if (monitorPort == null && destinationPort == null) {
            console.log("请设置正确的监听端口和目标端口")
            return
        }
        let that = this
        chrome.sockets.udp.create({}, function (createInfo) {
            that.socketid = createInfo.socketId
            console.log("UDP socket created with socketId:", that.socketid)
            // 开启广播
            that.setBroadcast(that.socketid)
            // 绑定到指定的本地地址和端口
            that.bindSocket(that.socketid)
        })
    }

    // 开启广播
    setBroadcast(socketid: number) {
        chrome.sockets.udp.setBroadcast(socketid, true, function (result) {
            if (result < 0) {
                console.log("setBroadcast failed")
            }
        })
    }

    // 绑定 UDP 套接字到指定的本地地址和端口
    bindSocket(socketId) {
        let that = this
        console.log(NetworkHelper.localIP)

        chrome.sockets.udp.bind(
            socketId,
            NetworkHelper.localIP,
            this.monitorPort,
            function (result) {
                if (result === 0) {
                    console.log("UDP socket bound successfully.")

                    // 监听数据接收
                    that.startListening()
                } else {
                    console.error("UDP socket binding failed with error code: " + result)
                }
            }
        )
    }

    // 监听数据接收
    startListening() {
        chrome.sockets.udp.onReceive.addListener(this.receiveListener)
        console.log(`Listening for UDP data... socketId: ${this.socketid}`)
    }

    receiveListener = (info) => {
        console.log(info)
        let that = this
        var data = new Uint8Array(info.data)
        if (info.socketId === that.socketid) {
            console.log("Received data:", data)
            that.socketConnectOnData(data)
        }
        let message = new TextDecoder("gbk").decode(data)
        console.log(message)

        if (message.startsWith("hostStarted:")) {
            const ipStartIndex = "hostStarted:".length
            const ipAddress = message.substring(ipStartIndex)

            console.log("IP Address:", ipAddress)

            that.socketConnectFirst()

            // 关闭定时器
            if (that.sendingTimer) {
                clearInterval(Number(that.sendingTimer))
            }
        }
    }

    // 发送数据
    sendUDPSocketData(socketId, remoteAddress, remotePort, data) {
        chrome.sockets.udp.send(socketId, data, remoteAddress, remotePort, function (sendInfo) {
            if (sendInfo.resultCode === 0) {
                console.log(
                    `Data sent successfully.socketid: ${socketId} remotePort: ${remotePort} `
                )
            } else {
                console.error("Failed to send data with error code:", sendInfo.resultCode)
            }
        })
    }

    /**
     *  Socket 发送数据
     * @param dataString any
     */
    sendSocketData(dataString) {
        if (dataString == null || dataString === "") {
            console.log("Empty or null dataString, skipping sendSocketData.")
            return
        }

        // if (this.socketid == -1 || this.destinationPort == null) {
        //     console.log("UDP未创建或目标端口为空")
        //     return
        // }

        console.log(`------- sendSocketData -------\n dataString: ${dataString}`)

        //  dataString to Uint8Array
        const textEncoder = new TextEncoder()
        const dataArray = textEncoder.encode(this.addSeparator(dataString))

        if (this.socketid != -1) {
            let destinationAddress = ""
            if (NetworkHelper.localIP) {
                destinationAddress = this.generateBroadcastIP(NetworkHelper.localIP)
                console.log(destinationAddress)

                if (destinationAddress) {
                    this.sendUDPSocketData(
                        this.socketid,
                        this.generateBroadcastIP(NetworkHelper.localIP),
                        this.destinationPort,
                        dataArray.buffer
                    )
                }
            }
        }
    }

    generateBroadcastIP(ipAddress) {
        const lastIndex = ipAddress.lastIndexOf(".")
        if (lastIndex !== -1) {
            return ipAddress.substring(0, lastIndex + 1) + "255"
        }
        return null
    }

    // 关闭 UDP 套接字
    closeSocket(callback?: () => void) {
        // 关闭定时器
        if (this.sendingTimer) {
            clearInterval(Number(this.sendingTimer))
        }

        if (this.socketid !== -1) {
            let that = this

            chrome.sockets.udp.onReceive.removeListener(this.receiveListener)

            chrome.sockets.udp.close(that.socketid, function (result) {
                if (result === "OK") {
                    console.log("UDP socket closed successfully.")
                } else {
                    console.error("UDP socket closure failed with error code: " + result)
                }
                // 调用回调函数，以便创建新的套接字
                that.socketid = -1
                callback()
            })
        } else {
            // 如果没有打开的套接字，直接调用回调函数
            callback()
        }
    }

    closeSockets(callback: () => void) {
        chrome.sockets.udp.getSockets(function (socketsInfo) {
            if (!socketsInfo) {
                return
            }
            for (var i = 0; i < socketsInfo.length; i++) {
                console.log("closing socket: " + socketsInfo[i].socketId)
                chrome.sockets.udp.close(socketsInfo[i].socketId)
            }
        })
    }

    // 在适当的时候调用关闭连接函数
    // closeSocket(socketId);

    getSocketState() {
        // 获取配置文件 环境
        if (ConfigService.getEnvironmentState()) {
            return 2
        }
        console.log("socket:" + this.socket)

        if (this.socketid != -1) {
            return 2
        } else {
            return 0
        }
    }

    // async socketConnect() {
    //     this.socket.close()

    //     this.address = await this.storage.get("address")
    //     this.port = await this.storage.get("port")
    //     console.log(this.address)
    //     console.log(this.port)

    //     // if (this.socket.state != 0) {
    //     //   this.socket.close();
    //     // }
    //     if (this.address != "" && this.port != "") {
    //         this.socket = new (<any>window).Socket()
    //         console.log(this.socket)
    //         var that = this
    //         let connectPort = parseInt(this.port)
    //         this.socket.open(
    //             this.address,
    //             connectPort,
    //             function () {
    //                 console.log("连接")
    //                 that.sendDefaultVolume()
    //                 setTimeout(() => {
    //                     that.sendDefaultSmoke()
    //                 }, 1000)
    //                 that.socketConnectFirst()
    //             },
    //             function (errorMessage) {
    //                 console.log("错误")
    //                 console.log(errorMessage)
    //             }
    //         )
    //         this.socket.onData = function (data) {
    //             console.log(data)
    //             that.socketConnectOnData(data)
    //         }
    //         this.socket.onClose = function (data) {
    //             console.log(data)
    //             console.log("关闭连接")
    //         }
    //         this.socket.onError = function (data) {
    //             console.log(data)
    //             console.log("出现错误")
    //         }
    //     }
    // }

    // async checkSocketConnect() {
    //     console.log("检查连接")
    //     this.sendSocketData("checkConnect")

    //     if (this.socket == null) {
    //         console.log("初始化失败")
    //         this.socket = new (<any>window).Socket()
    //     }
    //     if (this.socket.state != 2) {
    //         console.log("检查端口")

    //         this.address = await this.storage.get("address")
    //         this.port = await this.storage.get("port")
    //         console.log(this.address)
    //         console.log(this.port)
    //         if (this.socket.state != 0) {
    //             console.log("检查是否关闭")
    //             this.socket.close()
    //         }
    //         if (this.address != "" && this.port != "") {
    //             this.socket = new (<any>window).Socket()
    //             console.log(this.socket)
    //             var that = this
    //             let connectPort = parseInt(this.port)
    //             this.socket.open(
    //                 this.address,
    //                 connectPort,
    //                 function () {
    //                     console.log("连接")
    //                     that.sendDefaultVolume()
    //                     setTimeout(() => {
    //                         that.sendDefaultSmoke()
    //                     }, 1000)
    //                 },
    //                 function (errorMessage) {
    //                     console.log("错误")
    //                     console.log(errorMessage)
    //                 }
    //             )
    //             this.socket.onData = function (data) {
    //                 console.log(data)
    //                 that.socketConnectOnData(data)
    //             }
    //             this.socket.onClose = function (data) {
    //                 console.log(data)
    //                 console.log("关闭连接")
    //             }

    //             this.socket.onError = function (data) {
    //                 console.log(data)
    //                 console.log("出现错误")
    //             }
    //         }
    //     }
    // }

    //初始化接收方法
    socketConnectOnData(data) {
        console.log(data)
        // this.heartBeatCheckReset()
        let list = new TextDecoder("gbk").decode(data)
        list = this.rmSeparator(list)

        if (list.substring(0, 9) == "initvoice") {
            console.log("参数同步")

            let parameterSync = list.substring(9, list.length)
            let parameterSyncs = parameterSync.split("|")
            console.log(parameterSyncs.length)
            console.log(parameterSyncs)
            this.storage.set("birthdaysDefaultVolume", parseInt(parameterSyncs[0]))
            this.storage.set("christmasDefaultVolume", parseInt(parameterSyncs[1]))
            this.storage.set("conversationDefaultVolume", parseInt(parameterSyncs[2]))
            this.storage.set("dancemusicDefaultVolume", parseInt(parameterSyncs[3]))
            this.storage.set("showDefaultVolume", parseInt(parameterSyncs[4]))
            this.storage.set("delayShowTime", parameterSyncs[5])
            this.storage.set("delayShowTime2", parameterSyncs[6])
            this.storage.set("delayShowTime3", parameterSyncs[7])
            this.storage.set("delayShowTime4", parameterSyncs[8])
            //产品列表演示延迟
            this.storage.set("videoDelayTime1", parameterSyncs[9])
            this.storage.set("videoDelayTime2", parameterSyncs[10])
            this.storage.set("videoDelayTime3", parameterSyncs[11])
            this.storage.set("videoDelayTime4", parameterSyncs[12])
            this.storage.set("videoDelayTime5", parameterSyncs[13])
            this.storage.set("videoDelayTime6", parameterSyncs[14])
            this.storage.set("videoDelayTime7", parameterSyncs[15])
            this.storage.set("videoDelayTime8", parameterSyncs[16])
            this.storage.set("videoDelayTime9", parameterSyncs[17])
            this.storage.set("videoDelayTime10", parameterSyncs[18])
            this.storage.set("videoDelayTime11", parameterSyncs[19])
            this.storage.set("videoDelayTime12", parameterSyncs[20])
            this.storage.set("videoDelayTime13", parameterSyncs[21])
            this.storage.set("videoDelayTime14", parameterSyncs[22])
            this.storage.set("videoDelayTime15", parameterSyncs[23])

            this.storage.set("liquorDefaultVolume", parseInt(parameterSyncs[24]))

            this.storage.set("danceDefaultVolume", parseInt(parameterSyncs[25]))
            //视频/开场秀
            this.storage.set("showState", parseInt(parameterSyncs[26]))
            this.storage.set("videoState", parseInt(parameterSyncs[27]))
            this.storage.set("showDump", parseInt(parameterSyncs[28]))
            // GG延迟
            this.storage.set("GGDelayShowTime1", parseInt(parameterSyncs[29]))
            this.storage.set("GGDelayShowTime2", parseInt(parameterSyncs[30]))
            this.storage.set("GGDelayShowTime3", parseInt(parameterSyncs[31]))
            this.storage.set("GGDelayShowTime4", parseInt(parameterSyncs[32]))
            this.storage.set("GGDelayShowTime5", parseInt(parameterSyncs[33]))
            this.storage.set("GGDelayShowTime6", parseInt(parameterSyncs[34]))
            //上酒延迟
            this.storage.set("liquorDelayShowTime1", parseInt(parameterSyncs[35]))
            this.storage.set("liquorDelayShowTime2", parseInt(parameterSyncs[36]))
            this.storage.set("liquorDelayShowTime3", parseInt(parameterSyncs[37]))
            this.storage.set("liquorDelayShowTime4", parseInt(parameterSyncs[38]))
            this.storage.set("liquorDelayShowTime5", parseInt(parameterSyncs[39]))
            this.storage.set("liquorDelayShowTime6", parseInt(parameterSyncs[40]))
            this.storage.set("beautyDefaultVolume", parseInt(parameterSyncs[41]))
            this.storage.set("danceDefaultVolume", parseInt(parameterSyncs[42]))
        }

        // 单设备同步服务灯color
        let dataString = list.substring(0, 11)
        if (dataString == "server_rgb:") {
            console.log("-------------服务灯-------------------")
            let RGB = list.substring(11, list.length - 3)
            console.log(`收到服务灯颜色变更指令: ${ColorUtil.getColor(RGB)}`)
            this.storage.set("color", ColorUtil.getColor(RGB))
        }
        // 分发数据到订阅器
        this.modeSelectSubject.next(list)
        this.productCenterSubject.next(list)
        this.openShowSubject.next(list)
        this.recordListSubject.next(list)
    }

    async sendDefaultSmoke() {
        let openIngTime = await StorageTool.getNumberFromStorage(this.storage, "openIngTime", 20)
        let intervalTime = await StorageTool.getNumberFromStorage(this.storage, "intervalTime", 10)
        let smokeAddress = await StorageTool.getNumberFromStorage(this.storage, "smokeAddress", 10)
        let smokePort = await StorageTool.getNumberFromStorage(this.storage, "smokePort", 6)
        let smokeStyle = await StorageTool.getStringFromStorage(
            this.storage,
            "smokeStyle",
            "smoking1"
        )

        let bigChannel1 = await StorageTool.getNumberFromStorage(this.storage, "bigChannel1", 1)
        let bigChannel2 = await StorageTool.getNumberFromStorage(this.storage, "bigChannel2", 2)
        let bigChannel3 = await StorageTool.getNumberFromStorage(this.storage, "bigChannel3", 3)
        let bigChannel4 = await StorageTool.getNumberFromStorage(this.storage, "bigChannel4", 4)
        let bigChannel5 = await StorageTool.getNumberFromStorage(this.storage, "bigChannel5", 5)

        let midChannel1 = await StorageTool.getNumberFromStorage(this.storage, "midChannel1", 1)
        let midChannel2 = await StorageTool.getNumberFromStorage(this.storage, "midChannel2", 2)
        let midChannel3 = await StorageTool.getNumberFromStorage(this.storage, "midChannel3", 3)
        let midChannel4 = await StorageTool.getNumberFromStorage(this.storage, "midChannel4", 4)
        let midChannel5 = await StorageTool.getNumberFromStorage(this.storage, "midChannel5", 5)

        let smallChannel1 = await StorageTool.getNumberFromStorage(this.storage, "smallChannel1", 1)
        let smallChannel2 = await StorageTool.getNumberFromStorage(this.storage, "smallChannel2", 2)
        let smallChannel3 = await StorageTool.getNumberFromStorage(this.storage, "smallChannel3", 3)
        let smallChannel4 = await StorageTool.getNumberFromStorage(this.storage, "smallChannel4", 4)
        let smallChannel5 = await StorageTool.getNumberFromStorage(this.storage, "smallChannel5", 5)

        let closeChannel1 = await StorageTool.getNumberFromStorage(this.storage, "closeChannel1", 1)
        let closeChannel2 = await StorageTool.getNumberFromStorage(this.storage, "closeChannel2", 2)
        let closeChannel3 = await StorageTool.getNumberFromStorage(this.storage, "closeChannel3", 3)
        let closeChannel4 = await StorageTool.getNumberFromStorage(this.storage, "closeChannel4", 4)
        let closeChannel5 = await StorageTool.getNumberFromStorage(this.storage, "closeChannel5", 5)

        if (smokeStyle == "smoking1") {
            let str = "smoking1"
            this.sendSocketData(str)
            this.storage.set("smokeStyle", smokeStyle)
        } else {
            let smallChannel = `small:"${smallChannel1}|${smallChannel2}|${smallChannel3}|${smallChannel4}|${smallChannel5}"`
            let midChannel = `middle:"${midChannel1}|${midChannel2}|${midChannel3}|${midChannel4}|${midChannel5}"`
            let bigChannel = `large:"${bigChannel1}|${bigChannel2}|${bigChannel3}|${bigChannel4}|${bigChannel5}"`
            let closeChannel = `close:"${closeChannel1}|${closeChannel2}|${closeChannel3}|${closeChannel4}|${closeChannel5}"`
            let str = `smoking0:{address:${smokeAddress},port:${smokePort},dmx:{${smallChannel},${midChannel},${bigChannel},${closeChannel}},continuetime:${openIngTime},spacetime:${intervalTime}}`
            this.sendSocketData(str)
        }
    }

    async sendDefaultVolume() {
        let dataString = "initvoice"

        // 获取 birthdaysDefaultVolume
        let birthdaysDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "birthdaysDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("birthdaysDefaultVolume")
                if (result < 10) {
                    return "0" + result
                }
                if (result == 100) {
                    return 95
                }
            }
        )
        // 获取 christmasDefaultVolume
        let christmasDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "christmasDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("christmasDefaultVolume")
                if (result < 10) {
                    return "0" + result
                }
                if (result == 100) {
                    return 95
                }
            }
        )
        // 获取 conversationDefaultVolume
        let conversationDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "conversationDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("conversationDefaultVolume")
                if (result < 10) {
                    return "0" + result
                }
                if (result == 100) {
                    return 95
                }
            }
        )
        // 获取 dancemusicDefaultVolume
        let dancemusicDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "dancemusicDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("dancemusicDefaultVolume")
                if (result < 10) {
                    return "0" + result
                }
                if (result == 100) {
                    return 95
                }
            }
        )
        // 获取 showDefaultVolume
        let showDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "showDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("showDefaultVolume")
                if (result < 10) {
                    return "0" + result
                }
                if (result == 100) {
                    return 95
                }
            }
        )
        // 获取 liquorDefaultVolume
        let liquorDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "liquorDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("liquorDefaultVolume")
                if (result < 10) {
                    return "0" + result
                }
                if (result == 100) {
                    return 95
                }
            }
        )
        // 获取 danceDefaultVolume
        let danceDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "danceDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("danceDefaultVolume")
                if (result < 10) {
                    return "0" + result
                }
                if (result == 100) {
                    return 95
                }
            }
        )
        console.log(danceDefaultVolume)

        // 获取 proposeDefaultVolume
        let proposeDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "proposeDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("proposeDefaultVolume")
                if (result < 10) {
                    return "0" + result
                }
                if (result == 100) {
                    return 95
                }
            }
        )
        // 获取 beautyDefaultVolume
        let beautyDefaultVolume = await StorageTool.getNumberFromStorage(
            this.storage,
            "beautyDefaultVolume",
            20,
            async () => {
                let result = await this.storage.get("beautyDefaultVolume")
                if (result < 10) {
                    return "0" + result
                }
                if (result == 100) {
                    return 95
                }
            }
        )

        // 从内存中取值且检验null or isNaN
        let delayShowTime = await StorageTool.getNumberFromStorage(this.storage, "delayShowTime", 0)
        let delayShowTime2 = await StorageTool.getNumberFromStorage(
            this.storage,
            "delayShowTime2",
            0
        )
        let delayShowTime3 = await StorageTool.getNumberFromStorage(
            this.storage,
            "delayShowTime3",
            0
        )
        let delayShowTime4 = await StorageTool.getNumberFromStorage(
            this.storage,
            "delayShowTime4",
            0
        )
        let videoDelayTime1 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime1",
            0
        )
        let videoDelayTime2 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime2",
            0
        )
        let videoDelayTime3 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime3",
            0
        )
        let videoDelayTime4 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime4",
            0
        )
        let videoDelayTime5 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime5",
            0
        )
        let videoDelayTime6 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime6",
            0
        )
        let videoDelayTime7 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime7",
            0
        )
        let videoDelayTime8 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime8",
            0
        )
        let videoDelayTime9 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime9",
            0
        )
        let videoDelayTime10 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime10",
            0
        )
        let videoDelayTime11 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime11",
            0
        )
        let videoDelayTime12 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime12",
            0
        )
        let videoDelayTime13 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime13",
            0
        )
        let videoDelayTime14 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime14",
            0
        )
        let videoDelayTime15 = await StorageTool.getNumberFromStorage(
            this.storage,
            "videoDelayTime15",
            0
        )

        let GGDelayShowTime1 = await StorageTool.getNumberFromStorage(
            this.storage,
            "GGDelayShowTime1",
            0
        )
        let GGDelayShowTime2 = await StorageTool.getNumberFromStorage(
            this.storage,
            "GGDelayShowTime2",
            0
        )
        let GGDelayShowTime3 = await StorageTool.getNumberFromStorage(
            this.storage,
            "GGDelayShowTime3",
            0
        )
        let GGDelayShowTime4 = await StorageTool.getNumberFromStorage(
            this.storage,
            "GGDelayShowTime4",
            0
        )
        let GGDelayShowTime5 = await StorageTool.getNumberFromStorage(
            this.storage,
            "GGDelayShowTime5",
            0
        )
        let GGDelayShowTime6 = await StorageTool.getNumberFromStorage(
            this.storage,
            "GGDelayShowTime6",
            0
        )

        let liquorDelayShowTime1 = await StorageTool.getNumberFromStorage(
            this.storage,
            "liquorDelayShowTime1",
            0
        )
        let liquorDelayShowTime2 = await StorageTool.getNumberFromStorage(
            this.storage,
            "liquorDelayShowTime2",
            0
        )
        let liquorDelayShowTime3 = await StorageTool.getNumberFromStorage(
            this.storage,
            "liquorDelayShowTime3",
            0
        )
        let liquorDelayShowTime4 = await StorageTool.getNumberFromStorage(
            this.storage,
            "liquorDelayShowTime4",
            0
        )
        let liquorDelayShowTime5 = await StorageTool.getNumberFromStorage(
            this.storage,
            "liquorDelayShowTime5",
            0
        )
        let liquorDelayShowTime6 = await StorageTool.getNumberFromStorage(
            this.storage,
            "liquorDelayShowTime6",
            0
        )

        // 开关选项区
        let videoState = await StorageTool.getNumberFromStorage(this.storage, "videoState", 0)
        let showState = await StorageTool.getNumberFromStorage(this.storage, "showState", 0)
        let showDump = await StorageTool.getNumberFromStorage(this.storage, "showDump", 0)

        let color = await StorageTool.getStringFromStorage(this.storage, "color", "blue")

        let n8ip = await StorageTool.getNumberFromStorage(this.storage, "n8ip", 1)

        dataString =
            dataString +
            "" +
            birthdaysDefaultVolume +
            "|" +
            christmasDefaultVolume +
            "|" +
            conversationDefaultVolume +
            "|" +
            dancemusicDefaultVolume +
            "|" +
            showDefaultVolume +
            "|" +
            delayShowTime +
            "|" +
            delayShowTime2 +
            "|" +
            delayShowTime3 +
            "|" +
            delayShowTime4 +
            "|" +
            videoDelayTime1 +
            "|" +
            videoDelayTime2 +
            "|" +
            videoDelayTime3 +
            "|" +
            videoDelayTime4 +
            "|" +
            videoDelayTime5 +
            "|" +
            videoDelayTime6 +
            "|" +
            videoDelayTime7 +
            "|" +
            videoDelayTime8 +
            "|" +
            videoDelayTime9 +
            "|" +
            videoDelayTime10 +
            "|" +
            videoDelayTime11 +
            "|" +
            videoDelayTime12 +
            "|" +
            videoDelayTime13 +
            "|" +
            videoDelayTime14 +
            "|" +
            videoDelayTime15 +
            "|" +
            liquorDefaultVolume +
            "|" +
            danceDefaultVolume +
            "|" +
            showState +
            "|" +
            videoState +
            "|" +
            showDump +
            "|" +
            GGDelayShowTime1 +
            "|" +
            GGDelayShowTime2 +
            "|" +
            GGDelayShowTime3 +
            "|" +
            GGDelayShowTime4 +
            "|" +
            GGDelayShowTime5 +
            "|" +
            GGDelayShowTime6 +
            "|" +
            liquorDelayShowTime1 +
            "|" +
            liquorDelayShowTime2 +
            "|" +
            liquorDelayShowTime3 +
            "|" +
            liquorDelayShowTime4 +
            "|" +
            liquorDelayShowTime5 +
            "|" +
            liquorDelayShowTime6 +
            "|" +
            beautyDefaultVolume +
            "|" +
            proposeDefaultVolume

        this.sendSocketData(dataString)

        setTimeout(() => {
            this.sendSocketData("server_rgb:" + ColorUtil.getColorRGB(color) + "000")
        }, 1000)

        setTimeout(() => {
            this.sendSocketData("n8ip:" + n8ip)
        }, 1500)

        // this.storage.clear()

        // var data = new Uint8Array(dataString.length);
        // for (var i = 0; i < data.length; i++) {
        //   data[i] = dataString.charCodeAt(i);
        // }
        // if (this.socket != null) {
        //   this.socket.write(data);
        // }
    }

    addSeparator(originalString: string) {
        let hexString = ""
        let convertedString = ""
        for (let i = 0; i < originalString.length; i++) {
            const charCode = originalString.charCodeAt(i).toString(16)
            hexString += charCode
        }
        hexString = hexString + "13"

        for (let i = 0; i < hexString.length; i += 2) {
            const hexCode = hexString.substr(i, 2)
            const charCode = parseInt(hexCode, 16)
            convertedString += String.fromCharCode(charCode)
        }

        return convertedString
    }

    rmSeparator(originalString: string) {
        let hexString = ""
        let convertedString = ""
        for (let i = 0; i < originalString.length; i++) {
            const charCode = originalString.charCodeAt(i).toString(16)
            hexString += charCode
        }

        if (hexString.substring(hexString.length - 2) == "13") {
            hexString = hexString.substring(0, hexString.length - 2)
        }

        for (let i = 0; i < hexString.length; i += 2) {
            const hexCode = hexString.substr(i, 2)
            const charCode = parseInt(hexCode, 16)
            convertedString += String.fromCharCode(charCode)
        }

        return convertedString
    }

    /**
     * 心跳检测超时
     */
    // heartBeatCheckOverTime() {
    //     console.log("超时!")
    //     if (this.socket != null) {
    //         this.socket.close()
    //     }
    //     clearTimeout(this.heartBeatCheck)
    //     this.heartBeatCheck = setTimeout(() => {
    //         this.heartBeatCheckOverTime()
    //     }, 60000)
    // }

    /**
     * 心跳检测未超时
     */
    // heartBeatCheckReset() {
    //     console.log("心跳返回!")
    //     clearTimeout(this.heartBeatCheck)
    //     this.heartBeatCheck = setTimeout(() => {
    //         this.heartBeatCheckOverTime()
    //     }, 60000)
    // }

    /**
     * Socket 第一次连接成功 程序初始化
     */
    async socketConnectFirst() {
        this.sendDefaultVolume()
        setTimeout(() => {
            this.sendDefaultSmoke()
        }, 1000)

        //开启香薰
        let dataString = "CA1105|5|255"
        this.sendSocketData(dataString)
    }
}
