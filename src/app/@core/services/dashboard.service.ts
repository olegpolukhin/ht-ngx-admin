import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { DateRange } from '../../components/app-daterange-picker/app-daterange-picker.component';
import * as moment from 'moment';


@Injectable({ providedIn: 'root' })
export class DashboardService {

    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get<any>(`/api/admin/dash`)
            .pipe(map(data => {
                return data;
            }));
    }

    getPreview(dateRange?: DateRange) {
        const httpParams: any = {};
        if (dateRange) {
            httpParams.dateFrom = moment(dateRange.start).format('YYYY-MM-DD');
            httpParams.dateTo = moment(dateRange.end).format('YYYY-MM-DD');
        }
        return this.http.get<any>(`/api/dashboard/getDataPreview`, { params: httpParams })
            .pipe(
                map(data => {
                    const emptyStatRecord = { tube: 0, uni: 0 };
                    data = data || {};
                    data.stats = data.stats || [];
                    data.diff = data.diff || emptyStatRecord;
                    data.dailyIncome = data.dailyIncome || emptyStatRecord;

                    return data;
                }),
            );
    }

}
