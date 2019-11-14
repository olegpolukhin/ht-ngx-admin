import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppServerDataSource } from '../../@core/data/app-server-data-source';
import { UserService } from '../../@core/services/user.service';

@Component({
  selector: 'ngx-users',
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {

  public selectSizes: number[] = [
    25,
    50,
    100,
    150,
    250,
  ];

  public limitT: number = 25;
  public countItems: number = 0;
  public totalPages: number = 1;
  public searchT: string = '';

  public data: any = [];
  public options: any;

  settings = {
    editable: false,
    hideSubHeader: true,
    noDataMessage: 'Loading data...',
    mode: 'external',
    actions: false,
    pager: {
      perPage: this.limitT,
    },
    columns: {
      user_id: {
        title: 'User ID',
        type: 'number',
        filter: false,
      },
      username: {
        title: 'Username',
        type: 'string',
        filter: false,
      },
      country: {
        title: 'Country',
        type: 'string',
        filter: false,
      },
      date_created: {
        title: 'Date Created',
        type: 'string',
        filter: false,
      },
      date_last_activity: {
        title: 'Last activity',
        type: 'string',
        filter: false,
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: false,
      },
    },
  };

  source: AppServerDataSource;

  constructor(
    private _user: UserService) {
  }

  ngOnInit() {
    this.source = this._user.getAll();
    this.source.customRequestParams = this.prepareQuery();
  }

  updateTable() {
    this.source.customRequestParams = this.prepareQuery();
    this.source.load([]);
  }

  prepareQuery(): object {
    const params = {};

    params['per_page'] = this.limitT;

    if (this.searchT) {
      params['search'] = this.searchT;
    }

    return params;
  }

  onEventReset() {
    this.searchT = '';
    this.updateTable();
  }

  ngOnDestroy() {
  }
}
