import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AppServerDataSource } from '../../../@core/data/app-server-data-source';
import { TemplatesService } from '../../../@core/services';
import {
    AppDaterangePickerComponent,
    DateRange,
} from '../../../components/app-daterange-picker/app-daterange-picker.component';
import * as moment from 'moment';

@Component({
    selector: 'ngx-table-basic',
    styleUrls: ['./table-basic.component.scss'],
    templateUrl: './table-basic.component.html',
})
export class TableBasicComponent implements OnInit, OnChanges {

    public selectSizes: number[] = [25, 50, 100, 150, 250];

    public templatesSelect = [];
    public defaultTemplate: string = 'T02';

    public searchT: string = '';
    public limitT: number = 25;
    public countItems: number = 0;
    public totalPages: number = 1;

    @Input() dateRange: DateRange;
    @Input() template: string;

    public data: any = [];
    public options: any;

    private tableMessageLoadData: string = 'Loading data...';

    private initialized = false;

    settings = {
        editable: false,
        hideSubHeader: true,
        noDataMessage: this.tableMessageLoadData,
        shouldShow: true,
        attr: {
            class: 'table table-hover table-responsive',
        },
        mode: 'external',
        actions: false,
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
            status: {
                title: 'Status',
                type: 'string',
                filter: false,
                sort: false,
            },
            template_dev: {
                title: 'Template Dev',
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
            template_m_dev: {
                title: 'Template Mob Dev',
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

    constructor(private _template: TemplatesService) { }

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
        this.source = this._template.getDataTable();
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
        if (this.template) {
            params['templates'] = this.template;
        }
        return params;
    }

    onEventReset() {
        location.reload();
    }
}
