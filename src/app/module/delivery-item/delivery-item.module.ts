import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class DeliveryItemModule {
  id!: number;
  delivery_id!: number;
  item_barcode!: string;
  quantity!: number;
}

export class DeliveryItemRequestModule {
  delivery_id!: number;
  item_barcode!: string;
  quantity!: number;
}
