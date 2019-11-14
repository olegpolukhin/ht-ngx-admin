import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DashboardModule } from './ht-dashboard/dashboard.module';
import { TubeModule } from './tube/tube.module';
import { UsersModule } from './users/users.module';
import { TrafficModule } from './traffic/traffic.module';
import { NetworkModule } from './network/network.module';
import { TemplatesModule } from './templates/templates.module';
import { LanguagesModule } from './languages/languages.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';

const MODULES = [
  PagesRoutingModule,
  ThemeModule,
  DashboardModule,
  TubeModule,
  UsersModule,
  TrafficModule,
  NetworkModule,
  TemplatesModule,
  LanguagesModule,
];

const PAGES_COMPONENTS = [
  PagesComponent,
  NotFoundComponent,
];

const ENTRY_COMPONENTS = [
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class PagesModule {
}
