import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppServerDataSource } from '../../@core/data/app-server-data-source';
import { TrafficService } from '../../@core/services/traffic.service';
import {
  AppDaterangePickerComponent,
  DateRange,
} from '../../components/app-daterange-picker/app-daterange-picker.component';
import * as moment from 'moment';

@Component({
  selector: 'ngx-traffic',
  styleUrls: ['./traffic.component.scss'],
  templateUrl: './traffic.component.html',
})
export class TrafficComponent implements OnInit, OnDestroy {

  public selectSizes: number[] = [25, 50, 100, 150, 250];

  public limitT: number = 25;
  public countItems: number = 0;
  public totalPages: number = 1;
  public searchT: string = '';

  public dateRangeT: DateRange;

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
      date: {
        title: 'Date',
        type: 'string',
        filter: false,
      },
      tube_id: {
        title: 'Tube ID',
        type: 'number',
        filter: false,
      },
      domain: {
        title: 'Domain',
        type: 'string',
        filter: false,
      },
      imp: {
        title: 'Page Views',
        type: 'number',
        filter: false,
      },
      uni: {
        title: 'Unique IPS',
        type: 'number',
        filter: false,
      },
      views: {
        title: 'Video Views',
        type: 'number',
        filter: false,
      },
      network: {
        title: 'Network',
        type: 'string',
        filter: false,
        sort: false,
      },
      ip: {
        title: 'IP',
        type: 'string',
        filter: false,
        sort: false,
      },
      template_live: {
        title: 'Template LIVE',
        type: 'string',
        filter: false,
        sort: false,
      },
      template_m_live: {
        title: 'Template Mob LIVE',
        type: 'string',
        filter: false,
        sort: false,
      },
    },
  };

  source: AppServerDataSource;

  constructor(private _traffic: TrafficService) {
    this.source = this._traffic.getDataTable();
    this.source.customRequestParams = this.prepareQuery();
  }

  ngOnInit() {
    this.dateRangeT = AppDaterangePickerComponent.fromFirstDayMonth();
  }

  updateTable() {
    this.source.customRequestParams = this.prepareQuery();
    this.source.load([]);
  }

  prepareQuery(): object {
    const params = {};
    if (this.dateRangeT) {
      params['dateFrom'] = moment(this.dateRangeT.start).format('YYYY-MM-DD');
      params['dateTo'] = moment(this.dateRangeT.end).format('YYYY-MM-DD');
    }

    params['per_page'] = this.limitT;

    if (this.searchT) {
      params['search'] = this.searchT;
    }

    return params;
  }

  onEventReset() {
    this.dateRangeT = AppDaterangePickerComponent.todayRange();
    this.searchT = '';
    this.updateTable();
  }

  ngOnDestroy() { }
}
