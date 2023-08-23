import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LightControlPageRoutingModule } from './light-control-routing.module';

import { LightControlPage } from './light-control.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LightControlPageRoutingModule
  ],
  declarations: [LightControlPage]
})
export class LightControlPageModule {}
