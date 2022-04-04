import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class ItemModule {
  barcode!: string;
  name!: string;
  description!: string;
}
