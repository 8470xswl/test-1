import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LightStorageRecordPageRoutingModule } from './light-storage-record-routing.module';

import { LightStorageRecordPage } from './light-storage-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LightStorageRecordPageRoutingModule
  ],
  declarations: [LightStorageRecordPage]
})
export class LightStorageRecordPageModule {}
