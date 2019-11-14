import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { ServerSourceConf } from 'ng2-smart-table/lib/data-source/server/server-source.conf';
import { AppServerDataSource } from '../../@core/data/app-server-data-source';
import { DateRange } from '../../components/app-daterange-picker/app-daterange-picker.component';
import { Observable } from 'rxjs';
import { ParamTemplate, ParamTemplateMetric } from '../data/template';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TemplatesService {

    source: ServerDataSource;
    sourceConf: ServerSourceConf;

    constructor(private http: HttpClient) { }

    getDataTable(): AppServerDataSource {
        this.sourceConf = new ServerSourceConf({
            endPoint: '/api/templates/getDataTable',
            dataKey: 'data',
            pagerPageKey: 'page',
            totalKey: 'total',
        });
        return new AppServerDataSource(this.http, this.sourceConf);
    }

    getDataTableMetricLocal(param: any): Observable<any> {
        return this.http.get<any>(
            '/api/templates/getDataTableMetric?' +
            'dateFrom=' + param['dateFrom'] +
            '&dateTo=' + param['dateTo'] +
            '&metric=' + param['metric']).pipe(map(result => {
                return result;
            }));
    }

    getGraphInfo(data: ParamTemplate) {
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
            Template: data.Template,
        };

        return this.http.get<any>(`/api/templates/graph`, { params }).pipe(map(result => {
            return result;
        }));
    }

    getMetricInfo(data: ParamTemplateMetric) {
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

        return this.http.get<any>(`/api/templates/graphmetric`, { params }).pipe(map(result => {
            return result;
        }));
    }

    getCollectTemplates(): Observable<any> {
        return this.http.get('/api/templates/getCollectTemplates');
    }

    graphTemplates(): Observable<any> {
        return this.http.get('/api/templates/graphTemplates');
    }
}
