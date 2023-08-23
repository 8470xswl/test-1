import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LightStorageRecordListPageRoutingModule } from './light-storage-record-list-routing.module';

import { LightStorageRecordListPage } from './light-storage-record-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LightStorageRecordListPageRoutingModule
  ],
  declarations: [LightStorageRecordListPage]
})
export class LightStorageRecordListPageModule {}
