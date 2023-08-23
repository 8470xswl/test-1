import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortSettingPageRoutingModule } from './port-setting-routing.module';

import { PortSettingPage } from './port-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortSettingPageRoutingModule,
  ],
  declarations: [PortSettingPage]
})
export class PortSettingPageModule {}
