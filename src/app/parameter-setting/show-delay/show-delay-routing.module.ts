import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowDelayPage } from './show-delay.page';

const routes: Routes = [
  {
    path: '',
    component: ShowDelayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowDelayPageRoutingModule {}
