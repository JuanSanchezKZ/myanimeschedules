import { Component, OnInit, Input } from '@angular/core';
import { JikanService } from './jikan.service';
import { map, pluck } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  topAnimeTitleList?: Array<string> = [];
  idd = new FormControl('');

  constructor(private jikan: JikanService) {}

  ngOnInit() {}

  async getTopAnimeTitle() {
    await this.jikan
      .getTopAnime()
      .pipe(map((m) => m.top))
      .subscribe((data) => {
        this.topAnimeTitleList = data.map((d: { title: any }) => d.title);
        console.log(data);
      });
  }
}
