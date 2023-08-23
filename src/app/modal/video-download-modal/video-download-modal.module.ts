import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoDownloadModalPageRoutingModule } from './video-download-modal-routing.module';

import { VideoDownloadModalPage } from './video-download-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoDownloadModalPageRoutingModule
  ],
  declarations: [VideoDownloadModalPage]
})
export class VideoDownloadModalPageModule {}
