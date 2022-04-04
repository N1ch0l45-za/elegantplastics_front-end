import {
  ClientModule,
  ClientRequestModule,
} from './../../../module/client/client.module';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  clientFormGroup!: FormGroup;
  formHeader!: string;
  @Input() public selectedClient!: ClientModule;
  @Input() public formName!: string;
  @Output() closeOverlay = new EventEmitter<boolean>();
  @Output() editUser = new EventEmitter<ClientModule>();
  @Output() createUser = new EventEmitter<ClientRequestModule>();
  @Output() deleteUser = new EventEmitter<number>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientFormGroup = this.fb.group({
      id: [this.selectedClient.id, Validators.required],
      name: [this.selectedClient.name, Validators.required],
      address: [this.selectedClient.address, Validators.required],
    });
    this.formHeader = this.formName;
  }

  onCloseClick() {
    this.closeOverlay.emit(false);
  }

  onEditClick() {
    this.editUser.emit({
      id: this.clientFormGroup.value.id,
      name: this.clientFormGroup.value.name,
      address: this.clientFormGroup.value.address,
    });
  }

  onDeleteClick() {
    this.deleteUser.emit(this.selectedClient.id);
  }

  onCreateClick() {
    this.createUser.emit({
      name: this.clientFormGroup.value.name,
      address: this.clientFormGroup.value.address,
    });
  }
}
