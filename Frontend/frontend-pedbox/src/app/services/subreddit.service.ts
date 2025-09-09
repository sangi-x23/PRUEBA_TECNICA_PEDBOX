import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { appSettings } from "../settings/appsettings";
import { Subreddit } from "../interfaces/subreddit.interface";

@Injectable({
    providedIn: 'root'
})
export class SubredditService {
    private http = inject(HttpClient);
    private baseUrl: string = appSettings.apiUrl;

    constructor() { }

    getAllSubreddits(): Observable<Subreddit[]> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        const url = `${this.baseUrl}api/subreddits`;
        return this.http.get<Subreddit[]>(url, { headers });
    }

    getSubredditById(id: string): Observable<Subreddit> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        const url = `${this.baseUrl}api/subreddits/${id}`;
        return this.http.get<Subreddit>(url, { headers });
    }

    updateSubreddit() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        const url = `${this.baseUrl}api/update`;
        return this.http.put(url, {}, { headers });
    }
}