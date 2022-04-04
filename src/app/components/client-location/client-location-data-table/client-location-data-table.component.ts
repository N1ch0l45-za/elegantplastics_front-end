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
import { Router } from '@angular/router';
import { ClientLocationModule } from '../../../module/client-location/client-location.module';

@Component({
  selector: 'app-client-location-data-table',
  templateUrl: './client-location-data-table.component.html',
  styleUrls: ['./client-location-data-table.component.css'],
})
export class ClientLocationDataTableComponent implements OnInit {
  @Input() public clientLocations!: ClientLocationModule[];
  dataSource!: MatTableDataSource<ClientLocationModule>;
  displayedColumns: string[] = ['id', 'address', 'edit', 'delete'];
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() add = new EventEmitter<boolean>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private rt: Router) {}

  ngOnInit(): void {
    this.setupTable();
  }

  setupTable() {
    this.dataSource = new MatTableDataSource<ClientLocationModule>(
      this.clientLocations
    );
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
