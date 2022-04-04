import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ClientLocationModule,
  ClientLocationRequestModule,
} from '../../../module/client-location/client-location.module';

@Component({
  selector: 'app-client-location-form',
  templateUrl: './client-location-form.component.html',
  styleUrls: ['./client-location-form.component.css'],
})
export class ClientLocationFormComponent implements OnInit {
  clientLocationFormGroup!: FormGroup;
  formHeader!: string;
  @Input() public selectedClientLocation!: ClientLocationModule;
  @Input() public formName!: string;
  @Output() closeOverlay = new EventEmitter<boolean>();
  @Output() editUser = new EventEmitter<ClientLocationModule>();
  @Output() createUser = new EventEmitter<ClientLocationRequestModule>();
  @Output() deleteUser = new EventEmitter<number>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientLocationFormGroup = this.fb.group({
      id: [this.selectedClientLocation.id, Validators.required],
      client_id: [this.selectedClientLocation.client_id, Validators.required],
      address: [this.selectedClientLocation.address, Validators.required],
    });
    this.formHeader = this.formName;
  }

  onCloseClick() {
    this.closeOverlay.emit(false);
  }

  onEditClick() {
    this.editUser.emit({
      id: this.clientLocationFormGroup.value.id,
      client_id: this.clientLocationFormGroup.value.client_id,
      address: this.clientLocationFormGroup.value.address,
    });
  }

  onDeleteClick() {
    this.deleteUser.emit(this.selectedClientLocation.id);
  }

  onCreateClick() {
    this.createUser.emit({
      client_id: this.clientLocationFormGroup.value.client_id,
      address: this.clientLocationFormGroup.value.address,
    });
  }
}
