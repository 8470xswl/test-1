import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { LightStorageRecordPage } from "./light-storage-record.page"

const routes: Routes = [
    {
        path: "",
        component: LightStorageRecordPage,
    },

    {
        path: "record",
        loadChildren: () => import("./record/record.module").then((m) => m.RecordPageModule),
    },
    {
        path: "light-storage-record-list",
        loadChildren: () =>
            import("./light-storage-record-list/light-storage-record-list.module").then(
                (m) => m.LightStorageRecordListPageModule
            ),
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LightStorageRecordPageRoutingModule {}
