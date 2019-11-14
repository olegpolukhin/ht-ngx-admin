import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginModule } from './login/login.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { NbAuthModule } from '@nebular/auth';

@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
    LoginModule,
    NbAuthModule,
  ],
  declarations: [
    AuthComponent,
  ],
})
export class AuthModule {
}
