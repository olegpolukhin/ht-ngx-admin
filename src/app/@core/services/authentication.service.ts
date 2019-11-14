import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserAuth } from '../data/users';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(data: UserAuth): Observable<any> {
        return this.http.post<any>(`/api/account/login`, { username: data.username, password: data.password })
            .pipe(
                map(user => {
                    if (user && user.token) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                    }
                    return user;
                }));
    }

    logout(): Observable<any> {
        return this.http.get<any>(`/api/account/logout`)
            .pipe(
                map(() => {
                    // remove user from local storage to log user out
                    localStorage.removeItem('currentUser');
                    this.currentUserSubject.next(null);
                    return true;
                }));
    }
}
