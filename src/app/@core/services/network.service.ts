import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { ServerSourceConf } from 'ng2-smart-table/lib/data-source/server/server-source.conf';
import { AppServerDataSource } from '../../@core/data/app-server-data-source';
import { ParamNetwork, ParamMetric } from '../data/network';
import { DateRange } from '../../components/app-daterange-picker/app-daterange-picker.component';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NetworkService {

    source: ServerDataSource;
    sourceConf: ServerSourceConf;

    constructor(private http: HttpClient) { }

    getDataTable(): AppServerDataSource {
        this.sourceConf = new ServerSourceConf({
            endPoint: '/api/network/getDataTable',
            dataKey: 'data',
            pagerPageKey: 'page',
            totalKey: 'total',
        });
        return new AppServerDataSource(this.http, this.sourceConf);
    }

    getDataTableMetric(): AppServerDataSource {
        this.sourceConf = new ServerSourceConf({
            endPoint: '/api/network/getDataTableMetric',
            dataKey: 'data',
            pagerPageKey: 'page',
            totalKey: 'total',
        });
        return new AppServerDataSource(this.http, this.sourceConf);
    }

    getDataTableMetricLocal(param: any): Observable<any> {
        return this.http.get<any>(
            '/api/network/getDataTableMetric?' +
            'dateFrom=' + param['dateFrom'] +
            '&dateTo=' + param['dateTo'] +
            '&metric=' + param['metric']).pipe(map(result => {
                return result;
            }));
    }

    getTubeInfo(data: ParamNetwork) {
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
            Network: data.Network,
        };


        return this.http.get<any>(`/api/network/graph`, { params }).pipe(map(result => {
            return result;
        }));
    }

    getMetricInfo(data: ParamMetric) {
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
            Metric: data.Metric,
        };


        return this.http.get<any>(`/api/network/graphmetric`, { params }).pipe(map(result => {
            return result;
        }));
    }


    getCollectNetworks(): Observable<any> {
        return this.http.get('/api/network/getCollecNetworks');
    }
}
