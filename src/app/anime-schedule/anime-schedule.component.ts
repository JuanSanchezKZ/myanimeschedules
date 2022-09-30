import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StorageService } from '../anime/anime-searcher/storage.service';

import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import { AppState } from 'src/store/app.state';
import { selectAppFeature } from 'src/store/selectors/selector';
import { distinct, distinctUntilChanged, filter, skip } from 'rxjs/operators';

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
    private storage: StorageService,
    private modalService: BsModalService,
    private store: Store<AppState>
  ) {}

  // find anime by id in list of schedule anime
  // this.schedules.find((x: any) => x.mal_id == i.mal_id);

  orderScheduleAnime() {
    this.schedules.sort((a: any, b: any) => {
      return a.broadcast.time > b.broadcast.time ? 1 : -1;
    });
  }

  clearSchedule() {
    this.schedules = [];
    this.storage.clearSchedules();
    this.updateTable();
  }

  updateTable() {
    this.dataSource.data = this.schedules;
    this.orderScheduleAnime();
  }

  openModal(template: TemplateRef<any>, schedules: any) {
    this.modalRef = this.modalService.show(template);
    this.modal = schedules;
  }

  ngOnInit(): void {
    this.schedules = this.storage.getSchedules();
    this.updateTable();
    this.store
      .select(selectAppFeature)
      .pipe(
        distinct(),
        filter((a) => a.schedules !== null)
      )
      .subscribe((data) => {
        this.schedules.push(data.schedules);
        this.updateTable();
      });
  }
}

// hola: any = {
//   time: '9:00',
//   monday: { name: 'Naruto' },
//   tuesday: null,
//   friday: { name: 'One Piece' },
// };
