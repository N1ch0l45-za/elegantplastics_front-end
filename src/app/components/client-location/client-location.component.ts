import { ClientLocationDataTableComponent } from './client-location-data-table/client-location-data-table.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ToastrService } from 'ngx-toastr';
import {
  ClientModule,
  ClientRequestModule,
} from '../../module/client/client.module';
import { Router } from '@angular/router';
import {
  ClientLocationModule,
  ClientLocationRequestModule,
} from '../../module/client-location/client-location.module';

@Component({
  selector: 'app-client-location',
  templateUrl: './client-location.component.html',
  styleUrls: ['./client-location.component.css'],
})
export class ClientLocationComponent implements OnInit {
  clientLocations!: ClientLocationModule[];
  loading: boolean = true;
  display: boolean = false;
  selectedClientLocation: ClientLocationModule = new ClientLocationModule();
  createClientLocation: ClientLocationRequestModule =
    new ClientLocationRequestModule();
  formName: string = '';
  clientId!: number;

  @ViewChild(ClientLocationDataTableComponent)
  ClientLocationDataTable!: ClientLocationDataTableComponent;

  constructor(
    private ds: DataService,
    private ts: ToastrService,
    private rt: Router
  ) {}

  ngOnInit(): void {
    this.clientId = Number(
      this.rt.url.split('/')[this.rt.url.split('/').length - 1]
    );

    this.getClientLocatons(this.clientId);
  }

  getClientLocatons(id: number) {
    this.ds.getClientLocations(id).subscribe(
      (res) => {
        this.clientLocations = res;
        this.ds.clientLocations = this.clientLocations;
        this.loading = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Client Locations Error');
      }
    );
  }

  reloadClientLocationsTable() {
    this.loading = true;
    this.getClientLocatons(this.clientId);
    this.clientLocations = [];
    this.clientLocations = this.ds.clientLocations;

    if (this.clientLocations) {
      this.ClientLocationDataTable.setupTable();
    } else {
      this.loading = false;
    }
  }

  getClientLocation(id: number, formName: string) {
    this.ds.getClientLocation(id).subscribe(
      (res) => {
        this.selectedClientLocation = res;
        this.display = true;
        this.formName = formName;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error getting client Location');
      }
    );
  }

  onEditClick(id: number) {
    this.getClientLocation(id, 'Edit Client Location');
  }

  onDeleteClick(id: number) {
    this.getClientLocation(id, 'Delete Client Location');
  }

  onAddClick(add: boolean) {
    this.display = add;
    this.selectedClientLocation = {
      id: 0,
      client_id: this.clientId,
      address: '',
    };
    this.formName = 'Create Client Location';
  }

  onCreateSubmit(createdClientLocation: ClientLocationRequestModule) {
    this.ds.createClientLocation(createdClientLocation).subscribe(
      (res) => {
        this.reloadClientLocationsTable();
        this.ts.success(
          'Client location was creating',
          'Created Client Location'
        );
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error creating client location');
      }
    );
  }

  onUpdateSubmit(updateClientLocation: ClientLocationModule) {
    this.ds.updateClientLocation(updateClientLocation).subscribe(
      (res) => {
        this.reloadClientLocationsTable();
        this.ts.success(
          'Client Location was updated',
          'updated Client Location'
        );
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error updaing client location');
      }
    );
  }

  onDeleteSubmit(deletedId: number) {
    this.ds.deleteClient(deletedId).subscribe(
      (res) => {
        this.reloadClientLocationsTable();
        this.ts.success(
          'Client Location was deleted',
          'Deleted Client Location'
        );
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error deleting client location');
      }
    );
  }

  onCloseOverlay(display: boolean) {
    this.display = display;
  }
}
