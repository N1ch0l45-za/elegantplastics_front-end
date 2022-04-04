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
import { DeliveryModule } from '../../../module/delivery/delivery.module';
import { DataService } from '../../../service/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delivery-data-table',
  templateUrl: './delivery-data-table.component.html',
  styleUrls: ['./delivery-data-table.component.css'],
})
export class DeliveryDataTableComponent implements OnInit {
  @Input() public deliveries!: DeliveryModule[];
  dataSource!: MatTableDataSource<DeliveryModule>;
  displayedColumns: string[] = [
    'id',
    'client',
    'location',
    'reference',
    'invoice',
    'status',
    'print',
    'edit',
    'delete',
  ];
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() add = new EventEmitter<boolean>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private ds: DataService,
    private rt: Router,
    private ts: ToastrService
  ) {}

  ngOnInit(): void {
    this.setupTable();
  }

  setupTable() {
    this.dataSource = new MatTableDataSource<DeliveryModule>(this.deliveries);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getLocation(id: number): string {
    let location: string = '';
    this.ds.allClientLocations.forEach((x) => {
      if (x.id === id) {
        location = x.address;
      }
    });

    return location;
  }

  getClient(id: number): string {
    let client: string = '';
    this.ds.clients.forEach((x) => {
      if (x.id === id) {
        client = x.name;
      }
    });

    return client;
  }

  deleteDelivery(id: number) {
    this.delete.emit(id);
  }

  editDelivery(id: number) {
    this.edit.emit(id);
  }

  addDelivery(add: boolean) {
    this.add.emit(add);
  }

  printDelivery(id: number) {
    this.ds.getDelivery(id).subscribe(
      (res) => {
        this.ds.delivery = res;
      },
      (err) => {
        this.ts.error(err.error.message, 'Delivery Error');
      }
    );

    this.ds.getDeliveryItems(id).subscribe(
      (res) => {
        this.ds.deliveryItems = res;
        this.rt.navigateByUrl(`print/${id}`);
      },
      (err) => {
        this.ts.error(err.error.message, 'Delivery items Error');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
