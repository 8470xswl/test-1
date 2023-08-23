import { Injectable } from "@angular/core"
import { Storage } from "@ionic/storage-angular"
import { TranslateText } from "../Util/tranlateText"

@Injectable({
    providedIn: "root",
})
export class DefaultMenuSettingService {
    public appPages = [
        { title: TranslateText.appPages.modeSelection, url: "/mode-select", icon: "swap-horizontal" },
        //{ title: 'TranslateText.appPages.productCenter', url: '/product-center', icon: 'swap-horizontal' },
        { title: TranslateText.appPages.parameterSetting, url: "/parameter-verify", icon: "swap-horizontal" },
        { title: TranslateText.appPages.contactUs, url: "/contact", icon: "call" },
    ]
    public showType: boolean = false
    public videoState: number = 0
    public url: string = "assets/img/"

    constructor(private storage: Storage, private translateText: TranslateText) {}
    async setMenuPages() {
        let videoState = await this.storage.get("videoState")
        if (videoState == 1) {
            this.appPages = [
                { title: TranslateText.appPages.modeSelection, url: "/mode-select", icon: "swap-horizontal" },
                { title: TranslateText.appPages.productCenter, url: "/product-center", icon: "swap-horizontal" },
                { title: TranslateText.appPages.parameterSetting, url: "/parameter-verify", icon: "swap-horizontal" },
                { title: TranslateText.appPages.contactUs, url: "/contact", icon: "call" },
                {
                    title: TranslateText.appPages.updateProgram,
                    url: "/update-program",
                    icon: "download",
                },
            ]
        } else {
            this.appPages = [
                { title: TranslateText.appPages.modeSelection, url: "/mode-select", icon: "swap-horizontal" },
                { title: TranslateText.appPages.parameterSetting, url: "/parameter-verify", icon: "swap-horizontal" },
                { title: TranslateText.appPages.contactUs, url: "/contact", icon: "call" },
                {
                    title: TranslateText.appPages.updateProgram,
                    url: "/update-program",
                    icon: "download",
                },
            ]
        }
    }

    async setState() {
        this.showType = await this.storage.get("showType")
        if (this.showType == null) {
            this.showType = false
        }
        this.videoState = await this.storage.get("videoState")
        if (this.videoState == null) {
            this.videoState = 0
        }
    }

    async switchLanguage() {
        let currentLanguage: string = await this.storage.get("lang")
        console.log(currentLanguage)

        if (currentLanguage == "zh") {
            await this.storage.set("lang", "en")
        } else {
            await this.storage.set("lang", "zh")
        }

        this.translateText.initTranslate(() => {
            this.setMenuPages()
            this.setState()
            location.replace("/mode-select")
        })
    }
}
