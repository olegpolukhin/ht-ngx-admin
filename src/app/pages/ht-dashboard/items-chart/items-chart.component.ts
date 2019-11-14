import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DashboardService } from '../../../@core/services';

@Component({
    selector: 'ngx-items-chart',
    styleUrls: ['./items-chart.component.scss'],
    templateUrl: './items-chart.component.html',
})
export class ItemsChartComponent implements OnInit, OnChanges {

    @Input() dateRange: any;
    public blockChart: any[] = [
        { key: 'tube', name: 'Tubes' },
        { key: 'uni', name: 'Uniques' },
    ];

    public data: any;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit(): void { }

    ngOnChanges(): void {
        this.dashboardService.getPreview(this.dateRange).subscribe(data => this.data = data);
    }
}
