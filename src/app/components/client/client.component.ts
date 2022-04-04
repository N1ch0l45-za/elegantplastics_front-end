import { ClientDataTableComponent } from './client-data-table/client-data-table.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ToastrService } from 'ngx-toastr';
import {
  ClientModule,
  ClientRequestModule,
} from '../../module/client/client.module';
import { CourierRequestModule } from '../../module/courier/courier.module';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clients!: ClientModule[];
  loading: boolean = true;
  display: boolean = false;
  selectedClient: ClientModule = new ClientModule();
  createClient: ClientRequestModule = new ClientRequestModule();
  formName: string = '';

  @ViewChild(ClientDataTableComponent)
  ClientDataTable!: ClientDataTableComponent;

  constructor(private ds: DataService, private ts: ToastrService) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.ds.getClients().subscribe(
      (res) => {
        this.clients = res;
        this.ds.clients = this.clients;
        this.loading = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Clients Error');
      }
    );
  }

  reloadUserTable() {
    this.loading = true;
    this.getClients();
    this.clients = [];
    this.clients = this.ds.clients;

    if (this.clients) {
      this.ClientDataTable.setupTable();
    } else {
      this.loading = false;
    }
  }

  getClient(id: number, formName: string) {
    this.ds.getClient(id).subscribe(
      (res) => {
        this.selectedClient = res;
        this.display = true;
        this.formName = formName;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error getting client');
      }
    );
  }

  onEditClick(id: number) {
    this.getClient(id, 'Edit Client');
  }

  onDeleteClick(id: number) {
    this.getClient(id, 'Delete Client');
  }

  onAddClick(add: boolean) {
    this.display = add;
    this.selectedClient = {
      id: 0,
      name: '',
      address: '',
    };
    this.formName = 'Create Client';
  }

  onCreateSubmit(createdClient: ClientRequestModule) {
    this.ds.createClient(createdClient).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('Client was creating', 'Created Client');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error creating client');
      }
    );
  }

  onUpdateSubmit(updateClient: ClientModule) {
    this.ds.updateClient(updateClient).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('Client was updated', 'updated Client');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error updaing client');
      }
    );
  }

  onDeleteSubmit(deletedId: number) {
    this.ds.deleteClient(deletedId).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('Client was deleted', 'Deleted Client');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error deleting client');
      }
    );
  }

  onCloseOverlay(display: boolean) {
    this.display = display;
  }
}
