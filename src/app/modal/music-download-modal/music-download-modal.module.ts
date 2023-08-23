import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicDownloadModalPageRoutingModule } from './music-download-modal-routing.module';

import { MusicDownloadModalPage } from './music-download-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicDownloadModalPageRoutingModule
  ],
  declarations: [MusicDownloadModalPage]
})
export class MusicDownloadModalPageModule {}
