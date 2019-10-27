import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { NeptuneSharedModule } from 'app/shared';
import { NeptuneCoreModule } from 'app/core';
import { NeptuneHomeModule } from './home/home.module';
import { NeptuneAppRoutingModule } from './app-routing.module';
import { NeptuneAccountModule } from './account/account.module';
import { NeptuneEntityModule } from './entities/entity.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgImageSliderModule } from 'ng-image-slider';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { ActiveMenuDirective, ErrorComponent, FooterComponent, JhiMainComponent, NavbarComponent, PageRibbonComponent } from './layouts';

@NgModule({
  imports: [
    NgImageSliderModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true
    }),
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: true,
      defaultI18nLang: 'pt-br'
    }),
    NeptuneSharedModule.forRoot(),
    NeptuneCoreModule,
    NeptuneHomeModule,
    NeptuneAccountModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    NeptuneEntityModule,
    NeptuneAppRoutingModule,

    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  exports: [NavbarComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class NeptuneAppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../i18n/', '.json');
}
