import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowDelayPageRoutingModule } from './show-delay-routing.module';

import { ShowDelayPage } from './show-delay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowDelayPageRoutingModule
  ],
  declarations: [ShowDelayPage]
})
export class ShowDelayPageModule {}
