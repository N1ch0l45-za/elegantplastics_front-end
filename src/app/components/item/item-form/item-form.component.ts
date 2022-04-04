import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemModule } from '../../../module/item/item.module';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
  userFormGroup!: FormGroup;
  formHeader!: string;
  @Input() public selectedItem!: ItemModule;
  @Input() public formName!: string;
  @Output() closeOverlay = new EventEmitter<boolean>();
  @Output() editUser = new EventEmitter<ItemModule>();
  @Output() createUser = new EventEmitter<ItemModule>();
  @Output() deleteUser = new EventEmitter<string>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      barcode: [this.selectedItem.barcode, Validators.required],
      name: [this.selectedItem.name, Validators.required],
      description: [this.selectedItem.description, Validators.required],
    });
    this.formHeader = this.formName;
  }

  onCloseClick() {
    this.closeOverlay.emit(false);
  }

  onEditClick() {
    this.editUser.emit({
      barcode: this.userFormGroup.value.barcode,
      name: this.userFormGroup.value.name,
      description: this.userFormGroup.value.description,
    });
  }

  onDeleteClick() {
    this.deleteUser.emit(this.selectedItem.barcode);
  }

  onCreateClick() {
    console.log({
      barcode: this.userFormGroup.value.barcode,
      name: this.userFormGroup.value.name,
      description: this.userFormGroup.value.description,
    });
    this.createUser.emit({
      barcode: this.userFormGroup.value.barcode,
      name: this.userFormGroup.value.name,
      description: this.userFormGroup.value.description,
    });
  }
}
