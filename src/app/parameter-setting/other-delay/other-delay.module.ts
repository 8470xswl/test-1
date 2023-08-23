import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherDelayPageRoutingModule } from './other-delay-routing.module';

import { OtherDelayPage } from './other-delay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherDelayPageRoutingModule
  ],
  declarations: [OtherDelayPage]
})
export class OtherDelayPageModule {}
