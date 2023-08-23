import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateProgramPageRoutingModule } from './update-program-routing.module';

import { UpdateProgramPage } from './update-program.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateProgramPageRoutingModule
  ],
  declarations: [UpdateProgramPage]
})
export class UpdateProgramPageModule {}
