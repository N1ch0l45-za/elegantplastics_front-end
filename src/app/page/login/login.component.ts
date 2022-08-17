import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private cs: CookieService,
    private ts: ToastrService,
    private ds: DataService,
    private rt: Router
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (this.cs.get('ep_delivery_cookie')) {
      this.ds.Token = this.cs.get('ep_delivery_cookie');
      this.rt.navigateByUrl('');
    }
  }

  afterLogin = async (token: string) => {
    let date = new Date();
    date.setTime(date.getTime() + 8 * 60 * 60 * 1000);
    let expires = date;

    this.cs.set('ep_delivery_cookie', token, {
      expires: expires,
      path: '/',
      sameSite: 'Lax',
    });
    this.rt.navigateByUrl('');
  };

  onSubmit() {
    this.ds
      .GetToken(
        this.loginFormGroup.value.email,
        this.loginFormGroup.value.password
      )
      .subscribe(
        (res) => {
          this.ts.info('Login Successful', 'Login Info');
          this.ds.Token = res.token;
          this.afterLogin(res.token);
        },
        (err) => {
          this.ts.error(err.error.message, 'Login Error');
        }
      );
  }
}
