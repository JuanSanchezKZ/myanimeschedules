import { Component, OnInit } from '@angular/core';
import { GetAnimeService } from '../getanime.service';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-search-id',
  templateUrl: './form-search-id.component.html',
  styleUrls: ['./form-search-id.component.css'],
})
export class FormSearchIdComponent implements OnInit {
  year: any;
  season: any;
  animeSeasonal: any;

  idd = new FormControl('');
  id: any = '';
  animeSeasonalId: any;

  searchText: any;

  constructor(public getAnime: GetAnimeService) {}

  ngOnInit(): void {}

  onClickSubmit(data: any) {
    this.getAnime.getSeasonalAnime(data.year, data.season, 0);
  }
}
