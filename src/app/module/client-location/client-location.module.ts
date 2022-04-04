import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class ClientLocationModule {
  id!: number;
  client_id!: number;
  address!: string;
}

export class ClientLocationRequestModule {
  client_id!: number;
  address!: string;
}
