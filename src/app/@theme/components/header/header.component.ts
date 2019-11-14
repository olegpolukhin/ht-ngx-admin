import { Component, Input, OnInit, isDevMode } from '@angular/core';
import { NbSidebarService, NbMenuService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { AuthenticationService } from '../../../@core/services/authentication.service';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  checkDevMode = isDevMode();
  userMenu = [{ title: 'Log Out' }];

  constructor(private sidebarService: NbSidebarService,
    private nbMenuService: NbMenuService,
    private layoutService: LayoutService,
    private _auth: AuthenticationService,
    private router: Router) {
  }

  ngOnInit() {
    this.user = { name: 'Profile', picture: 'assets/images/admin.svg' };

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'context-menu'),
        map(({ item: { title } }) => title),
      ).subscribe(title => {
        if (title === 'Log Out') {
          this.logout();
        }
      });
  }

  logout() {
    this._auth.logout().subscribe(
      () => {
        this.router.navigate(['/auth/login']);
      },
    );
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

}
