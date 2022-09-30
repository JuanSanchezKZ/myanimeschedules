import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class JikanService {
  constructor(private http: HttpClient) {}

  getTopAnime(): Observable<any> {
    return this.http.get('https://api.jikan.moe/v4/top/anime');
  }

  getSeasonalAnime(
    year: string,
    season: string,
    queryPage: string
  ): Observable<any> {
    return this.http.get<any>(
      `https://api.jikan.moe/v4/seasons/${year}/${season}?page=${queryPage}&limit=25`
    );
  }

  getSearchAnime(q: string, page: any): Observable<any> {
    return this.http.get<any>(
      `https://api.jikan.moe/v4/anime?page=${page}&limit=10&letter=${q}&start_date=2022&status=upcoming`
    );
  }

  getAnimeDetail(id: string): Observable<any> {
    return this.http.get('https://api.jikan.moe/v3/anime/' + id);
  }
}
