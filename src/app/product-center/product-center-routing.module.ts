import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCenterPage } from './product-center.page';

const routes: Routes = [
  {
    path: '',
    component: ProductCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCenterPageRoutingModule {}
