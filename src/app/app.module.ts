import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './service/data.service';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './service/auth.service';
import { ClientComponent } from './components/client/client.component';
import { CourierComponent } from './components/courier/courier.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { ItemComponent } from './components/item/item.component';
import { PrintComponent } from './page/print/print.component';
import { UserComponent } from './components/user/user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserDataTableComponent } from './components/user/user-data-table/user-data-table.component';
import { ItemDataTableComponent } from './components/item/item-data-table/item-data-table.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { ItemFormComponent } from './components/item/item-form/item-form.component';
import { CourierFormComponent } from './components/courier/courier-form/courier-form.component';
import { CourierDataTableComponent } from './components/courier/courier-data-table/courier-data-table.component';
import { ClientLocationComponent } from './components/client-location/client-location.component';
import { ClientLocationDataTableComponent } from './components/client-location/client-location-data-table/client-location-data-table.component';
import { ClientLocationFormComponent } from './components/client-location/client-location-form/client-location-form.component';
import { ClientFormComponent } from './components/client/client-form/client-form.component';
import { ClientDataTableComponent } from './components/client/client-data-table/client-data-table.component';
import { DeliveryDataTableComponent } from './components/delivery/delivery-data-table/delivery-data-table.component';
import { DeliveryFormComponent } from './components/delivery/delivery-form/delivery-form.component';
import { DeliveryItemComponent } from './components/delivery-item/delivery-item.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ClientComponent,
    CourierComponent,
    DeliveryComponent,
    ItemComponent,
    PrintComponent,
    UserComponent,
    UserDataTableComponent,
    ItemDataTableComponent,
    UserFormComponent,
    ItemFormComponent,
    CourierFormComponent,
    CourierDataTableComponent,
    ClientLocationComponent,
    ClientLocationDataTableComponent,
    ClientLocationFormComponent,
    ClientFormComponent,
    ClientDataTableComponent,
    DeliveryDataTableComponent,
    DeliveryFormComponent,
    DeliveryItemComponent,
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
