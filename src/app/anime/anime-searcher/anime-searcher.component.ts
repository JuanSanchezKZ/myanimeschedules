import {
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { GetAnimeService } from '../../getanime.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { StorageService } from './storage.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { JikanService } from 'src/app/jikan.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-anime-searcher',
  templateUrl: './anime-searcher.component.html',
  styleUrls: ['./anime-searcher.component.css'],
})
export class AnimeSearcherComponent implements OnInit, DoCheck, AfterViewInit {
  animeSeasonal: any;
  count: any;
  offset: any = 0;
  config: any;
  temp: {} | undefined;
  pageSize: number = 0;
  columnMode = ColumnMode.force;
  public rows: any[] = [];
  columns: any;
  isSearching: boolean = true;
  ids: any;

  demo: any;
  dateinJapan: any;

  modalRef?: BsModalRef;
  nameAnimeModal: any;
  rowsModal: any[] = [];

  selected = [];
  countDownDate: any;
  demoBoolean: boolean = true;
  show = false;
  dateNextEpisode: any;

  searchText: any;

  @ViewChild('template', { static: true })
  child: any;

  @ViewChild('add', { static: true })
  add: any;

  @ViewChild('templat', { static: true })
  modal: any;
  displayedColumns: string[] = [
    'image',
    'name',
    'status',
    'broadcast',
    'airing',
    'malLink',
    'add',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(
    public getAnime: GetAnimeService,
    private storage: StorageService,
    private modalService: BsModalService,
    private api: JikanService
  ) {}

  setPage(pageInfo: any) {
    this.offset = pageInfo.offset;
    this.api.getSeasonalAnime('2022', 'fall', this.offset).subscribe((data) => {
      this.rows = data.data;

      // this.count = data.pagination.items.total;
      // this.pageSize = data.pagination.items.per_page;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSelect({ selected }: { selected: any }) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event: any) {
    if (this.rowsModal.length) {
      this.rowsModal = [];
    }
    this.rowsModal.push(event);
    this.openModal(this.modal);
    this.updateNextEpisode(event);
  }

  updateNextEpisode(event: any) {
    // animeDates
    const animeDate = event.aired.prop.from;
    const animeDateDay = animeDate.day;
    const animeDateMonth = animeDate.month;
    const animeDateYear = animeDate.year;
    // anime Weekly Releases
    const animeBroadcast = event.broadcast;
    const animeBroadcastTime = animeBroadcast.time;

    this.dateinJapan = new Date(
      `${animeDateMonth} ${animeDateDay}, ${animeDateYear} ${animeBroadcastTime}`
    );

    this.countDownDate = this.dateinJapan.getTime();

    setInterval(() => {
      let nowinJapan = this.convertToJapan(new Date());
      let now = nowinJapan.getTime();
      let distance = this.countDownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.demo = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
      if (this.demo.includes('-')) {
        this.countDownDate = this.countDownDate + 6.048e8;
        this.countdown();
      }
    }, 100);
  }

  countdown() {
    setInterval(() => {
      let nowinJapan = this.convertToJapan(new Date());
      let now = nowinJapan.getTime();
      let distance = this.countDownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.demo = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
    }, 100);
  }

  updateFilter(event: any) {
    let val = event.target.value;

    // filter our data
    let temp = this.rows.filter(function (d: any) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.isSearching = true;

    // update the rows
    this.rows = temp;

    // Whenever the filter changes, always go back to the first page
    this.offset = 0;
  }

  updateTable() {
    this.dataSource.data = this.rows;
  }

  convertToJapan(date: any) {
    return new Date(
      (typeof date === 'string' ? new Date(date) : date).toLocaleString(
        'ja-JP',
        { timeZone: 'Japan' }
      )
    );
  }

  passToSchedule(broadcast: any) {
    const schedules = this.storage.getSchedules();
    if (schedules.some((e: any) => e.mal_id == broadcast.mal_id)) {
      console.log('ya etaba en la lista');
    } else {
      schedules.push(broadcast);
      console.log(schedules, 'agregado');
      this.storage.saveSchedule(schedules);
    }
  }

  ngOnInit(): void {
    this.api.getSeasonalAnime('2022', 'fall', this.offset).subscribe((data) => {
      this.rows = data.data;
      this.count = data.pagination.items.total;
      this.pageSize = data.pagination.items.per_page;
      console.log(this.rows);
      this.updateTable();
    });
  }

  ngDoCheck(): void {}

  ngAfterViewInit(): void {}
}
