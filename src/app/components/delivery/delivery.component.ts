import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { DeliveryDataTableComponent } from './delivery-data-table/delivery-data-table.component';
import {
  DeliveryModule,
  DeliveryRequestModule,
} from '../../module/delivery/delivery.module';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent implements OnInit {
  deliveries!: DeliveryModule[];
  loading: boolean = true;
  display: boolean = false;
  selectedDelivery: DeliveryModule = new DeliveryModule();
  formName: string = '';

  @ViewChild(DeliveryDataTableComponent)
  DeliveryDataTable!: DeliveryDataTableComponent;

  constructor(private ds: DataService, private ts: ToastrService) {}

  ngOnInit(): void {
    this.getDeliveries();
  }

  async getDeliveries() {
    await this.ds.getDeliveries().subscribe(
      (res) => {
        this.deliveries = res;
        this.ds.deliveries = this.deliveries;
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

  reloadUserTable() {
    this.loading = true;
    this.getDeliveries();
    this.deliveries = [];
    this.deliveries = this.ds.deliveries;

    if (this.deliveries) {
      this.DeliveryDataTable.setupTable();
    } else {
      this.loading = false;
    }
  }

  getDelivery(id: number, formName: string) {
    this.ds.getDelivery(id).subscribe(
      (res) => {
        this.selectedDelivery = res;
        this.display = true;
        this.formName = formName;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error getting delivery');
      }
    );
  }

  onEditClick(id: number) {
    this.getDelivery(id, 'Edit Delivery');
  }

  onDeleteClick(id: number) {
    this.getDelivery(id, 'Delete Delivery');
  }

  onAddClick(add: boolean) {
    this.display = add;
    this.selectedDelivery = {
      id: 0,
      client_id: 0,
      client_location_id: 0,
      courier_id: 0,
      packing_date: new Date(),
      reference_num: '',
      del_type: '',
      collection_date: undefined,
      invoice_number: '',
      status: 'Collecting',
    };
    this.formName = 'Create Delivery';
  }

  onCreateSubmit(createdDelivery: DeliveryRequestModule) {
    console.log(createdDelivery);
    this.ds.createDelivery(createdDelivery).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('Delivery was creating', 'Created Delivery');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error creating delivery');
      }
    );
  }

  onUpdateSubmit(updateDelivery: DeliveryModule) {
    console.log(updateDelivery);
    this.ds.updateDelivery(updateDelivery).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('Delivery was updated', 'updated Delivery');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error updaing delivery');
      }
    );
  }

  onDeleteSubmit(deleteId: number) {
    this.ds.deleteDelivery(deleteId).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('Delivery was deleted', 'Deleted Delivery');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error deleting delivery');
      }
    );
  }

  onCloseOverlay(display: boolean) {
    this.display = display;
  }
}
