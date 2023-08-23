import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmokeSettingPage } from './smoke-setting.page';

const routes: Routes = [
  {
    path: '',
    component: SmokeSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmokeSettingPageRoutingModule {}
