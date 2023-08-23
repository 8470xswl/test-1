import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenShowPage } from './open-show.page';

const routes: Routes = [
  {
    path: '',
    component: OpenShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenShowPageRoutingModule {}
