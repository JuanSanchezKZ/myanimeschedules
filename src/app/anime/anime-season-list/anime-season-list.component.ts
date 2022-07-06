import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JikanService } from '../../jikan.service';
import { GetAnimeService } from '../../getanime.service';

@Component({
  selector: 'app-anime-season-list',
  templateUrl: './anime-season-list.component.html',
  styleUrls: ['./anime-season-list.component.css'],
})
export class AnimeSeasonListComponent {
  animeSeasonal: any;

  idd = new FormControl('');
  id: any = '';
  animeSeasonalId: any;
  animeById = {
    background: '',
    title: '',
    episodes: '',
    premiered: '',
    image_url: '',
    sinopsis: '',
    score: '',
  };
  searchText: any;
  constructor(private jikan: JikanService, private getAnime: GetAnimeService) {}
}
