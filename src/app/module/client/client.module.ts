import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class ClientModule {
  id!: number;
  name!: string;
  address!: string;
}

export class ClientRequestModule {
  name!: string;
  address!: string;
}
