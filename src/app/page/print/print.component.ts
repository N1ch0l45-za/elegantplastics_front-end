import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { DeliveryModule } from '../../module/delivery/delivery.module';
import { Router } from '@angular/router';
import { ClientModule } from '../../module/client/client.module';
import { ClientLocationModule } from '../../module/client-location/client-location.module';
import { CourierModule } from '../../module/courier/courier.module';
import { DeliveryItemModule } from '../../module/delivery-item/delivery-item.module';
import { ItemModule } from '../../module/item/item.module';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css'],
})
export class PrintComponent implements OnInit {
  delivery!: DeliveryModule;
  dateToday = Date.now();
  Total: number = 0;
  deliveryItems!: DeliveryItemModule[];

  constructor(private ds: DataService, private router: Router) {}

  ngOnInit(): void {
    this.Total = 0;
    this.delivery = this.ds.delivery;
    this.deliveryItems = this.ds.deliveryItems;
  }

  getClientName(id: number): string {
    let client!: ClientModule;
    this.ds.clients.forEach((x) => {
      if (x.id === id) {
        client = x;
      }
    });

    return client.name;
  }

  getDocumentNum(id: number) {
    return id + 1055;
  }

  getClientAddress(id: number): string {
    let client!: ClientModule;
    this.ds.clients.forEach((x) => {
      if (x.id === id) {
        client = x;
      }
    });

    return client.address;
  }

  getClientLocationDetails(id: number): string {
    let clientLocation!: ClientLocationModule;
    this.ds.allClientLocations.forEach((x) => {
      if (x.id === id) {
        clientLocation = x;
      }
    });
    return clientLocation.address;
  }

  getCourierDetails(id: number): string {
    let courier!: CourierModule;
    this.ds.couriers.forEach((x) => {
      if (x.id === id) {
        courier = x;
      }
    });

    return courier.name;
  }

  getItemNameDetails(barcode: string): string {
    let item!: ItemModule;
    this.ds.items.forEach((x) => {
      if (x.barcode === barcode) {
        item = x;
      }
    });
    return item.name;
  }

  getItemDescriptionDetails(barcode: string): string {
    let item!: ItemModule;
    this.ds.items.forEach((x) => {
      if (x.barcode === barcode) {
        item = x;
      }
    });
    return item.description;
  }

  addToTotal(): number {
    this.Total = 0;
    this.deliveryItems.forEach((x) => {
      this.Total += x.quantity;
    });
    return this.Total;
  }
}
