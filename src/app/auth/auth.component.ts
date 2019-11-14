import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-auth',
  styleUrls: ['auth.component.scss'],
  template: `
    <ngx-login-layout>
      <router-outlet></router-outlet>
    <ngx-login-layout>
  `,
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
