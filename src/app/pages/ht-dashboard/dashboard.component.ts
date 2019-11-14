import {Component, OnInit} from '@angular/core';
import {
    AppDaterangePickerComponent,
    DateRange,
} from '../../components/app-daterange-picker/app-daterange-picker.component';
import {
    PlatformStatsService,
    PlatformStatsSummary,
} from '../../@core/services/platform-stats.service';

@Component({
    selector: 'ngx-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    public dateRange: DateRange;
    public topBlocksData: PlatformStatsSummary;

    constructor(private platformStatsService: PlatformStatsService) {
        this.topBlocksData = new PlatformStatsSummary();
    }

    ngOnInit(): void {
        this.dateRange = AppDaterangePickerComponent.fromFirstDayMonth();
        this.getData();
    }

    getData() {
        this.platformStatsService.getSummary(this.dateRange).subscribe(
            data => this.topBlocksData = data,
        );
    }

}
