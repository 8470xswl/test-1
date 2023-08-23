import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCenterPageRoutingModule } from './product-center-routing.module';

import { ProductCenterPage } from './product-center.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCenterPageRoutingModule
  ],
  declarations: [ProductCenterPage]
})
export class ProductCenterPageModule {}
