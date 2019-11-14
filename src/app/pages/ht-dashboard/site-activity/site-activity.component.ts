import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PlatformStatsService } from '../../../@core/services/platform-stats.service';
import { AppServerDataSource } from '../../../@core/data/app-server-data-source';
import { DateRange } from '../../../components/app-daterange-picker/app-daterange-picker.component';
import * as moment from 'moment';

@Component({
    selector: 'ngx-site-activity',
    templateUrl: './site-activity.component.html',
    styleUrls: ['./site-activity.component.scss'],
})
export class SiteActivityComponent implements OnInit, OnChanges {
    @Input() dateRange: DateRange;

    settings = {
        editable: false,
        hideSubHeader: true,
        noDataMessage: 'Loading data...',
        mode: 'external',
        actions: {
            position: 'right',
            columnTitle: '',
            add: false,
            edit: false,
            delete: false,
        },
        edit: {
            editButtonContent: '<i class="fa fa-info-circle"></i>',
        },
        pager: {
            perPage: 25,
        },
        columns: {
            domain: {
                title: 'Domain',
                type: 'string',
                filter: false,
            },
            siteId: {
                title: 'Tube ID',
                type: 'number',
                filter: false,
            },
            unique: {
                title: 'Unique',
                type: 'number',
                filter: false,
                sort: true,
                sortDirection: 'desc',
            },
        },
    };

    source: AppServerDataSource;

    constructor(private platformStatsService: PlatformStatsService) {
        this.source = this.platformStatsService.getSitesActivitySource();
        this.source.customRequestParams = this.prepareQuery();
    }

    ngOnInit() { }

    updateTable() {
        this.source.customRequestParams = this.prepareQuery();
        this.source.load([]);
    }

    ngOnChanges(): void {
        this.updateTable();
    }

    prepareQuery(): object {
        const params = {};
        if (this.dateRange) {
            params['from'] = moment(this.dateRange.start).format('YYYY-MM-DD');
            params['to'] = moment(this.dateRange.end).format('YYYY-MM-DD');
        }

        return params;
    }

}
