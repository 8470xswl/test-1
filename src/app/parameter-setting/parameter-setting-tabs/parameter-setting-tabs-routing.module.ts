import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParameterSettingTabsPage } from './parameter-setting-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: ParameterSettingTabsPage,
    children:[
      {
        // 默认页面为基本设置
        path:'',
        redirectTo:"/parameter-setting-tabs/port-setting",
        pathMatch:'full',
      },
      {
        // 视频延迟
        path: 'video-delay',
        loadChildren: () => import('../video-delay/video-delay.module').then( m => m.VideoDelayPageModule)
      },
      //灯光录制
      {
        path: 'light-storage-record',
        loadChildren: () => import('../light-storage-record/light-storage-record.module').then( m => m.LightStorageRecordPageModule)
      },
      {
        // 开场秀延迟
        path: 'show-delay',
        loadChildren: () => import('../show-delay/show-delay.module').then( m => m.ShowDelayPageModule)
      }, {
        // 基本设置
        path: 'port-setting',
        loadChildren: () => import('../port-setting/port-setting.module').then( m => m.PortSettingPageModule)
      },
      {
        // 烟机设置
        path: 'smoke-setting',
        loadChildren: () => import('../smoke-setting/smoke-setting.module').then( m => m.SmokeSettingPageModule)
      },
      {
        // 其他延时
        path: 'other-delay',
        loadChildren: () => import('../other-delay/other-delay.module').then( m => m.OtherDelayPageModule)
      },
      {
        // 设备列表
        path: 'record-list',
        loadChildren: () => import('../record-list/record-list.module').then( m => m.RecordListPageModule)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParameterSettingTabsPageRoutingModule {}
