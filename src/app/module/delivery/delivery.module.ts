import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class DeliveryModule {
  id!: number;
  client_id!: number;
  client_location_id!: number;
  courier_id!: number;
  packing_date!: Date;
  reference_num!: string;
  del_type!: string;
  collection_date?: Date;
  invoice_number!: string;
  status!: string;
}

export class DeliveryRequestModule {
  client_id!: number;
  client_location_id!: number;
  courier_id!: number;
  packing_date!: Date;
  reference_num!: string;
  del_type!: string;
  collection_date?: Date;
  invoice_number!: string;
  status!: string;
}

export class DeliveryItemModule {
  id!: number;
  delivery_id!: number;
  item_barcode!: string;
  quantity!: number;
}
