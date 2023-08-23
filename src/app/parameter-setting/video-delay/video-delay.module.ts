import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoDelayPageRoutingModule } from './video-delay-routing.module';

import { VideoDelayPage } from './video-delay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoDelayPageRoutingModule
  ],
  declarations: [VideoDelayPage]
})
export class VideoDelayPageModule {}
