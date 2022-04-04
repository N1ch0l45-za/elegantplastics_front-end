import { UserResponseModule, UserModule } from './../module/user/user.module';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { UserRequestModule } from '../module/user/user.module';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ItemModule } from '../module/item/item.module';
import {
  DeliveryItemModule,
  DeliveryItemRequestModule,
} from '../module/delivery-item/delivery-item.module';
import {
  DeliveryModule,
  DeliveryRequestModule,
} from '../module/delivery/delivery.module';
import {
  ClientLocationModule,
  ClientLocationRequestModule,
} from '../module/client-location/client-location.module';
import {
  ClientModule,
  ClientRequestModule,
} from '../module/client/client.module';
import {
  CourierModule,
  CourierRequestModule,
} from '../module/courier/courier.module';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private cs: CookieService) {}

  Token: string = '';
  decodedToken: { [key: string]: string } = {};
  Role: string = '';
  url: string = 'http://localhost:3005/api';
  users!: UserResponseModule[];
  items!: ItemModule[];
  deliveries!: DeliveryModule[];
  couriers!: CourierModule[];
  clients!: ClientModule[];
  clientLocations!: ClientLocationModule[];
  allClientLocations!: ClientLocationModule[];
  delivery!: DeliveryModule;
  deliveryItems!: DeliveryItemModule[];

  GetToken(
    email: string,
    password: string
  ): Observable<{ token: string; userId: number; role: string }> {
    return this.http.post<{ token: string; userId: number; role: string }>(
      `${this.url}/auth/login`,
      {
        email,
        password,
      }
    );
  }

  decodeToken() {
    if (!this.Token) {
      this.Token = this.cs.get('ep_delivery_cookie');
      this.decodedToken = jwt_decode(this.Token);
    } else {
      this.decodedToken = jwt_decode(this.Token);
    }
  }

  getDecodeToken() {
    return jwt_decode(this.Token);
  }

  getUserId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['userId'] : null;
  }

  getRole() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['role'] : null;
  }

  getEmail() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['email'] : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: any = this.getExpiryTime();
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }

  getUsers(): Observable<[UserResponseModule]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<[UserResponseModule]>(`${this.url}/user`, {
      headers: headers,
    });
  }

  getUser(id: number): Observable<UserModule> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<UserModule>(`${this.url}/user/${id}`, {
      headers: headers,
    });
  }

  createUser(user: UserRequestModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.post<any>(
      `${this.url}/auth/signup`,
      {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
      {
        headers: headers,
      }
    );
  }

  updateUser(user: UserModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.put<any>(
      `${this.url}/user/${user.id}`,
      {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
      {
        headers: headers,
      }
    );
  }

  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.delete<any>(`${this.url}/user/${id}`, {
      headers: headers,
    });
  }

  getItems(): Observable<[ItemModule]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<[ItemModule]>(`${this.url}/item`, {
      headers: headers,
    });
  }

  getItem(barcode: string): Observable<ItemModule> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<ItemModule>(`${this.url}/item/${barcode}`, {
      headers: headers,
    });
  }

  createItem(item: ItemModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.post<any>(
      `${this.url}/item`,
      {
        barcode: item.barcode,
        name: item.name,
        description: item.description,
      },
      {
        headers: headers,
      }
    );
  }

  updateItem(item: ItemModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.put<any>(
      `${this.url}/item/${item.barcode}`,
      {
        name: item.name,
        description: item.description,
      },
      {
        headers: headers,
      }
    );
  }

  deleteItem(barcode: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.delete<any>(`${this.url}/item/${barcode}`, {
      headers: headers,
    });
  }

  getCouriers(): Observable<[CourierModule]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<[CourierModule]>(`${this.url}/courier`, {
      headers: headers,
    });
  }

  getCourier(id: number): Observable<CourierModule> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<CourierModule>(`${this.url}/courier/${id}`, {
      headers: headers,
    });
  }

  createCourier(courier: CourierRequestModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.post<CourierRequestModule>(
      `${this.url}/courier`,
      {
        name: courier.name,
      },
      {
        headers: headers,
      }
    );
  }

  updateCourier(courier: CourierModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.put<any>(
      `${this.url}/courier/${courier.id}`,
      {
        name: courier.name,
      },
      {
        headers: headers,
      }
    );
  }

  deleteCourier(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.delete<any>(`${this.url}/courier/${id}`, {
      headers: headers,
    });
  }

  getClients(): Observable<[ClientModule]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<[ClientModule]>(`${this.url}/client`, {
      headers: headers,
    });
  }

  getClient(id: number): Observable<ClientModule> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<ClientModule>(`${this.url}/client/${id}`, {
      headers: headers,
    });
  }

  createClient(client: ClientRequestModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.post<ClientRequestModule>(
      `${this.url}/client`,
      {
        name: client.name,
        address: client.address,
      },
      {
        headers: headers,
      }
    );
  }

  updateClient(client: ClientModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.put<any>(
      `${this.url}/client/${client.id}`,
      {
        name: client.name,
        address: client.address,
      },
      {
        headers: headers,
      }
    );
  }

  deleteClient(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.delete<any>(`${this.url}/client/${id}`, {
      headers: headers,
    });
  }

  getAllClientLocations(): Observable<[ClientLocationModule]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<[ClientLocationModule]>(`${this.url}/clientlocation`, {
      headers: headers,
    });
  }

  getClientLocations(client_id: number): Observable<[ClientLocationModule]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<[ClientLocationModule]>(
      `${this.url}/clientlocation/${client_id}`,
      {
        headers: headers,
      }
    );
  }

  getClientLocation(id: number): Observable<ClientLocationModule> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<ClientLocationModule>(
      `${this.url}/clientlocation/single/${id}`,
      {
        headers: headers,
      }
    );
  }

  createClientLocation(
    clientLocation: ClientLocationRequestModule
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.post<ClientLocationRequestModule>(
      `${this.url}/clientlocation`,
      {
        address: clientLocation.address,
        client_id: clientLocation.client_id,
      },
      {
        headers: headers,
      }
    );
  }

  updateClientLocation(clientLocation: ClientLocationModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.put<any>(
      `${this.url}/clientlocation/${clientLocation.id}`,
      {
        client_id: clientLocation.client_id,
        address: clientLocation.address,
      },
      {
        headers: headers,
      }
    );
  }

  deleteClientLocation(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.delete<any>(`${this.url}/clientlocation/${id}`, {
      headers: headers,
    });
  }

  getDeliveries(): Observable<[DeliveryModule]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<[DeliveryModule]>(`${this.url}/delivery`, {
      headers: headers,
    });
  }

  getDelivery(id: number): Observable<DeliveryModule> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<DeliveryModule>(`${this.url}/delivery/${id}`, {
      headers: headers,
    });
  }

  createDelivery(delivery: DeliveryRequestModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.post<DeliveryRequestModule>(
      `${this.url}/delivery`,
      {
        client_id: delivery.client_id,
        client_location_id: delivery.client_location_id,
        courier_id: delivery.courier_id,
        packing_date: delivery.packing_date,
        reference_num: delivery.reference_num,
        del_type: delivery.del_type,
        collection_date: delivery.collection_date,
        invoice_number: delivery.invoice_number,
        status: delivery.status,
      },
      {
        headers: headers,
      }
    );
  }

  updateDelivery(delivery: DeliveryModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.put<any>(
      `${this.url}/delivery/${delivery.id}`,
      {
        client_id: delivery.client_id,
        client_location_id: delivery.client_location_id,
        courier_id: delivery.courier_id,
        packing_date: delivery.packing_date,
        reference_num: delivery.reference_num,
        del_type: delivery.del_type,
        collection_date: delivery.collection_date,
        invoice_number: delivery.invoice_number,
        status: delivery.status,
      },
      {
        headers: headers,
      }
    );
  }

  deleteDelivery(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.delete<any>(`${this.url}/delivery/${id}`, {
      headers: headers,
    });
  }

  getDeliveryItems(id: number): Observable<[DeliveryItemModule]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.get<[DeliveryItemModule]>(
      `${this.url}/deliveryitem/${id}`,
      {
        headers: headers,
      }
    );
  }

  deleteDeliveryItem(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.delete<any>(`${this.url}/deliveryitem/${id}`, {
      headers: headers,
    });
  }

  createDeliveryItem(deliveryItem: DeliveryItemRequestModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.post<DeliveryItemRequestModule>(
      `${this.url}/deliveryitem`,
      {
        delivery_id: deliveryItem.delivery_id,
        item_barcode: deliveryItem.item_barcode,
        quantity: deliveryItem.quantity,
      },
      {
        headers: headers,
      }
    );
  }

  updateDeliveryItem(deliveryItem: DeliveryItemModule): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
    });

    return this.http.put<DeliveryItemModule>(
      `${this.url}/deliveryitem/${deliveryItem.id}`,
      {
        delivery_id: deliveryItem.delivery_id,
        item_barcode: deliveryItem.item_barcode,
        quantity: deliveryItem.quantity,
      },
      {
        headers: headers,
      }
    );
  }
}
