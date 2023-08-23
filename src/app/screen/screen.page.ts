import { Component, OnInit, ViewChild } from "@angular/core"
import { NavController } from "@ionic/angular"
import { Storage } from "@ionic/storage-angular"
import { GlobalVariable } from "../Util/globalVariable"

@Component({
    selector: "app-screen",
    templateUrl: "./screen.page.html",
    styleUrls: ["./screen.page.scss"],
})
export class ScreenPage implements OnInit {
    @ViewChild("slide1", { static: true }) slide1
    id: any
    src1 = ""
    src2 = ""
    src3 = ""

    videoUrl = ""

    // slidesOptions: object = {
    //     initialSlide: 0,
    //     // 滑动方向
    //     direction: "horizontal",
    //     // 切换动画速度 ms
    //     speed: 1000,
    //     // 滑动方式
    //     effect: "fill",
    //     //两张图片间隔距离
    //     spaceBetween: 8,
    //     // 循环播放
    //     loop: true,
    //     // 自动播放
    //     autoplay: {
    //         //延迟
    //         delay: 3500,
    //     },
    // }
    constructor(public nav: NavController, public storage: Storage) {
        this.initSrc()

        console.log(screen.width)
    }

    ngOnInit() {}

    // 返回上一个页面
    dismiss() {
        this.nav.back()
    }

    // 手动滑动后自动播放
    slideTouch() {
        console.log("slideTouch")
        this.id = setTimeout(() => {
            console.log("autoPlay")
            this.slide1.startAutoplay()
        }, 3500)
    }

    // 离开页面时取消定时器任务
    ionViewWillLeave() {
        clearTimeout(this.id)
    }
    async initSrc() {
        let address = await this.storage.get("address")
        let port = "8081"

        const baseUrl = `http://${address}${
            GlobalVariable.getInstance().getPlatformVersion() === "Android" ? `:${port}` : ""
        }/temp/screen/`

        console.log(baseUrl)

        const random = new Date().getTime()
        this.src1 = `${baseUrl}1.jpg?${random}`
        this.src2 = `${baseUrl}2.jpg?${random}`
        this.src3 = `${baseUrl}3.jpg?${random}`

        this.videoUrl = `${baseUrl}video1.mp4?${random}`
    }
}
