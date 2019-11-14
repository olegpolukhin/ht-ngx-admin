import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AppServerDataSource } from '../../../@core/data/app-server-data-source';
import { NetworkService } from '../../../@core/services/network.service';
import {
    AppDaterangePickerComponent,
    DateRange,
} from '../../../components/app-daterange-picker/app-daterange-picker.component';
import * as moment from 'moment';

@Component({
    selector: 'ngx-table-base',
    styleUrls: ['./table-base.component.scss'],
    templateUrl: './table-base.component.html',
})
export class TableBaseComponent implements OnInit, OnChanges {

    public selectSizes: number[] = [25, 50, 100, 150, 250];

    public limitT: number = 25;
    public countItems: number = 0;
    public totalPages: number = 1;
    public searchT: string = '';

    @Input() dateRange: DateRange;
    @Input() network: string;

    public data: any = [];
    public options: any;

    private tableMessageLoadData: string = 'Loading data...';

    private initialized = false;

    settings = {
        editable: false,
        hideSubHeader: true,
        mode: 'external',
        actions: false,
        noDataMessage: this.tableMessageLoadData,
        pager: {
            perPage: this.limitT,
        },
        columns: {
            date: {
                title: 'Date',
                type: 'string',
                filter: false,
            },
            domain: {
                title: 'Domain',
                type: 'string',
                filter: false,
            },
            imp: {
                title: 'Impressions',
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

    constructor(private _network: NetworkService) { }

    ngOnInit() {
        this.dateRange = AppDaterangePickerComponent.fromFirstDayMonth();
        this.initialized = true;
        this.updateTable();
    }

    ngOnChanges() {
        if (this.initialized) {
            this.updateTable();
        }
    }

    updateTable() {
        this.source = this._network.getDataTable();
        this.source.customRequestParams = this.prepareQuery();
    }

    prepareQuery(): object {
        const params = {};
        if (this.dateRange) {
            params['dateFrom'] = moment(this.dateRange.start).format('YYYY-MM-DD');
            params['dateTo'] = moment(this.dateRange.end).format('YYYY-MM-DD');
        }

        params['per_page'] = this.limitT;

        if (this.searchT) {
            params['search'] = this.searchT;
        }

        if (this.network) {
            params['network'] = this.network;
        }

        return params;
    }

    onEventReset() {
        location.reload();
    }
}
