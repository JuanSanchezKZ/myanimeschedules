import {
  Component,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  OnInit,
  Inject,
} from '@angular/core';

import { StorageService } from '../anime/anime-searcher/storage.service';
import { AppState } from 'src/store/app.state';
import { Store } from '@ngrx/store';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { addScheduleAction } from 'src/store/actions/actions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnDestroy, OnChanges, OnInit {
  @Input('modal') rowsModal: any;

  demo: any;
  show = false;
  intervalCountdown!: any;
  schedules: any;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private storage: StorageService,
    private store: Store<AppState>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      image: string;
      title: string;
      synopsis: string;
      broadcast: any;
      broadcastTime: any;
      storage: any;
    }
  ) {}

  updateNextEpisode(broadcast: any, broadcastTime: any) {
    // animeDates

    const animeDateDay = broadcast.day;
    const animeDateMonth = broadcast.month;
    const animeDateYear = broadcast.year;
    // anime Weekly Releases

    const animeBroadcastTime = broadcastTime;

    const dateinJapan = new Date(
      `${animeDateMonth} ${animeDateDay}, ${animeDateYear} ${animeBroadcastTime}`
    );

    const countDownDate = dateinJapan.getTime();

    this.intervalCountdown = setInterval(() => {
      let nowinJapan = this.convertToJapan(new Date());
      let now = nowinJapan.getTime();
      let distance = countDownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.demo = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
    }, 1000);
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
    this.http
      .get(`http://127.0.0.1:8000/api/feed/?search=${broadcast.title}`)
      .subscribe((data: any) => {
        console.log(data);
        if (data.length === 0) {
          this.http
            .post('http://127.0.0.1:8000/api/feed/', {
              metadata: broadcast,
              status_text: broadcast.title,
            })
            .subscribe((data) => {
              this.store.dispatch(addScheduleAction(broadcast));
              console.log(data);
            });
        } else {
          console.log('ya estaba en la lista perro');
        }
      });
  }

  // passToSchedule(broadcast: any) {
  //   this.schedules = this.storage.getSchedules();
  //   if (this.schedules.some((e: any) => e.mal_id == broadcast.mal_id)) {
  //     console.log('ya etaba en la lista');
  //   } else {
  //     this.schedules.push(broadcast);
  //     this.store.dispatch(addScheduleAction(broadcast));
  //     this.storage.saveSchedule(this.schedules, broadcast.mal_id);
  //   }
  // }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    clearInterval(this.intervalCountdown);
  }

  ngOnInit(): void {
    this.updateNextEpisode(this.data.broadcast, this.data.broadcastTime);
  }
}
