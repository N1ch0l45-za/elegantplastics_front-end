import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { AuthService } from './service/auth.service';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ClientComponent } from './components/client/client.component';
import { CourierComponent } from './components/courier/courier.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { ItemComponent } from './components/item/item.component';
import { UserComponent } from './components/user/user.component';
import { ClientLocationComponent } from './components/client-location/client-location.component';
import { PrintComponent } from './page/print/print.component';
import { DeliveryItemComponent } from './components/delivery-item/delivery-item.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'client', component: ClientComponent, pathMatch: 'full' },
      {
        path: 'client/:id',
        component: ClientLocationComponent,
        pathMatch: 'full',
      },
      { path: 'courier', component: CourierComponent, pathMatch: 'full' },
      { path: 'delivery', component: DeliveryComponent, pathMatch: 'full' },
      { path: 'item', component: ItemComponent, pathMatch: 'full' },
      { path: 'user', component: UserComponent, pathMatch: 'full' },
      {
        path: 'delivery/:id/items',
        component: DeliveryItemComponent,
        pathMatch: 'full',
      },
    ],
    canActivate: [AuthService],
  },
  { path: 'print/:id', component: PrintComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
