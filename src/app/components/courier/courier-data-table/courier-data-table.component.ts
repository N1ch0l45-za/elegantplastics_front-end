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
import { ItemModule } from '../../../module/item/item.module';
import { CourierModule } from '../../../module/courier/courier.module';

@Component({
  selector: 'app-courier-data-table',
  templateUrl: './courier-data-table.component.html',
  styleUrls: ['./courier-data-table.component.css'],
})
export class CourierDataTableComponent implements OnInit {
  @Input() public couriers!: CourierModule[];
  dataSource!: MatTableDataSource<CourierModule>;
  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() add = new EventEmitter<boolean>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.setupTable();
  }

  setupTable() {
    this.dataSource = new MatTableDataSource<CourierModule>(this.couriers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteCourier(id: number) {
    this.delete.emit(id);
  }

  editCourier(id: number) {
    this.edit.emit(id);
  }

  addCourier(add: boolean) {
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
