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
import { ClientModule } from 'src/app/module/client/client.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-data-table',
  templateUrl: './client-data-table.component.html',
  styleUrls: ['./client-data-table.component.css'],
})
export class ClientDataTableComponent implements OnInit {
  @Input() public clients!: ClientModule[];
  dataSource!: MatTableDataSource<ClientModule>;
  displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'location',
    'edit',
    'delete',
  ];
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
    this.dataSource = new MatTableDataSource<ClientModule>(this.clients);
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

  ClientLocations(id: number) {
    this.rt.navigateByUrl(`/client/${id}`);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
