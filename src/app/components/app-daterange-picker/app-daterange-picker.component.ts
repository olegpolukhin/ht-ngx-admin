import { Component, forwardRef, isDevMode, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';

const noop = () => {
};

export interface DateRange {
    start: Date;
    end: Date;
}

@Component({
    selector: 'ngx-app-daterange-picker',
    templateUrl: './app-daterange-picker.component.html',
    styleUrls: ['./app-daterange-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AppDaterangePickerComponent),
            multi: true,
        },
    ],
})
export class AppDaterangePickerComponent implements ControlValueAccessor, OnInit {

    public buttons = [
        { name: 'Today', value: 'today' },
        { name: 'Yesterday', value: 'yesterday' },
        { name: 'This week', value: 'this-week' },
        { name: 'Last week', value: 'last-week' },
        { name: 'This month', value: 'this-month' },
        { name: 'Last month', value: 'last-month' },
    ];

    public dateRangeInit: DateRange;
    public paramDateInit: String[] = [];

    // The internal data model
    public innerV: DateRange;
    public nbRangepickerValue: DateRange;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    @Input('placeholder') placeholder: DateRange;

    constructor() {
        if (isDevMode()) {
            this.buttons.push(
                { name: '6 month', value: '6-months' },
                { name: 'year', value: 'year' },
                { name: '10 years', value: '10-years' },
            );
        }
    }

    ngOnInit(): void {
        this.dateRangeInit = AppDaterangePickerComponent.fromFirstDayMonth();
        if (this.placeholder) {
            this.dateRangeInit = this.placeholder;
            this.paramDateInit['dateFrom'] = moment(this.dateRangeInit.start).format('MMM D, YYYY');
            this.paramDateInit['dateTo'] = moment(this.dateRangeInit.end).format('MMM D, YYYY');
        }
    }

    static fromFirstDayMonth(): DateRange {
        let start = new Date();
        let end = new Date();

        start = moment(start).startOf('month').toDate();
        end = moment(end).endOf('month').toDate();

        return {
            start: start,
            end: end,
        };
    }

    static fromFirstDayWeek(): DateRange {
        let start = new Date();
        let end = new Date();

        start = moment(start).startOf('week').toDate();
        end = AppDaterangePickerComponent.todayRange().end;

        return {
            start: start,
            end: end,
        };
    }

    static todayRange(): DateRange {
        const start = new Date();
        start.setHours(0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59);

        return {
            start: start,
            end: end,
        };
    }

    // get accessor
    get value(): DateRange {
        return this.innerV;
    }

    // set accessor including call the onchange callback
    set value(v: DateRange) {
        if (!this.innerV) {
            this.innerV = AppDaterangePickerComponent.todayRange();
        }

        this.nbRangepickerValue = {
            start: v.start,
            end: v.end,
        };

        if (v.start.getTime() !== this.innerV.start.getTime() || v.end.getTime() !== this.innerV.end.getTime()) {
            this.innerV = v;
            this.onChangeCallback(v);
        }
    }

    // Set touched on blur. Just for example
    onBlur() {
        this.onTouchedCallback();
    }

    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerV) {
            this.innerV = value;
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }


    setRange(value: string) {
        let start = AppDaterangePickerComponent.todayRange().start;
        let end = AppDaterangePickerComponent.todayRange().end;

        switch (value) {
            case 'today':
                // nothing
                break;
            case 'yesterday':
                start.setDate(start.getDate() - 1);
                end.setDate(end.getDate() - 1);

                break;
            case 'this-week':
                start = moment(start).startOf('week').toDate();

                break;
            case 'last-week':
                start = moment(start).subtract(1, 'weeks').startOf('week').toDate();
                end = moment(end).subtract(1, 'weeks').endOf('week').toDate();

                break;
            case 'this-month':
                start = moment(start).startOf('month').toDate();

                break;
            case 'last-month':
                start = moment(start).subtract(1, 'months').startOf('month').toDate();
                end = moment(end).subtract(1, 'months').endOf('month').toDate();

                break;
            case '6-months':
                start = moment(start).subtract(6, 'months').startOf('month').toDate();

                break;
            case 'year':
                start = moment(start).subtract(1, 'years').startOf('month').toDate();

                break;
            case '10-years':
                start = moment(start).subtract(10, 'years').startOf('month').toDate();

                break;
            default:
                throw new Error('Unknown value: ' + value);
        }

        this.value = {
            start: start,
            end: end,
        };

        this.nbRangepickerValue.start = start;
        this.nbRangepickerValue.end = end;
    }

    static getRange(): DateRange {

        return {
            start: AppDaterangePickerComponent.todayRange().start,
            end: AppDaterangePickerComponent.todayRange().end,
        };
    }

    static setInitDefaultRange(start?, end?): DateRange {
        return {
            start: start,
            end: end,
        };
    }

    public getInitDefaultRange(): void {
        this.dateRangeInit.start = AppDaterangePickerComponent.setInitDefaultRange().start;
        this.dateRangeInit.end = AppDaterangePickerComponent.setInitDefaultRange().end;
    }

    nbRangepickerChange() {
        if (!this.nbRangepickerValue.end) {
            return;
        }

        this.value = {
            start: this.nbRangepickerValue.start,
            end: this.nbRangepickerValue.end,
        };
    }
}
