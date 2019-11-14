import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../@core/services';
import { UserAuth } from '../../@core/data/users';

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const userData: UserAuth = {
      username: this.f.username.value,
      password: this.f.password.value,
    };

    this.loading = true;
    this.authenticationService.login(userData)
      .pipe(first())
      .subscribe(
        data => {
          if (data && data.code > 0) {
            this.loading = false;
          }
          if (data && data.code === 3) {
            this.error = data.message ? data.message : 'LOGIN Error';
          }
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error.message;
          this.loading = false;
        });
  }
}
