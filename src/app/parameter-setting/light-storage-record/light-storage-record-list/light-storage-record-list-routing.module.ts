import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LightStorageRecordListPage } from './light-storage-record-list.page';

const routes: Routes = [
  {
    path: '',
    component: LightStorageRecordListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LightStorageRecordListPageRoutingModule {}
