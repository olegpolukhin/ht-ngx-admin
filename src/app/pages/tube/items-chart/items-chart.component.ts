import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {TubeService} from '../../../@core/services';

@Component({
    selector: 'ngx-items-chart',
    styleUrls: ['./items-chart.component.scss'],
    templateUrl: './items-chart.component.html',
})
export class ItemsChartComponent implements OnInit, OnChanges {

    @Input() dateRange: any;
    public blockChart: any[] = [
        {key: 'imp', name: 'Impressions'},
        {key: 'uni', name: 'Uniques'},
        {key: 'views', name: 'Video Views'},
        {key: 'rev_ads', name: 'Ad Revenue'},
    ];

    public data: any;

    constructor(private tubeService: TubeService) {

    }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        this.tubeService.getDataPreview(this.dateRange).subscribe(data => this.data = data);
    }
}
