import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { appSettings } from "../settings/appsettings";
import { Login } from "../interfaces/login.interface";
import { User } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class AccessService {
    private http = inject(HttpClient);
    private baseUrl: string = appSettings.apiUrl;

    constructor() { }

    register(user: User): Observable<any> {
        const url = `${this.baseUrl}api/auth/register`;
        return this.http.post<any>(url, user);
    }

    login(login: Login): Observable<any> {
        const url = `${this.baseUrl}api/auth/login`;
        return this.http.post<any>(url, login);
    }
}