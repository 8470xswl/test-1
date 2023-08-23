import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LightControlPage } from './light-control.page';

const routes: Routes = [
  {
    path: '',
    component: LightControlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LightControlPageRoutingModule {}
