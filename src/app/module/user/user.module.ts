import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class UserModule {
  id: number = 0;
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'User';
}

export class UserResponseModule {
  id: number = 0;
  name: string = '';
  email: string = '';
  role: string = '';
}

export class UserRequestModule {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'User';
}
