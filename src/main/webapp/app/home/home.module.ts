import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NeptuneSharedModule} from 'app/shared';
import {HOME_ROUTE, HomeComponent} from './';

import {KnowledgeComponent, PerfilComponent} from '../layouts/';

@NgModule({
  imports: [NeptuneSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [KnowledgeComponent, PerfilComponent, HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PerfilComponent, KnowledgeComponent]
})
export class NeptuneHomeModule {}
