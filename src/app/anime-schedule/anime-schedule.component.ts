import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  modalRef?: BsModalRef;
  animeMondays: any[] = [];
  modal: any;
  constructor(
    private storage: StorageService,
    private getAnime: GetAnimeService,
    private modalService: BsModalService
  ) {}

  // find anime by id in list of schedule anime
  // this.schedules.find((x: any) => x.mal_id == i.mal_id);

  orderScheduleAnime() {
    this.schedules.sort((a: any, b: any) => {
      return a.broadcast.time > b.broadcast.time ? 1 : -1;
    });
    console.log(this.schedules);
  }

  getAnimeRow() {}

  clearSchedule() {
    this.schedules = [];

    this.storage.clearSchedules();
  }

  openModal(template: TemplateRef<any>, schedules: any) {
    this.modalRef = this.modalService.show(template);
    this.modal = schedules;
    // const ids = this.rows.map((obj) => obj.mal_id);
    // console.log(ids);

    // ids.forEach((element: any) => {
    //   this.getAnime.getAnimeDetailById(element);
    // });

    // setTimeout(() => (this.rowsModal = [this.getAnime.animeById]), 300);
    // console.log(this.rowsModal);
  }

  ngOnInit(): void {
    this.schedules = this.storage.getSchedules();

    this.orderScheduleAnime();
    this.getAnimeRow();
  }
}

// hola: any = {
//   time: '9:00',
//   monday: { name: 'Naruto' },
//   tuesday: null,
//   friday: { name: 'One Piece' },
// };
