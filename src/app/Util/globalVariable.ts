import { Storage } from "@ionic/storage-angular"
import { StorageTool } from "../Util/util"

/**
 * 全局变量类
 */
export class GlobalVariable {
    private static global: GlobalVariable

    /**
     * ip地址
     */
    private ipAddress: string

    public getIPAddress(): string {
        return this.ipAddress
    }
    public setIPAddress(value: string) {
        this.ipAddress = value
    }

    /**
     * ip端口
     */
    private ipPort: string

    public getIPPort(): string {
        return this.ipPort
    }
    public setIPPort(value: string) {
        this.ipPort = value
    }

    /**
     * 平台版本
     * 默认Windows
     */
    private platformVersion: string = "Windows"
    public getPlatformVersion(): string {
        return this.platformVersion
    }
    public setPlatformVersion(value: string) {
        this.platformVersion = value
    }

    /**
     * socketConnected
     * socket 是否第一次成功连接
     * 默认true
     */
    private socketForFirst: boolean

    public getSocketForFirst(): boolean {
        if (this.socketForFirst == null || undefined) {
            this.socketForFirst = false
        }
        return this.socketForFirst
    }
    public setSocketForFirst(value: boolean) {
        this.socketForFirst = value
    }

    private constructor() {}

    /**
     * 获取全局变量单例
     * @returns GlobalVariable 全局变量
     */
    static getInstance(): GlobalVariable {
        if (this.global == null || this.global == undefined) {
            this.global = new GlobalVariable()
        }
        return this.global
    }

    //TODO: 全局变量初始化,待增加
    public async init(storage: Storage) {
        this.ipAddress = await StorageTool.getStringFromStorage(
            storage,
            "address",
            "notSet"
        )
        this.ipPort = await StorageTool.getStringFromStorage(
            storage,
            "port",
            "notSet"
        )
        this.platformVersion = await StorageTool.getStringFromStorage(
            storage,
            "platform",
            "Windows"
        )
        this.socketForFirst = true
    }
}
