import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordListPageRoutingModule } from './record-list-routing.module';

import { RecordListPage } from './record-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordListPageRoutingModule
  ],
  declarations: [RecordListPage]
})
export class RecordListPageModule {}
