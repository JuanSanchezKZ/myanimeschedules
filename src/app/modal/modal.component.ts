import {
  Component,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  OnInit,
  Inject,
} from '@angular/core';
import { AppState } from 'src/store/app.state';
import { Store } from '@ngrx/store';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { addScheduleAction } from 'src/store/actions/actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { malInterface } from 'src/store/interfaces/apiInterface';

import { interval, map, Subscription } from 'rxjs';
import { apiUrl } from 'src/environments/constants';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnDestroy, OnChanges, OnInit {
  @Input('modal') rowsModal: any;

  demo: any;
  showMore = false;
  intervalCountdown!: any;
  schedules: any;
  headers = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('userToken')}`
    ),
  };
  counterTime$!: Subscription;
  countdownDate!: number;
  alreadyOnTheListString: string = ''
  isOnTheList: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<any>,
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

  updateNextEpisode() {
    // animeDates

    let nowinJapan = this.convertToJapan(new Date());
    let now = nowinJapan.getTime();
    let distance = this.countdownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.demo = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
    if (days < 0) {
      this.countdownDate += 6.048e8;
    }
  }

  start(broadcast: any, broadcastTime: any) {
    const animeDateDay = broadcast.day;
    const animeDateMonth = broadcast.month;
    const animeDateYear = broadcast.year;
    // anime Weekly Releases

    const animeBroadcastTime = broadcastTime;

    const dateinJapan = new Date(
      `${animeDateMonth} ${animeDateDay}, ${animeDateYear} ${animeBroadcastTime}`
    );

    this.countdownDate = dateinJapan.getTime();

    return interval(10).pipe(
      map((a) => {
        this.updateNextEpisode();
        return a;
      })
    );
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
    const broadcastBody: malInterface = {
      data: '',
      title: broadcast.title,
      day: broadcast.broadcast.day,
      broadcastTime: broadcast.broadcast.time,
      image: broadcast.images.jpg.image_url,
    };

    this.http
      .get(`${apiUrl}/api/feed/`, this.headers)
      .subscribe((data: any) => {
        const dataSome = data.some((a: any) => a.title === broadcast.title);
        if (dataSome) {
          this.alreadyOnTheListString = 'Already on your schedule'
          this.isOnTheList = false
        } else {
          this.alreadyOnTheListString = 'Added to your schedule'
          this.isOnTheList = true
          this.http
            .post(`${apiUrl}/api/feed/`, broadcastBody, this.headers)
            .subscribe((resp) => {
              this.store.dispatch(addScheduleAction(broadcastBody));
              console.log(resp);
            });
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.counterTime$.unsubscribe();
  }

  ngOnInit(): void {
    this.counterTime$ = this.start(
      this.data.broadcast,
      this.data.broadcastTime
    ).subscribe((data) => {});
  }
}
