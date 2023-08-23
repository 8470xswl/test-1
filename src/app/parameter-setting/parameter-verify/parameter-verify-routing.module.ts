import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { ParameterVerifyPage } from "./parameter-verify.page"
import { TranslateService } from "@ngx-translate/core"

const routes: Routes = [
    {
        path: "",
        component: ParameterVerifyPage,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ParameterVerifyPageRoutingModule {}
