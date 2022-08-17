import { Component, OnInit } from '@angular/core';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ep-frontend';

  constructor(private ds: DataService) {}

  ngOnInit(): void {
    this.ds.getClients().subscribe(
      (data) => {
        this.ds.clients = data;
      },
      (error) => {
        console.error(error);
      }
    );

    this.ds.getCouriers().subscribe(
      (data) => {
        this.ds.couriers = data;
      },
      (error) => {
        console.error(error);
      }
    );

    this.ds.getItems().subscribe(
      (data) => {
        this.ds.items = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
