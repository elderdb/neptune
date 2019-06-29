import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NeptuneSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [NeptuneSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [NeptuneSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NeptuneSharedModule {
  static forRoot() {
    return {
      ngModule: NeptuneSharedModule
    };
  }
}
