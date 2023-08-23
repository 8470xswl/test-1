import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoDownloadModalPage } from './video-download-modal.page';

const routes: Routes = [
  {
    path: '',
    component: VideoDownloadModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoDownloadModalPageRoutingModule {}
