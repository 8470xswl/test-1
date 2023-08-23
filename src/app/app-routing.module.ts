import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mode-select',
    pathMatch: 'full'
  }, 
  {
    path: 'light-control',
    loadChildren: () => import('./light-control/light-control.module').then( m => m.LightControlPageModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: 'mode-select',
    loadChildren: () => import('./mode-select/mode-select.module').then( m => m.ModeSelectPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'video-download-modal',
    loadChildren: () => import('./modal/video-download-modal/video-download-modal.module').then( m => m.VideoDownloadModalPageModule)
  },
  {
    path: 'music-download-modal',
    loadChildren: () => import('./modal/music-download-modal/music-download-modal.module').then( m => m.MusicDownloadModalPageModule)
  },
  {
    path: 'light-store-house',
    loadChildren: () => import('./light-store-house/light-store-house.module').then( m => m.LightStoreHousePageModule)
  },
  {
    path: 'open-show',
    loadChildren: () => import('./open-show/open-show.module').then( m => m.OpenShowPageModule)
  },
  {
    path: 'product-center',
    loadChildren: () => import('./product-center/product-center.module').then( m => m.ProductCenterPageModule)
  },
  {
    path: 'parameter-setting-tabs',
    loadChildren: () => import('./parameter-setting/parameter-setting-tabs/parameter-setting-tabs.module').then( m => m.ParameterSettingTabsPageModule)
  },
  {
    path: 'parameter-verify',
    loadChildren: () => import('./parameter-setting/parameter-verify/parameter-verify.module').then( m => m.ParameterVerifyPageModule)
  },
  {
    path: 'screen',
    loadChildren: () => import('./screen/screen.module').then( m => m.ScreenPageModule)
  },
  {
    path: 'update-program',
    loadChildren: () => import('./update-program/update-program.module').then( m => m.UpdateProgramPageModule)
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
