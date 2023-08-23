import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModeSelectPageRoutingModule } from './mode-select-routing.module';

import { ModeSelectPage } from './mode-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModeSelectPageRoutingModule
  ],
  declarations: [ModeSelectPage]
})
export class ModeSelectPageModule {}
