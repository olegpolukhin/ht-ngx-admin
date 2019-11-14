import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LangService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>('/api/languages/getList').pipe(map(result => {
            return result;
        }));
    }
}
