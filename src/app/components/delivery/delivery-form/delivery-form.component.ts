import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientModule } from '../../../module/client/client.module';
import { DataService } from '../../../service/data.service';
import { ClientLocationModule } from '../../../module/client-location/client-location.module';
import { CourierModule } from '../../../module/courier/courier.module';
import { Router } from '@angular/router';
import {
  DeliveryModule,
  DeliveryRequestModule,
} from '../../../module/delivery/delivery.module';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css'],
})
export class DeliveryFormComponent implements OnInit {
  deliveryFormGroup!: FormGroup;
  formHeader!: string;
  clientList!: ClientModule[];
  clientLocationList!: ClientLocationModule[];
  clientLocations!: ClientLocationModule[];
  couriers!: CourierModule[];
  @Input() public selectedDelivery!: DeliveryModule;
  @Input() public formName!: string;
  @Output() closeOverlay = new EventEmitter<boolean>();
  @Output() editUser = new EventEmitter<DeliveryModule>();
  @Output() createUser = new EventEmitter<DeliveryRequestModule>();
  @Output() deleteUser = new EventEmitter<number>();
  constructor(
    private fb: FormBuilder,
    private ds: DataService,
    private rt: Router
  ) {}

  ngOnInit(): void {
    this.clientList = this.ds.clients;
    this.clientLocationList = this.ds.allClientLocations;

    this.deliveryFormGroup = this.fb.group({
      id: [this.selectedDelivery.id, Validators.required],
      client_id: [this.selectedDelivery.client_id, Validators.required],
      client_location_id: [
        this.selectedDelivery.client_location_id,
        Validators.required,
      ],
      courier_id: [this.selectedDelivery.courier_id, Validators.required],
      packing_date: [this.selectedDelivery.packing_date, Validators.required],
      reference_num: [this.selectedDelivery.reference_num, Validators.required],
      del_type: [this.selectedDelivery.del_type, Validators.required],
      collection_date: [
        this.selectedDelivery.collection_date,
        Validators.required,
      ],
      invoice_number: [
        this.selectedDelivery.invoice_number,
        Validators.required,
      ],
      status: [this.selectedDelivery.status, Validators.required],
    });
    this.formHeader = this.formName;
    this.clientLocations = this.clientLocationList;
    this.couriers = this.ds.couriers;
  }

  onCloseClick() {
    this.closeOverlay.emit(false);
  }

  filterClientLocationList() {
    this.clientLocations = this.clientLocationList.filter(
      (x) => x.client_id == this.deliveryFormGroup.value.client_id
    );
  }

  onEditClick() {
    this.editUser.emit({
      id: this.deliveryFormGroup.value.id,
      client_id: this.deliveryFormGroup.value.client_id,
      client_location_id: this.deliveryFormGroup.value.client_location_id,
      courier_id: this.deliveryFormGroup.value.courier_id,
      packing_date: this.deliveryFormGroup.value.packing_date,
      reference_num: this.deliveryFormGroup.value.reference_num,
      del_type: this.deliveryFormGroup.value.del_type,
      collection_date: this.deliveryFormGroup.value.collection_date,
      invoice_number: this.deliveryFormGroup.value.invoice_number,
      status: this.deliveryFormGroup.value.status,
    });
  }

  onDeleteClick() {
    this.deleteUser.emit(this.selectedDelivery.id);
  }

  onCreateClick() {
    this.createUser.emit({
      client_id: this.deliveryFormGroup.value.client_id,
      client_location_id: this.deliveryFormGroup.value.client_location_id,
      courier_id: this.deliveryFormGroup.value.courier_id,
      packing_date: this.deliveryFormGroup.value.packing_date,
      reference_num: this.deliveryFormGroup.value.reference_num,
      del_type: this.deliveryFormGroup.value.del_type,
      collection_date: this.deliveryFormGroup.value.collection_date,
      invoice_number: this.deliveryFormGroup.value.invoice_number,
      status: this.deliveryFormGroup.value.status,
    });
  }

  onAddItemsClick(id: number) {
    this.rt.navigateByUrl(`delivery/${id}/items`);
  }
}
