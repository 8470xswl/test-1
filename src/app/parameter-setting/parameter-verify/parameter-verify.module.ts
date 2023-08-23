import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { ParameterVerifyPageRoutingModule } from "./parameter-verify-routing.module"

import { ParameterVerifyPage } from "./parameter-verify.page"
import { TranslateModule } from "@ngx-translate/core"

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ParameterVerifyPageRoutingModule, TranslateModule],
    declarations: [ParameterVerifyPage],
})
export class ParameterVerifyPageModule {}
