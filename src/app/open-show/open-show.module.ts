import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenShowPageRoutingModule } from './open-show-routing.module';

import { OpenShowPage } from './open-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenShowPageRoutingModule
  ],
  declarations: [OpenShowPage]
})
export class OpenShowPageModule {}
