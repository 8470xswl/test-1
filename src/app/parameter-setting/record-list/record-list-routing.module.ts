import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordListPage } from './record-list.page';

const routes: Routes = [
  {
    path: '',
    component: RecordListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordListPageRoutingModule {}
