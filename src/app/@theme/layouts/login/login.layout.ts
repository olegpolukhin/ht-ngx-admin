import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import {
  NbMediaBreakpointsService,
  NbThemeService,
} from '@nebular/theme';

@Component({
  selector: 'ngx-login-layout',
  styleUrls: ['./login.layout.scss'],
  templateUrl: './login.layout.html',
})
export class LoginLayoutComponent implements OnDestroy {

  layout: any = {};

  private alive = true;

  currentTheme: string;

  constructor(
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService) {

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
