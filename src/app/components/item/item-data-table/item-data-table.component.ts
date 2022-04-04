import {
  Component,
  ViewChild,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserResponseModule } from '../../../module/user/user.module';
import { ItemModule } from '../../../module/item/item.module';

@Component({
  selector: 'app-item-data-table',
  templateUrl: './item-data-table.component.html',
  styleUrls: ['./item-data-table.component.css'],
})
export class ItemDataTableComponent implements OnInit {
  @Input() public items!: ItemModule[];
  dataSource!: MatTableDataSource<ItemModule>;
  displayedColumns: string[] = [
    'barcode',
    'name',
    'description',
    'edit',
    'delete',
  ];
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() add = new EventEmitter<boolean>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.setupTable();
  }

  setupTable() {
    this.dataSource = new MatTableDataSource<ItemModule>(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteItem(barcode: string) {
    this.delete.emit(barcode);
  }

  editItem(barcode: string) {
    this.edit.emit(barcode);
  }

  addItem(add: boolean) {
    this.add.emit(add);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
