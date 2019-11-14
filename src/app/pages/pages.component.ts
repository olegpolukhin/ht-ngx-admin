import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})

export class PagesComponent {

  menu: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'nb-home',
      link: '/pages/dashboard',
      home: true,
    },
    {
      title: 'Tubes',
      icon: 'nb-gear',
      link: '/pages/tubes',
    },
    {
      title: 'Users',
      icon: 'nb-gear',
      link: '/pages/users',
    },
    {
      title: 'Traffic',
      icon: 'nb-gear',
      link: '/pages/traffic',
    },
    {
      title: 'Networks',
      icon: 'nb-gear',
      link: '/pages/network',
    },
    {
      title: 'Templates',
      icon: 'nb-gear',
      link: '/pages/templates',
    },
    {
      title: 'Languages',
      icon: 'nb-gear',
      link: '/pages/languages',
    },
  ];
}

