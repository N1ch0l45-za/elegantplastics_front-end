import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { CourierDataTableComponent } from './courier-data-table/courier-data-table.component';
import {
  CourierModule,
  CourierRequestModule,
} from '../../module/courier/courier.module';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.css'],
})
export class CourierComponent implements OnInit {
  couriers!: CourierModule[];
  loading: boolean = true;
  display: boolean = false;
  selectedCourier: CourierModule = new CourierModule();
  createCourier: CourierRequestModule = new CourierRequestModule();
  formName: string = '';

  @ViewChild(CourierDataTableComponent)
  ItemDataTable!: CourierDataTableComponent;

  constructor(private ds: DataService, private ts: ToastrService) {}

  ngOnInit(): void {
    this.getCouriers();
  }

  getCouriers() {
    this.ds.getCouriers().subscribe(
      (res) => {
        this.couriers = res;
        this.ds.couriers = this.couriers;
        this.loading = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Items Error');
      }
    );
  }

  reloadUserTable() {
    this.loading = true;
    this.getCouriers();
    this.couriers = [];
    this.couriers = this.ds.couriers;

    if (this.couriers) {
      this.ItemDataTable.setupTable();
    } else {
      this.loading = false;
    }
  }

  getCourier(id: number, formName: string) {
    this.ds.getCourier(id).subscribe(
      (res) => {
        this.selectedCourier = res;
        this.display = true;
        this.formName = formName;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error getting item');
      }
    );
  }

  onEditClick(id: number) {
    this.getCourier(id, 'Edit Courier');
  }

  onDeleteClick(id: number) {
    this.getCourier(id, 'Delete Courier');
  }

  onAddClick(add: boolean) {
    this.display = add;
    this.selectedCourier = {
      id: 0,
      name: '',
    };
    this.formName = 'Create Courier';
  }

  onCreateSubmit(createdCourier: CourierRequestModule) {
    this.ds.createCourier(createdCourier).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('Courier was creating', 'Created Courier');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error creating courier');
      }
    );
  }

  onUpdateSubmit(updateCourier: CourierModule) {
    this.ds.updateCourier(updateCourier).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('Courier was updated', 'updated Courier');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error updaing courier');
      }
    );
  }

  onDeleteSubmit(deletedId: number) {
    this.ds.deleteCourier(deletedId).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('Courier was deleted', 'Deleted Courier');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error deleting courier');
      }
    );
  }

  onCloseOverlay(display: boolean) {
    this.display = display;
  }
}
