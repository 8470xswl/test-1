import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { GlobalVariable } from "src/app/Util/globalVariable"

@Component({
    selector: "app-light-storage-record-list",
    templateUrl: "./light-storage-record-list.page.html",
    styleUrls: ["./light-storage-record-list.page.scss"],
})
export class LightStorageRecordListPage implements OnInit {
    //主题颜色
    styleColor: string
    list: lightList[] = []
    state: string

    constructor(private router: Router, private route: ActivatedRoute) {
        this.state = this.route.snapshot.paramMap.get("state")
        this.styleColor = "#" + this.route.snapshot.paramMap.get("color")
        console.log(this.state)

        const ktvList = [
            new lightList("KTV", "01"),
            new lightList("KTV1", "09"),
            new lightList("KTV2", "10"),
            new lightList("KTV3", "11"),
            new lightList("KTV4", "12"),
            new lightList("KTV5", "13"),
        ]
        const djList = [
            new lightList("DJ", "02"),
            new lightList("DJ1", "54"),
            new lightList("DJ2", "55"),
            new lightList("DJ3", "56"),
            new lightList("DJ4", "57"),
        ]
        const meetingGuestsList = [
            new lightList("会客1", "36"),
            new lightList("会客2", "37"),
            new lightList("会客3", "38"),
            new lightList("会客4", "39"),
            new lightList("会客5", "40"),
            new lightList("会客6", "41"),
        ]
        const birthdayList = [new lightList("儿童", "05"), new lightList("女士", "58"), new lightList("男士", "59")]
        const openshowList = [
            new lightList("开场秀1", "15"),
            new lightList("开场秀2", "16"),
            new lightList("开场秀3", "17"),
            new lightList("开场秀4", "18"),
        ]
        const GGList = [
            new lightList("GG1", "42"),
            new lightList("GG2", "43"),
            new lightList("GG3", "44"),
            new lightList("GG4", "45"),
            new lightList("GG5", "46"),
            new lightList("GG6", "47"),
        ]
        const servingLiquorList = [
            new lightList("上酒1", "48"),
            new lightList("上酒2", "49"),
            new lightList("上酒3", "50"),
            new lightList("上酒4", "51"),
            new lightList("上酒5", "52"),
            new lightList("上酒6", "53"),
        ]

        const videoList = this.initVideoList()

        const generalControlList = []
        const otherList = [new lightList("照明开", "04"), new lightList("总控开", "08"), new lightList("总控关", "14")]

        switch (this.state) {
            case "ktv":
                this.list = ktvList
                break
            case "dj":
                this.list = djList
                break
            case "meetings":
                this.list = meetingGuestsList
                break
            case "danceMusic":
                this.jumpToPageBasedOnId("03")
                break
            case "karaoke":
                this.jumpToPageBasedOnId("03")
                break
            case "birthday":
                this.list = birthdayList
                break
            case "christmas":
                this.jumpToPageBasedOnId("06")
                break
            case "openshow":
                this.list = openshowList
                break
            case "other":
                this.list = otherList
                break
            case "GG":
                this.list = GGList
                break
            case "servingLiquor":
                this.list = servingLiquorList
                break
            case "texiao":
                this.jumpToPageBasedOnId("00")
                break
            case "zongkong":
                this.list = generalControlList
                break
            case "video":
                this.list = videoList
                break
            case "propose":
                this.jumpToPageBasedOnId("61")
                break
            case "draft":
                this.jumpToPageBasedOnId("60")
                break
        }
    }

    private initVideoList() {
        let list = []
        for (let i = 0; i < 15; i++) {
            list.push(new lightList("视频" + (i + 1), (21 + i).toString))
        }
        return list
    }

    ngOnInit() {}

    jumpToPageBasedOnId(type: string) {
        this.router.navigate(["./parameter-setting-tabs/light-storage-record/record", { state: type }])
    }

    ionViewWillEnter() {}
    ionViewWillLeave() {}
}

class lightList {
    name: string
    type: string
    constructor(name, type) {
        this.name = name
        this.type = type
    }
}
