import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LightStoreHousePageRoutingModule } from './light-store-house-routing.module';

import { LightStoreHousePage } from './light-store-house.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LightStoreHousePageRoutingModule
  ],
  declarations: [LightStoreHousePage]
})
export class LightStoreHousePageModule {}
