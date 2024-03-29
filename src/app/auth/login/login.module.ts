import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  bootstrap: [],
  declarations: [
    LoginComponent,
  ],
  providers: [
  ],
})
export class LoginModule { }
