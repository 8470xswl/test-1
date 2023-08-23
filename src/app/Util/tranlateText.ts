import { Injectable } from "@angular/core"
import { TranslateService } from "@ngx-translate/core"
import { Storage } from "@ionic/storage-angular"

@Injectable({
    providedIn: "root",
})
/**
 * 多语言类
 */
export class TranslateText {
    /**
     * app menu
     */
    public static appPages: any = {}
    /**
     * 参数设置-输入密码页面
     */
    public static parameterVerify: any = {}
    /**
     * 参数设置
     */
    public static parameterSettings: any = {}

    /**
     * 联系我们
     */
    public static contact: any = {}
    /**
     * 模式选择
     */
    public static modelSelect: any = {}

    /**
     * 产品中心
     */
    public static productCenterPage: any = {}

    public picUrl: string

    public static lang: string = "zh"

    constructor(private translateService: TranslateService, private storage: Storage) {}

    /**
     * 设置默认语言
     */
    async initTranslate(callback: Function) {
        //设置翻译字符串的默认语言和当前语言
        this.translateService.setDefaultLang("zh")

        let lang = await this.storage.get("lang")
        if (lang == undefined || lang == null) {
            lang = "zh"
        }
        this.translateService.use(lang)
        TranslateText.lang = lang
        console.log(`当前语言环境:${lang}`)
        this.loadTranslateText(callback)
        this.picUrl = "assets/img/" + lang + ".png"
    }

    loadTranslateText(callback: Function) {
        this.translateService.get("modelSelect").subscribe((value) => {
            TranslateText.modelSelect = value
        })

        this.translateService.get("appPages").subscribe((value) => {
            TranslateText.appPages = value
            callback()
        })

        this.translateService.get("contact").subscribe((value) => {
            TranslateText.contact = value
        })

        this.translateService.get("parameterVerify").subscribe((value) => {
            TranslateText.parameterVerify = value
        })

        this.translateService.get("parameterSettings").subscribe((value) => {
            TranslateText.parameterSettings = value
        })
        this.translateService.get("productCenterPage").subscribe((value) => {
            TranslateText.productCenterPage = value
            console.log(value)
        })
    }
}
