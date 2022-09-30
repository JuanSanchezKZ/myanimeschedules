import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { StorageService } from './storage.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { JikanService } from 'src/app/jikan.service';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { AppState } from 'src/store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-anime-searcher',
  templateUrl: './anime-searcher.component.html',
  styleUrls: ['./anime-searcher.component.css'],
})
export class AnimeSearcherComponent implements OnInit, DoCheck, AfterViewInit {
  count: any;
  offset: any = 0;
  pageSize: number = 0;
  public rows: any[] = [];
  modalRef?: BsModalRef;
  rowsModal: any[] = [];
  selected = [];
  show = false;
  dateNextEpisode: any;
  searchText: any;
  @ViewChild('template', { static: true })
  child: any;
  @ViewChild('add', { static: true })
  add: any;

  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;
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
  schedules: any[] = [];

  constructor(private api: JikanService, public dialog: MatDialog) {}

  search() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map((event: any) => {
          return event.target.value;
        }),
        distinctUntilChanged()
      )
      .subscribe((searchData: string) => {
        searchData
          ? (this.rows = this.rows.filter(
              (s) =>
                s.title.toLowerCase().indexOf(searchData.toLowerCase()) != -1
            ))
          : this.fillTable();
        this.updateTable();
      });
  }

  setPage(pageInfo: any) {
    this.offset = pageInfo.offset;
    this.api.getSeasonalAnime('2022', 'fall', this.offset).subscribe((data) => {
      this.rows = data.data;

      // this.count = data.pagination.items.total;
      // this.pageSize = data.pagination.items.per_page;
    });
  }

  openDialog(data: any) {
    this.dialog.open(ModalComponent, {
      data: {
        title: data.title,
        synopsis: data.synopsis,
        image: data.images.jpg.image_url,
        broadcast: data.aired.prop.from,
        broadcastTime: data.broadcast.time,
        storage: data,
      },
    });
  }

  updateTable() {
    this.dataSource.data = this.rows;
  }

  fillTable() {
    this.api.getSeasonalAnime('2022', 'fall', this.offset).subscribe((data) => {
      this.rows = data.data;
      this.count = data.pagination.items.total;
      this.pageSize = data.pagination.items.per_page;
      console.log(this.rows);
      this.updateTable();
    });
  }

  ngOnInit(): void {
    this.search();
    this.fillTable();
  }

  ngDoCheck(): void {}

  ngAfterViewInit(): void {}
}
