import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../anime/anime-searcher/storage.service';
import { GetAnimeService } from '../getanime.service';

@Component({
  selector: 'app-anime-schedule',
  templateUrl: './anime-schedule.component.html',
  styleUrls: ['./anime-schedule.component.css'],
})
export class AnimeScheduleComponent implements OnInit {
  schedules: any;
  newAnime1: any;

  constructor(
    private storage: StorageService,
    private getAnime: GetAnimeService
  ) {}

  // find anime by id in list of schedule anime
  // this.schedules.find((x: any) => x.mal_id == i.mal_id);

  orderScheduleAnime() {
    this.schedules.sort((a: any, b: any) => {
      return a.broadcast.time > b.broadcast.time ? 1 : -1;
    });
    console.log(this.schedules);
  }

  clearSchedule() {
    this.schedules = [];

    this.storage.clearSchedules();
  }

  ngOnInit(): void {
    this.schedules = this.storage.getSchedules();
    console.log(this.schedules);
    this.orderScheduleAnime();
  }
}

// hola: any = {
//   time: '9:00',
//   monday: { name: 'Naruto' },
//   tuesday: null,
//   friday: { name: 'One Piece' },
// };
