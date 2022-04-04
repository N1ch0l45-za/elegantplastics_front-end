import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ToastrService } from 'ngx-toastr';
import {
  UserResponseModule,
  UserModule,
  UserRequestModule,
} from '../../module/user/user.module';
import { UserDataTableComponent } from './user-data-table/user-data-table.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: UserResponseModule[] = [];
  loading: boolean = true;
  display: boolean = false;
  selectedUser: UserModule = new UserModule();
  formName: string = '';

  @ViewChild(UserDataTableComponent) UserDataTable!: UserDataTableComponent;

  constructor(private ds: DataService, private ts: ToastrService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.ds.getUsers().subscribe(
      (res) => {
        this.users = res;
        this.ds.users = res;
        this.loading = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Users Error');
      }
    );
  }

  reloadUserTable() {
    this.loading = true;
    this.getUsers();
    this.users = [];
    this.users = this.ds.users;

    if (this.users) {
      this.UserDataTable.setupTable();
    } else {
      this.loading = false;
    }
  }

  getUser(id: number, formName: string) {
    this.ds.getUser(id).subscribe(
      (res) => {
        this.selectedUser = res;
        this.display = true;
        this.formName = formName;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error getting user');
      }
    );
  }

  onEditClick(id: number) {
    this.getUser(id, 'Edit User');
  }

  onDeleteClick(id: number) {
    this.getUser(id, 'Delete User');
  }

  onAddClick(add: boolean) {
    this.display = add;
    this.selectedUser = {
      id: 0,
      name: '',
      password: '',
      role: '',
      email: '',
    };
    this.formName = 'Create User';
  }

  onCreateSubmit(createdUser: UserRequestModule) {
    this.ds.createUser(createdUser).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('User was creating', 'Created User');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error creating user');
      }
    );
  }

  onUpdateSubmit(updateUser: UserModule) {
    this.ds.updateUser(updateUser).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('User was updated', 'updated User');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error updaing user');
      }
    );
  }

  onDeleteSubmit(deletedId: number) {
    this.ds.deleteUser(deletedId).subscribe(
      (res) => {
        this.reloadUserTable();
        this.ts.success('User was deleted', 'Deleted User');
        this.display = false;
      },
      (err) => {
        this.ts.error(err.error.message, 'Error deleting user');
      }
    );
  }

  onCloseOverlay(display: boolean) {
    this.display = display;
  }
}
