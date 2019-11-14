import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { ServerSourceConf } from 'ng2-smart-table/lib/data-source/server/server-source.conf';
import { AppServerDataSource } from '../../@core/data/app-server-data-source';

@Injectable({ providedIn: 'root' })
export class TrafficService {

    source: ServerDataSource;
    sourceConf: ServerSourceConf;

    constructor(private http: HttpClient) { }

    getDataTable(): AppServerDataSource {
        this.sourceConf = new ServerSourceConf({
            endPoint: '/api/traffic/getDataTable',
            dataKey: 'data',
            pagerPageKey: 'page',
            totalKey: 'total',
        });
        return new AppServerDataSource(this.http, this.sourceConf);
    }
}
