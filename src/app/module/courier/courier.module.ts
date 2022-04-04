import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CourierModule {
  id!: number;
  name!: string;
}

export class CourierRequestModule {
  name!: string;
}
