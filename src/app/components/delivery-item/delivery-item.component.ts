import { Component, OnInit } from '@angular/core';
import {
  DeliveryItemModule,
  DeliveryModule,
} from '../../module/delivery/delivery.module';
import { DeliveryItemRequestModule } from '../../module/delivery-item/delivery-item.module';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { ItemModule } from '../../module/item/item.module';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.css'],
})
export class DeliveryItemComponent implements OnInit {
  deliveyItems!: DeliveryItemModule[];
  newdeliveyItem!: DeliveryItemRequestModule;
  loading: boolean = true;
  gettinglocations: boolean = true;
  display: boolean = false;
  selectedItem!: ItemModule;
  formName: string = 'Create Item';
  deliveryLocation!: string;
  clientlocation: string = '';

  constructor(
    private rt: Router,
    private ds: DataService,
    private ts: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDeliveyLocation();
    this.getAllItems();
    this.resetNewDeliveryItem();
    this.refreshTable();
    this.getDeliveries();
  }

  async getDeliveyLocation() {
    if (this.ds.clientLocations === undefined) {
      await this.ds
        .getDelivery(
          Number(this.rt.url.split('/')[this.rt.url.split('/').length - 2])
        )
        .subscribe(
          (res) => {
            this.ds.delivery = res;
          },
          (err) => {
            this.ts.error('error getting delivery', 'delivery');
          }
        );

      await this.ds.getAllClientLocations().subscribe(
        (res) => {
          this.ds.clientLocations = res;
          this.gettinglocations = false;
          this.ds.clientLocations.forEach((x) => {
            if (x.id === this.ds.delivery.client_location_id) {
              this.gettinglocations = false;
              this.clientlocation = x.address;
            }
          });
        },
        (err) => {
          this.ts.error('error getting client Locations', 'client Locations');
        }
      );
    } else {
      this.ds.clientLocations.forEach((x) => {
        if (x.id === this.ds.delivery.client_location_id) {
          this.gettinglocations = false;
          this.clientlocation = x.address;
        }
      });
    }
  }

  async getDeliveries() {
    await this.ds.getDeliveries().subscribe(
      (res) => {
        this.ds.deliveries = res;
      },
      (err) => {
        this.ts.error(err.error.message, 'Deliveries Error');
      }
    );

    await this.ds.getClients().subscribe(
      (res) => {
        this.ds.clients = res;
      },
      (err) => {
        this.ts.error(err.error.message, 'Clients Error');
      }
    );

    await this.ds.getAllClientLocations().subscribe(
      (res) => {
        this.ds.allClientLocations = res;
      },
      (err) => {
        this.ts.error(err.error.message, 'Client Locations Error');
      }
    );

    await this.ds.getCouriers().subscribe(
      (res) => {
        this.ds.couriers = res;
      },
      (err) => {
        this.ts.error(err.error.message, 'Courier Error');
      }
    );

    await this.ds.getItems().subscribe(
      (res) => {
        this.ds.items = res;
        this.loading = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Items Error');
      }
    );
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.addItem();
    }
  }

  gotoprint() {
    this.rt.navigateByUrl(`print/${this.ds.delivery.id}`);
  }

  resetNewDeliveryItem() {
    this.newdeliveyItem = {
      delivery_id: Number(this.rt.url.split('/')[2]),
      item_barcode: '',
      quantity: 1,
    };
  }

  refreshTable() {
    this.ds.getDeliveryItems(Number(this.rt.url.split('/')[2])).subscribe(
      (res) => {
        this.deliveyItems = res;
        this.resetNewDeliveryItem();
        this.loading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllItems() {
    this.ds.getItems().subscribe(
      (res) => {
        this.ds.items = res;
      },
      (err) => {
        this.ts.error('error getting items', 'Getting Items');
      }
    );
  }

  async addItem() {
    let match: boolean = false;
    let found: boolean = false;
    let found_id: number = 0;

    this.deliveyItems.forEach((item) => {
      if (this.newdeliveyItem.item_barcode === item.item_barcode) {
        match = true;
        let total: number =
          Number(this.newdeliveyItem.quantity) + Number(item.quantity);
        this.newdeliveyItem.quantity = total;
        found_id = item.id;
      }
    });

    this.ds.items.forEach((item) => {
      if (this.newdeliveyItem.item_barcode === item.barcode) {
        found = true;
      }
    });

    if (match) {
      this.updateItem(found_id);
    } else if (found) {
      this.addItemDelivery();
    } else {
      this.createItem();
    }
  }

  updateItem(id: number) {
    let updatedItem: DeliveryItemModule = {
      id: id,
      item_barcode: this.newdeliveyItem.item_barcode,
      delivery_id: this.newdeliveyItem.delivery_id,
      quantity: this.newdeliveyItem.quantity,
    };
    this.ds.updateDeliveryItem(updatedItem).subscribe(
      (res) => {
        this.ts.success('Delivery item updated', 'Updating Item');
        this.loading = true;
        this.refreshTable();
      },
      (err) => {
        this.ts.error('Delivery item not updated', 'Updating Item');
      }
    );
  }

  onCloseOverlay(display: boolean) {
    this.newdeliveyItem.item_barcode = '';
    this.newdeliveyItem.quantity = 1;
    this.display = false;
  }

  onUpdateSubmit(item: ItemModule) {
    console.log('should never be shown');
  }

  onCreateSubmit(createdItem: ItemModule) {
    this.ds.createItem(createdItem).subscribe(
      (res) => {
        this.ts.success('Item was creating', 'Created Item');
        this.display = false;
        this.getAllItems();
        this.addItemDelivery();
      },
      (err) => {
        this.ts.error(err.error.message, 'Error creating item');
      }
    );
  }

  onDeleteSubmit(barcode: string) {
    console.log('should never be shown');
  }

  addItemDelivery() {
    this.ds.createDeliveryItem(this.newdeliveyItem).subscribe(
      (res) => {
        this.ts.success('Delivery item added', 'Adding Item');
        this.loading = true;
        this.refreshTable();
      },
      (err) => {
        this.ts.error('Delivery item not added', 'Adding Item');
      }
    );
  }

  createItem() {
    this.selectedItem = {
      barcode: this.newdeliveyItem.item_barcode,
      name: '',
      description: '',
    };
    this.display = true;
  }

  deleteItem(id: number) {
    this.ds.deleteDeliveryItem(id).subscribe(
      (res) => {
        this.ts.success('Delivery item removed', 'Removing Item');
        this.loading = true;
        this.refreshTable();
      },
      (err) => {
        this.ts.error('Delivery item not removed', 'Removing Item');
      }
    );
  }
}
