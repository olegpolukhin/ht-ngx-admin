import { Component, OnDestroy, OnInit } from '@angular/core';
import { NetworkService } from '../../@core/services/network.service';
import {
    AppDaterangePickerComponent,
    DateRange,
} from '../../components/app-daterange-picker/app-daterange-picker.component';
import * as moment from 'moment';

@Component({
    selector: 'ngx-network',
    styleUrls: ['./network.component.scss'],
    templateUrl: './network.component.html',
})
export class NetworkComponent implements OnInit, OnDestroy {

    public networksList: any = [];

    public metricsList: any = [
        'Uniques',
        'Impressions',
        'Views',
        'Revenue ADS',
    ];

    // by default: Uniques
    public metricSelected: string = 'Uniques';

    public dateRangeT: DateRange;

    public data: any = [];
    public options: any;

    public networksSelected: string = '';
    public networksDefault: string = 'ns1.hostedtube.com';

    constructor(private _network: NetworkService) { }

    ngOnInit() {
        this.dateRangeT = AppDaterangePickerComponent.fromFirstDayMonth();

        this._network.getCollectNetworks().subscribe(
            data => {
                const result = Object.keys(data.list).map(function (key) {
                    return data.list[key];
                });
                this.networksList = result;
            },
        );
    }

    clearNameNetwork(item: string): string {
        return item.replace('ns1.', '');
    }

    getFormateDate(date: Date): string {
        return moment(date).format('YYYY-MM-DD');
    }

    onEventReset() {
        // this.dateRangeT = AppDaterangePickerComponent.todayRange();
        // this.searchT = '';
        // this.networksSelected = '';
        // this.limitT = 25;
        // this.updateTable();
        location.reload();
    }

    ngOnDestroy() {
    }
}
