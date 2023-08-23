import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LightStoreHousePage } from './light-store-house.page';

const routes: Routes = [
  {
    path: '',
    component: LightStoreHousePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LightStoreHousePageRoutingModule {}
