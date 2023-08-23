import { Component, OnInit } from "@angular/core"
import { TranslateText } from "../Util/tranlateText"

@Component({
    selector: "app-contact",
    templateUrl: "./contact.page.html",
    styleUrls: ["./contact.page.scss"],
})
export class ContactPage implements OnInit {
    musicCurrentTime: any
    musicDurationTime: any
    musicTimeInterval: any
    buttonIcon: any = "play-circle-outline"
    translateText = TranslateText.contact
    constructor() {}

    ngOnInit() {
      console.log(this.translateText);
      
    }
    ionViewDidEnter() {}
}
