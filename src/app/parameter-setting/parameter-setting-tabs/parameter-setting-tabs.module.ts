import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParameterSettingTabsPageRoutingModule } from './parameter-setting-tabs-routing.module';

import { ParameterSettingTabsPage } from './parameter-setting-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParameterSettingTabsPageRoutingModule
  ],
  declarations: [ParameterSettingTabsPage]
})
export class ParameterSettingTabsPageModule {}
