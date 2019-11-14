import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NbColorHelper } from '@nebular/theme';
import { NetworkService } from '../../../@core/services';
import { ParamNetwork } from '../../../@core/data/network';
import { DateRange } from '../../../components/app-daterange-picker/app-daterange-picker.component';
import forIn from 'lodash/forIn';
import isArray from 'lodash/isArray';

@Component({
    selector: 'ngx-chartbase',
    templateUrl: 'chartbase.component.html',
    styleUrls: ['chartbase.component.scss'],
})
export class ChartbaseComponent implements OnInit, OnChanges {

    public options: any;
    public themeSubscription: any;
    public data: any = [];

    public showError = false;

    @Input() dateRange: DateRange;
    @Input() network: string;

    constructor(private _network: NetworkService) { }

    ngOnInit() { }

    ngOnChanges() {
        const reqTubeInfo: ParamNetwork = {
            DateRange: this.dateRange,
            Network: this.network,
        };

        this._network.getTubeInfo(reqTubeInfo).subscribe(
            (data) => {
                if (!data) {
                    this.showError = true;
                }
                this.stockTubeInfo(data);
            },
            (error) => this.showError = true,
        );

    }

    private stockTubeInfo(stockTubeInfo: any) {

        const colors = {
            uni: { backgroundColor: NbColorHelper.hexToRgbA('#ff6b83', 0.3), colorBorder: '#ff6b83' },
            imp: { backgroundColor: NbColorHelper.hexToRgbA('#ba7fec', 0.3), colorBorder: '#ba7fec' },
            vid: { backgroundColor: NbColorHelper.hexToRgbA('#73a1ff', 0.3), colorBorder: '#73a1ff' },
            ads: { backgroundColor: NbColorHelper.hexToRgbA('#5dcfe3', 0.3), colorBorder: '#5dcfe3' },
        };

        const points = {};
        stockTubeInfo.xaxis.forEach(date => {
            forIn(stockTubeInfo.data[date], function (value, metric) {
                if (!isArray(points[metric])) {
                    points[metric] = [];
                }

                points[metric].push(value);
            });
        });

        const sets = [];
        forIn(points, function (value, metric) {
            sets.push({
                data: value,
                label: stockTubeInfo.column_labels[metric],
                backgroundColor: colors[metric].backgroundColor,
                borderColor: colors[metric].colorBorder,
            });
        });

        this.data = {
            labels: stockTubeInfo.xaxis,
            datasets: sets,
        };

        this.options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        // suggestedMin: 0,
                        // suggestedMax: 100,
                    },
                }],
            },
        };
    }
}
