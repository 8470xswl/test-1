import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ConfigJson, CustomizedFeature, ParameterSettings } from "../Util/response-model"
import { Storage } from "@ionic/storage-angular"
import VConsole from "vconsole"
import { TranslateService } from "@ngx-translate/core"

@Injectable({
    providedIn: "root",
})
/* 配置文件类  */
export class ConfigService {
    /**
     * environment 运行环境
     */
    private static environment: string
    /**
     * screensaver 屏保设置
     */
    private static time: number

    /* 
      LOG 日志
    */
    private static vConsole: boolean
    /**
     * 每次启动是否清除缓存
     */
    private static initStorage: boolean

    /**
     * 自定义功能
     */
    private static customizedFeature: CustomizedFeature

    /** */
    private static parameterSettings: ParameterSettings

    constructor(private http: HttpClient, private storage: Storage) {
        this.load()
    }


    /**
     * 读取配置文件
     */
    load() {
        const jsonFile = `../../assets/config.json`
        this.http.get<ConfigJson>(jsonFile).subscribe(
            (d) => {
                ConfigService.environment = d.environment
                ConfigService.vConsole = d.vConsole
                ConfigService.time = d.screensaverTime
                ConfigService.initStorage = d.initStorage
                ConfigService.customizedFeature = d.customizedFeatures
                ConfigService.parameterSettings = d.parameterSettings
                this.preconditioning()
            },
            (err) => {
                console.log(`load config error: ${err}`)
            }
        )
    }

    preconditioning() {
        if (ConfigService.initStorage) {
            this.storage.clear()
        }
        if (ConfigService.vConsole) {
            if (VConsole.instance == null || VConsole == undefined) {
                new VConsole()
            }
        }
    }

    public static getLogState() {
        return this.vConsole
    }

    // assets/config.json  debug -- true
    public static getEnvironmentState() {
        if (this.environment == null || this.environment == undefined) {
            return false
        }
        if (this.environment === "debug") {
            return true
        } else if (this.environment === "release") {
            return false
        }
    }
    public static getScreensaverTime(): number {
        if (this.time == null || this.time == undefined) {
            return 60
        }
        return this.time
    }
    /**
     * 获取配置文件中 功能配置
     *
     * @returns
     */
    public static getCustomizedFeature(): CustomizedFeature {
        if (this.customizedFeature == null || this.customizedFeature == undefined) {
            this.customizedFeature = new CustomizedFeature()
        }
        return this.customizedFeature
    }
    /**
     * 获取配置文件中 功能配置
     *
     * @returns
     */
    public static getParameterSettings(): ParameterSettings {
        if (this.parameterSettings == null || this.parameterSettings == undefined) {
            this.parameterSettings = new ParameterSettings()
        }
        return this.parameterSettings
    }
}
