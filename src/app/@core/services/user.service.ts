import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { catchError, map } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { ServerSourceConf } from 'ng2-smart-table/lib/data-source/server/server-source.conf';
// import { throwError } from 'rxjs';
import { AppServerDataSource } from '../../@core/data/app-server-data-source';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    source: ServerDataSource;
    sourceConf: ServerSourceConf;

    getAll() {
        this.sourceConf = new ServerSourceConf({
            endPoint: '/api/users/getList',
            dataKey: 'data',
            pagerPageKey: 'page',
            totalKey: 'total',
        });
        return new AppServerDataSource(this.http, this.sourceConf);
    }
}
