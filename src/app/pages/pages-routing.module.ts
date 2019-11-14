import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './ht-dashboard/dashboard.component';
import { TubeComponent } from './tube/tube.component';
import { UsersComponent } from './users/users.component';
import { TrafficComponent } from './traffic/traffic.component';
import { NetworkComponent } from './network/network.component';
import { TemplatesComponent } from './templates/templates.component';
import { LanguagesComponent } from './languages/languages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../@core/guard/auth.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tubes',
    component: TubeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'traffic',
    component: TrafficComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'network',
    component: NetworkComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'templates',
    component: TemplatesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'languages',
    component: LanguagesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
