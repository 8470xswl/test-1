import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherDelayPage } from './other-delay.page';

const routes: Routes = [
  {
    path: '',
    component: OtherDelayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherDelayPageRoutingModule {}
