import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { ServerSourceConf } from 'ng2-smart-table/lib/data-source/server/server-source.conf';
import { RequestTubeInfo } from '../data/tubes';
import { throwError } from 'rxjs';
import { DateRange } from '../../components/app-daterange-picker/app-daterange-picker.component';
import * as moment from 'moment';
import { AppServerDataSource } from '../../@core/data/app-server-data-source';

@Injectable({ providedIn: 'root' })
export class TubeService {

    source: ServerDataSource;
    sourceConf: ServerSourceConf;

    constructor(private http: HttpClient) { }

    getDataPreview(dateRange?: DateRange) {
        const httpParams: any = {};
        if (dateRange) {
            httpParams.dateFrom = moment(dateRange.start).format('YYYY-MM-DD');
            httpParams.dateTo = moment(dateRange.end).format('YYYY-MM-DD');
        }
        return this.http.get<any>(`/api/tube/getDataPreview`, { params: httpParams })
            .pipe(
                map(data => {
                    const emptyStatRecord = { imp: 0, uni: 0, views: 0, rev_ads: 0 };
                    data = data || {};
                    data.stats = data.stats || [];
                    data.diff = data.diff || emptyStatRecord;
                    data.dailyIncome = data.dailyIncome || emptyStatRecord;

                    return data;
                }),
                catchError(this.handleError),
            );
    }

    getTubeInfo(data: RequestTubeInfo) {
        function getPreferredScale(range: DateRange, excludeHours: boolean) {
            const diff = Math.floor((range.end.getTime() - range.start.getTime()) / 86400000) + 1;
            excludeHours = excludeHours || false;

            if ((diff < 5) && (false === excludeHours)) {
                return 'hour';
            } else if (diff < 100) {
                return 'day';
            } else if (diff < 366) {
                return 'month';
            } else {
                return 'year';
            }
        }

        const params: any = {
            DateFrom: moment(data.DateRange.start).format('YYYY-MM-DD'),
            DateTo: moment(data.DateRange.end).format('YYYY-MM-DD'),
            Scale: getPreferredScale(data.DateRange, false),
            TubeID: data.TubeID,
        };


        return this.http.get<any>(`/api/tube/gettubeinfo`, { params }).pipe(map(result => {
            return result;
        }));
    }

    getTubeInfoTagList(TubeID: Number) {
        const params: any = {
            TubeID: TubeID,
        };
        return this.http.get<any>(`/api/tube/gettubeinfoTagList`, { params }).pipe(map(result => {
            return result;
        }));
    }

    getTubeInfoTemplates(TubeID: Number) {
        const params: any = {
            TubeID: TubeID,
        };
        return this.http.get<any>(`/api/tube/gettubeinfoTemplates`, { params }).pipe(map(result => {
            return result;
        }));
    }

    gettubeinfoPlatforms(TubeID: Number) {
        const params: any = {
            TubeID: TubeID,
        };
        return this.http.get<any>(`/api/tube/gettubeinfoPlatforms`, { params }).pipe(map(result => {
            return result;
        }));
    }

    getTubeTable(): AppServerDataSource {
        this.sourceConf = new ServerSourceConf({
            endPoint: '/api/tube/getTubeTable',
            dataKey: 'data',
            pagerPageKey: 'page',
            totalKey: 'total',
        });
        return new AppServerDataSource(this.http, this.sourceConf);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
}
