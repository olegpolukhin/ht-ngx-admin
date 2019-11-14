import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

const noop = () => {
};

export interface DateRange {
    start: Date;
    end: Date;
}

@Component({
    selector: 'ngx-app-date-custom-block',
    templateUrl: './app-date-custom-block.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AppDateCustomBlockComponent),
            multi: true,
        },
    ],
})
export class AppDateCustomBlockComponent implements OnInit {

    public innerV: DateRange;
    public nbRangepickerValue: DateRange;

    private onChangeCallback: (_: any) => void = noop;

    @Input('dateRage') dateRage: DateRange;

    constructor() { }

    ngOnInit(): void { }

    getFormateDate(date?: Date): string {
        return moment(date).format('YYYY-MM-DD');
    }

    get value(): DateRange {
        return this.innerV;
    }

    set value(v: DateRange) {
        this.nbRangepickerValue = {
            start: v.start,
            end: v.end,
        };

        if (v.start.getTime() !== this.innerV.start.getTime() || v.end.getTime() !== this.innerV.end.getTime()) {
            this.innerV = v;
            this.onChangeCallback(v);
        }
    }
}
