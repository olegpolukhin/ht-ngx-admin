import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-earning-card-front',
    styleUrls: ['./earning-card-front.component.scss'],
    templateUrl: './earning-card-front.component.html',
})
export class EarningCardFrontComponent implements OnDestroy, OnInit, OnChanges {

    @Input() ecfName: string;
    @Input() ecfKey: string;
    @Input() data: any;

    liveUpdateChartData: { value: [string, number] }[];
    dailyIncome: number;
    delta: { up: boolean, value: number };

    constructor() {
        this.delta = {up: true, value: 0};
        this.dailyIncome = 0;
    }


    ngOnInit() {
    }

    ngOnChanges() {
        if (this.data) {
            this.update();
        }
    }

    private update() {
        this.liveUpdateChartData = this.getChartPoints(this.data.stats);
        // this.dailyIncome = this.data.dailyIncome[this.ecfKey] || 0;

        const diff = (this.data.diff[this.ecfKey] ? Number(this.data.diff[this.ecfKey]) : +0);

        this.delta = {
            up: diff > 0,
            value: diff,
        };
    }

    private getChartPoints(stats: Array<any>): { value: [string, number] }[] {
        const points: Array<any> = [];

        let sum = 0;
        let count = 0;
        stats.forEach((item: any) => {
            const value = Number(item[this.ecfKey]);
            points.push({
                value: [String(item.date).replace(/-/g, '/'), value],
            });

            sum += value;
            count++;
        });

        this.dailyIncome = count > 0 ? Math.round(sum / count) : 0;

        return points;
    }

    ngOnDestroy() {
    }
}
