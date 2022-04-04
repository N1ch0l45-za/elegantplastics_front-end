import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  role: any = '';
  constructor(
    private ds: DataService,
    private cs: CookieService,
    private rt: Router
  ) {}

  ngOnInit(): void {
    if (this.ds.Role === '') {
      this.role = this.ds.getRole();
    } else {
      this.role = this.ds.Role;
    }
  }

  Logout() {
    this.cs.delete('ep_delivery_cookie');
    this.rt.navigateByUrl('login');
  }
}
