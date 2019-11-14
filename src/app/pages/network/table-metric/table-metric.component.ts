import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { NetworkService } from '../../../@core/services/network.service';
import {
    AppDaterangePickerComponent,
    DateRange,
} from '../../../components/app-daterange-picker/app-daterange-picker.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'ngx-table-metric',
    styleUrls: ['./table-metric.component.scss'],
    templateUrl: './table-metric.component.html',
})
export class TableMetricComponent implements OnInit, OnChanges {

    public selectSizes: number[] = [25, 50, 100, 150, 250];

    public limitT: number = 25;
    public countItems: number = 0;
    public totalPages: number = 1;

    @Input() dateRange: DateRange;
    @Input() metric: string;

    public data: any = [];
    public options: any;

    private tableMessageLoadData: string = 'Loading data...';

    settings = {
        editable: false,
        hideSubHeader: true,
        mode: 'external',
        actions: false,
        noDataMessage: this.tableMessageLoadData,
        pager: {
            display: false,
            perPage: this.limitT,
        },
        columns: {
            network: {
                title: 'Network',
                type: 'string',
                filter: false,
                sort: false,
            },
            uni: {
                title: 'Unique IPS',
                filter: false,
            },
            views: {
                title: 'Video Views',
                filter: false,
            },
            imp: {
                title: 'Impressions',
                filter: false,
            },
            rev_ads: {
                title: 'Revenue ADS',
                filter: false,
            },
            rev_cpm: {
                title: 'Page View CPM',
                filter: false,
            },

        },
    };

    source: LocalDataSource;

    constructor(private _network: NetworkService) { }

    ngOnInit() {
        this.dateRange = AppDaterangePickerComponent.fromFirstDayMonth();
    }

    ngOnChanges() {
        this.updateTable();
    }

    updateTable() {
        this._network.getDataTableMetricLocal(this.prepareQuery()).subscribe(
            data => this.source = new LocalDataSource(data.data),
        );
    }

    prepareQuery(): object {
        const params = {};
        if (this.dateRange) {
            params['dateFrom'] = moment(this.dateRange.start).format('YYYY-MM-DD');
            params['dateTo'] = moment(this.dateRange.end).format('YYYY-MM-DD');
        }

        params['per_page'] = this.limitT;

        if (this.metric) {
            params['metric'] = this.metric;
        }

        return params;
    }

    onEventReset() {
        location.reload();
    }
}
