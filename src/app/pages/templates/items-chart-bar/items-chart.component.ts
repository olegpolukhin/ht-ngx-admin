import { Component, OnChanges, OnInit, AfterViewInit } from '@angular/core';
import { TemplatesService } from '../../../@core/services';

@Component({
    selector: 'ngx-items-chart-bar',
    styleUrls: ['./items-chart.component.scss'],
    templateUrl: './items-chart.component.html',
})
export class ItemsChartComponent implements OnInit, OnChanges, AfterViewInit {

    public blockChart: any[] = [
        { key: 'imp', name: 'Impressions' },
        { key: 'uni', name: 'Uniques' },
        { key: 'views', name: 'Video Views' },
        { key: 'rev_ads', name: 'Ad Revenue' },
    ];

    public data: any;
    public graphColumn: any;
    public graphValues: any;

    options: any = {};
    themeSubscription: any;

    constructor(private _template: TemplatesService) {
    }

    ngOnInit(): void {
        this._template.graphTemplates().subscribe(
            data => {
                this.graphColumn = data.column;
                this.graphValues = data.values;

                this.graphColumn = Object.values(data.column);
            },
        );
    }

    ngAfterViewInit() {
        this.options = {
            backgroundColor: '#ffffff',
            color: ['#87aeff'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: [],
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#181818',
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#181818',
                        },
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#181818',
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#181818',
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#181818',
                        },
                    },
                },
            ],
            series: [
                {
                    name: 'Score',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220],
                },
            ],
        };
    }

    ngOnChanges(): void { }
}
