import { NgModule } from "@angular/core"
import { BrowserModule, HammerModule } from "@angular/platform-browser"
import { RouteReuseStrategy } from "@angular/router"

import { IonicModule, IonicRouteStrategy } from "@ionic/angular"
import { IonicStorageModule } from "@ionic/storage-angular"
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner/ngx"

import { AppComponent } from "./app.component"
import { AppRoutingModule } from "./app-routing.module"
import { Autostart } from "@ionic-native/autostart/ngx"
import { HttpClientModule, HttpClient } from "@angular/common/http"

import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core"
import { TranslateHttpLoader } from "@ngx-translate/http-loader"

//翻译加载程序需要知道在哪里加载i18n文件

//在Ionic的静态资产管道中

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json")
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot(),
        HttpClientModule,
        HammerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        TranslateService,
        BarcodeScanner,
        Autostart,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
