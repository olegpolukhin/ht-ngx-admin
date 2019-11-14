import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DateRange } from '../../components/app-daterange-picker/app-daterange-picker.component';
import * as moment from 'moment';
import { ServerSourceConf } from 'ng2-smart-table/lib/data-source/server/server-source.conf';
import { AppServerDataSource } from '../../@core/data/app-server-data-source';

export class PlatformStatsSummary {
    sitesAdded: number;
    sitesAddedActive: number;
    sitesEdited: number;
    sitesEditedActive: number;
    activatedPartners: number;
    stillActivePartners: number;
}

@Injectable({ providedIn: 'root' })
export class PlatformStatsService {

    constructor(private http: HttpClient) {
    }

    getSummary(dateRange?: DateRange) {
        const httpParams: any = {};
        if (dateRange) {
            httpParams.from = moment(dateRange.start).format('YYYY-MM-DD');
            httpParams.to = moment(dateRange.end).format('YYYY-MM-DD');
        }
        return this.http.get<PlatformStatsSummary>(`/api/platform-stats/getDataPreview`, { params: httpParams })
            .pipe(
                map(data => {
                    return data;
                }),
                catchError(this.handleError),
            );
    }

    getSitesActivitySource(): AppServerDataSource {
        const sourceConf = new ServerSourceConf({
            endPoint: '/api/platform-stats/sites-activity',
            dataKey: 'data',
            pagerPageKey: 'page',
            pagerLimitKey: 'limit',
            totalKey: 'total',
            sortFieldKey: 'sort',
            sortDirKey: 'minus',
        });
        return new AppServerDataSource(this.http, sourceConf);
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
        return throwError(
            'Something bad happened; please try again later.');
    }
}
