import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmokeSettingPageRoutingModule } from './smoke-setting-routing.module';

import { SmokeSettingPage } from './smoke-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmokeSettingPageRoutingModule
  ],
  declarations: [SmokeSettingPage]
})
export class SmokeSettingPageModule {}
