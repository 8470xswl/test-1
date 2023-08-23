import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoDelayPage } from './video-delay.page';

const routes: Routes = [
  {
    path: '',
    component: VideoDelayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoDelayPageRoutingModule {}
