import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import { AppState } from 'src/store/app.state';
import { selectAppFeature } from 'src/store/selectors/selector';
import { distinct, distinctUntilChanged, filter, skip } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-anime-schedule',
  templateUrl: './anime-schedule.component.html',
  styleUrls: ['./anime-schedule.component.css'],
})
export class AnimeScheduleComponent implements OnInit {
  modalRef?: BsModalRef;
  animeMondays: any[] = [];
  modal: any;
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

  constructor(
    private modalService: BsModalService,
    private store: Store<AppState>,
    private http: HttpClient
  ) {}

  // find anime by id in list of schedule anime
  // this.schedules.find((x: any) => x.mal_id == i.mal_id);

  orderScheduleAnime() {
    this.schedules.sort((a: any, b: any) => {
      return a.broadcastTime > b.broadcastTime ? 1 : -1;
    });
  }

  updateTable() {
    this.dataSource.data = this.schedules;

    this.orderScheduleAnime();
  }

  openModal(template: TemplateRef<any>, schedules: any) {
    this.modalRef = this.modalService.show(template);
    this.modal = schedules;
  }

  removeSchedule(query: string) {
    console.log(query);
    this.http
      .get(`http://127.0.0.1:8000/api/feed/?search=${query}`)
      .subscribe((resp: any) => {
        this.http
          .delete(`http://127.0.0.1:8000/api/feed/${resp[0].id}/`)
          .subscribe((data) => console.log(data));
        this.schedules = this.schedules.filter(
          (a) => a.title !== resp[0].title
        );
        this.updateTable();
      });
  }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:8000/api/feed/').subscribe((resp: any) => {
      this.schedules = resp;

      this.updateTable();
    });
    this.store
      .select(selectAppFeature)
      .pipe(filter((a) => a.schedules !== null))
      .subscribe((data) => {
        this.schedules.push(data.schedules);
        this.updateTable();
      });
  }
}
