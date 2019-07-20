import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NeptuneSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';

import { PerfilComponent } from '../layouts/';
import { KnowledgeComponent } from '../layouts/';

@NgModule({
  imports: [NeptuneSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [KnowledgeComponent, PerfilComponent, HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PerfilComponent, KnowledgeComponent]
})
export class NeptuneHomeModule {}
