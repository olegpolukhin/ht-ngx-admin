import { NgModule } from '@angular/core';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { LanguagesComponent } from './languages.component';

import { ComponentsModule } from '../../components/components.module';

const MODULES = [
  ThemeModule,
  Ng2SmartTableModule,
  ComponentsModule,
];

const components = [
  LanguagesComponent,
];

const ENTRY_COMPONENTS = [
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  exports: [
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class LanguagesModule { }
