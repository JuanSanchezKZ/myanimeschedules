import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../anime/anime-searcher/storage.service';

@Component({
  selector: 'app-anime-schedule',
  templateUrl: './anime-schedule.component.html',
  styleUrls: ['./anime-schedule.component.css'],
})
export class AnimeScheduleComponent implements OnInit {
  schedules: any;

  constructor(private storage: StorageService) {}

  clearSchedule() {
    this.schedules = [];
    this.storage.clearSchedules();
  }

  ngOnInit(): void {
    this.schedules = this.storage.getSchedules();
    console.log(this.schedules);
  }
}

// hola: any = {
//   time: '9:00',
//   monday: { name: 'Naruto' },
//   tuesday: null,
//   friday: { name: 'One Piece' },
// };
