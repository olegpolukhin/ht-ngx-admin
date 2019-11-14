import {ServerDataSource} from 'ng2-smart-table';
import {HttpParams} from '@angular/common/http';
import forIn from 'lodash/forIn';

export class AppServerDataSource extends ServerDataSource {

    private _customRequestParams: object;

    get customRequestParams(): object {
        return this._customRequestParams;
    }

    set customRequestParams(value: object) {
        this._customRequestParams = value;
    }

    createRequesParams(): HttpParams {
        let params = super.createRequesParams();
        params = this.addCustomRequestParams(params);
        return params;
    }

    protected addCustomRequestParams(httpParams: HttpParams) {
        if (this.customRequestParams) {
            forIn(this.customRequestParams, (value, name) => {
                httpParams = httpParams.set(name, value);
            });
        }

        return httpParams;
    }

    addSortRequestParams(httpParams) {
        if (this.sortConf && this.conf.sortDirKey === 'minus') {
            this.sortConf.forEach(fieldConf => {
                httpParams = httpParams.set(
                    this.conf.sortFieldKey,
                    (fieldConf.direction.toUpperCase() === 'DESC') ? '-' + fieldConf.field : fieldConf.field,
                );
            });
        } else {
            httpParams = super.addSortRequestParams(httpParams);
        }

        return httpParams;
    }
}
