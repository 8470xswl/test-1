import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateProgramPage } from './update-program.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateProgramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateProgramPageRoutingModule {}
