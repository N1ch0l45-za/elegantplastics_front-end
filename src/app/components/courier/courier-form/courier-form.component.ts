import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CourierModule,
  CourierRequestModule,
} from '../../../module/courier/courier.module';

@Component({
  selector: 'app-courier-form',
  templateUrl: './courier-form.component.html',
  styleUrls: ['./courier-form.component.css'],
})
export class CourierFormComponent implements OnInit {
  courierFormGroup!: FormGroup;
  formHeader!: string;
  @Input() public selectedCourier!: CourierModule;
  @Input() public formName!: string;
  @Output() closeOverlay = new EventEmitter<boolean>();
  @Output() editUser = new EventEmitter<CourierModule>();
  @Output() createUser = new EventEmitter<CourierRequestModule>();
  @Output() deleteUser = new EventEmitter<number>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courierFormGroup = this.fb.group({
      id: [this.selectedCourier.id, Validators.required],
      name: [this.selectedCourier.name, Validators.required],
    });
    this.formHeader = this.formName;
  }

  onCloseClick() {
    this.closeOverlay.emit(false);
  }

  onEditClick() {
    this.editUser.emit({
      id: this.courierFormGroup.value.id,
      name: this.courierFormGroup.value.name,
    });
  }

  onDeleteClick() {
    this.deleteUser.emit(this.selectedCourier.id);
  }

  onCreateClick() {
    console.log({
      name: this.courierFormGroup.value.name,
    });
    this.createUser.emit({
      name: this.courierFormGroup.value.name,
    });
  }
}
