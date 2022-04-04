import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import {
  UserModule,
  UserRequestModule,
  UserResponseModule,
} from '../../../module/user/user.module';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userFormGroup!: FormGroup;
  formHeader!: string;
  InsertedUser!: UserRequestModule;
  @Input() public selectedUser!: UserModule;
  @Input() public formName!: string;
  @Output() closeOverlay = new EventEmitter<boolean>();
  @Output() editUser = new EventEmitter<UserModule>();
  @Output() createUser = new EventEmitter<UserRequestModule>();
  @Output() deleteUser = new EventEmitter<number>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      id: [this.selectedUser.id],
      name: [this.selectedUser.name, Validators.required],
      email: [this.selectedUser.email, Validators.required],
      password: [this.selectedUser.password, Validators.required],
      role: [this.selectedUser.role, Validators.required],
    });
    this.formHeader = this.formName;
  }

  onCloseClick() {
    this.closeOverlay.emit(false);
  }

  onEditClick() {
    this.editUser.emit({
      id: this.userFormGroup.value.id,
      name: this.userFormGroup.value.name,
      password: this.userFormGroup.value.password,
      email: this.userFormGroup.value.email,
      role: this.userFormGroup.value.role,
    });
  }

  onDeleteClick() {
    this.deleteUser.emit(this.selectedUser.id);
  }

  onCreateClick() {
    this.InsertedUser = {
      name: this.userFormGroup.value.name,
      password: this.userFormGroup.value.password,
      role: this.userFormGroup.value.role,
      email: this.userFormGroup.value.email,
    };
    this.createUser.emit(this.InsertedUser);
  }
}
