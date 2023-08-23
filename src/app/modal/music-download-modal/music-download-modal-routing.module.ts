import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicDownloadModalPage } from './music-download-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MusicDownloadModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicDownloadModalPageRoutingModule {}
