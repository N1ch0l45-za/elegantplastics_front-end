import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ToastrService } from 'ngx-toastr';
import {
  UserResponseModule,
  UserModule,
  UserRequestModule,
} from '../../module/user/user.module';
import { ItemDataTableComponent } from './item-data-table/item-data-table.component';
import { ItemModule } from '../../module/item/item.module';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  items!: ItemModule[];
  loading: boolean = true;
  display: boolean = false;
  selectedItem: ItemModule = new ItemModule();
  formName: string = '';

  @ViewChild(ItemDataTableComponent) ItemDataTable!: ItemDataTableComponent;

  constructor(private ds: DataService, private ts: ToastrService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.ds.getItems().subscribe(
      (res) => {
        this.items = res;
        this.ds.items = this.items;
        this.loading = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Items Error');
      }
    );
  }

  reloadUserTable() {
    this.loading = true;
    this.getItems();
    this.items = [];
    this.items = this.ds.items;

    if (this.items) {
      this.ItemDataTable.setupTable();
    } else {
      this.loading = false;
    }
  }

  getItem(barcode: string, formName: string) {
    this.ds.getItem(barcode).subscribe(
      (res) => {
        console.log(res);
        this.selectedItem = res;
        this.display = true;
        this.formName = formName;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error getting item');
      }
    );
  }

  onEditClick(barcode: string) {
    this.getItem(barcode, 'Edit Item');
  }

  onDeleteClick(barcode: string) {
    this.getItem(barcode, 'Delete Item');
  }

  onAddClick(add: boolean) {
    this.display = add;
    this.selectedItem = {
      barcode: '',
      name: '',
      description: '',
    };
    this.formName = 'Create Item';
  }

  onCreateSubmit(createdItem: ItemModule) {
    this.ds.createItem(createdItem).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('Item was creating', 'Created Item');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error creating item');
      }
    );
  }

  onUpdateSubmit(updateItem: ItemModule) {
    this.ds.updateItem(updateItem).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('Item was updated', 'updated Item');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error updaing item');
      }
    );
  }

  onDeleteSubmit(deletedBarcode: string) {
    this.ds.deleteItem(deletedBarcode).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('Item was deleted', 'Deleted Item');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error deleting item');
      }
    );
  }

  onCloseOverlay(display: boolean) {
    this.display = display;
  }
}
