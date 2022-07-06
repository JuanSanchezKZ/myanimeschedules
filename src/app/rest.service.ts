import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { apiUrl } from './app.constants';
import { Observable } from 'rxjs';
const endpoint = 'http://localhost:4200/api/v1/';
@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(apiUrl);
  }

  getnewData(): Observable<any> {
    return this.http.get('https://api.jikan.moe/v4/anime');
  }

  getTopAnime(): Observable<any> {
    return this.http.get('https://api.jikan.moe/v3/top/anime/1');
  }
}
