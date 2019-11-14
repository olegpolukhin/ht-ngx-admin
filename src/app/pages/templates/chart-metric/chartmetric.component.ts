import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { TemplatesService } from '../../../@core/services';
import { ParamTemplateMetric } from '../../../@core/data/template';
import { DateRange } from '../../../components/app-daterange-picker/app-daterange-picker.component';
import forIn from 'lodash/forIn';
import isArray from 'lodash/isArray';

@Component({
    selector: 'ngx-chartmetric',
    templateUrl: 'chartmetric.component.html',
    styleUrls: ['chartmetric.component.scss'],
})
export class ChartmetricComponent implements OnInit, OnChanges {

    public options: any;
    public themeSubscription: any;
    public data: any = [];

    public showError = false;

    @Input() dateRange: DateRange;
    @Input() metric: string;

    constructor(private _template: TemplatesService) { }

    ngOnInit() { }

    ngOnChanges() {
        const reqTubeInfo: ParamTemplateMetric = {
            DateRange: this.dateRange,
            Metric: this.metric,
        };
        this.dataFill(reqTubeInfo);
    }

    private dataFill(reqTubeInfo: ParamTemplateMetric) {
        this._template.getMetricInfo(reqTubeInfo).subscribe(
            (data) => {
                if (!data) {
                    this.showError = true;
                }
                this.stockMetric(data);
            },
            () => this.showError = true,
        );
    }

    private stockMetric(stockTubeInfo: any) {

        function dynamicColors(): string {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return 'rgba(' + r + ',' + g + ',' + b + ', 0.5)';
        }

        const points = {};
        stockTubeInfo.xaxis.forEach(date => {
            forIn(stockTubeInfo.data[date], function (value, metric) {
                if (!isArray(points[metric])) {
                    points[metric] = [];
                }

                points[metric].push(value);
            });
        });

        stockTubeInfo.column_labels = Object.keys(stockTubeInfo.column_labels).map((key) => {
            return stockTubeInfo.column_labels[key];
        });

        const sets = [];
        forIn(points, function (value, metric) {
            const color = dynamicColors();
            sets.push({
                data: value,
                label: metric,
                backgroundColor: color,
                borderColor: color,
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
                    },
                }],
            },
        };
    }
}
