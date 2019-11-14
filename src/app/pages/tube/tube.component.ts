import { Component, OnDestroy, OnInit } from '@angular/core';
import { TubeService } from '../../@core/services/tube.service';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import {
    AppDaterangePickerComponent,
    DateRange,
} from '../../components/app-daterange-picker/app-daterange-picker.component';
import * as moment from 'moment';
import { AppServerDataSource } from '../../@core/data/app-server-data-source';

@Component({
    selector: 'ngx-tube',
    styleUrls: ['./tube.component.scss'],
    templateUrl: './tube.component.html',
})
export class TubeComponent implements OnDestroy, OnInit {

    public selectSizes: number[] = [
        25,
        50,
        100,
        150,
        250,
    ];

    public dateRangeT: DateRange;
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
        actions: {
            position: 'right',
            columnTitle: '',
            add: false,
            edit: true,
            delete: false,
        },
        edit: {
            editButtonContent: '<i class="fa fa-info-circle"></i>',
        },
        pager: {
            perPage: this.limitT,
        },
        columns: {
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
            reseller: {
                title: 'Reseller',
                type: 'string',
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
            imp: {
                title: 'Page Views',
                type: 'number',
                filter: false,
            },
            rev_ads: {
                title: 'Revenue ADS',
                type: 'number',
                filter: false,
            },
        },
    };

    source: AppServerDataSource;

    constructor(
        private dialogService: NbDialogService,
        private _tube: TubeService) { }

    ngOnInit() {
        this.dateRangeT = AppDaterangePickerComponent.fromFirstDayWeek();

        this.source = this._tube.getTubeTable();
        this.source.customRequestParams = this.prepareQuery();
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

    onEditRowSelect(event) {
        if (!event || !event.data) {
            console.error('onEditRowSelect: empty event');
            return;
        }

        this.dialogService.open(ShowcaseDialogComponent, {
            hasBackdrop: true,
            closeOnEsc: true,
            hasScroll: false,
            autoFocus: true,
            context: {
                titleDig: 'Tube info. ID ' + event.data.tube_id,
                dataDig: event.data,
                dateRange: this.dateRangeT,
            },
        });
    }

    ngOnDestroy() { }
}
