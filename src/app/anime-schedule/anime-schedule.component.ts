import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import { AppState } from 'src/store/app.state';
import { selectAppFeature } from 'src/store/selectors/selector';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from 'src/environments/environment';

@Component({
  selector: 'app-anime-schedule',
  templateUrl: './anime-schedule.component.html',
  styleUrls: ['./anime-schedule.component.css'],
})
export class AnimeScheduleComponent implements OnInit {
  animeMondays: any[] = [];
  displayedColumns: string[] = [
    'Mondays',
    'Tuesdays',
    'Wednesdays',
    'Thursdays',
    'Fridays',
    'Saturdays',
    'Sundays',
  ];
  dataSource = new MatTableDataSource<any>();
  schedules: any[] = [];
  headers = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('userToken')}`
    ),
  };

  constructor(private store: Store<AppState>, private http: HttpClient) {}

  orderScheduleAnime() {
    this.schedules.sort((a: any, b: any) => {
      return a.broadcastTime > b.broadcastTime ? 1 : -1;
    });
  }

  updateTable() {
    this.dataSource.data = this.schedules;

    this.orderScheduleAnime();
  }

  removeSchedule(query: number, title: string) {
    this.http
      .delete(`${apiUrl}feed/${query}/`, this.headers)
      .subscribe((data) => {
        this.schedules = this.schedules.filter((a) => a.title !== title);
        this.updateTable();
      });
  }

  ngOnInit(): void {
    console.log(localStorage);

    this.store
      .select(selectAppFeature)
      .pipe()
      .subscribe((data) => {
        this.http.get(`${apiUrl}feed/`, this.headers).subscribe((resp: any) => {
          this.schedules = resp;

          this.updateTable();
        });
      });
  }
}
