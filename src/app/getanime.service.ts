import { Injectable, OnInit } from '@angular/core';
import { JikanService } from './jikan.service';

@Injectable({
  providedIn: 'root',
})
export class GetAnimeService implements OnInit {
  animeSeasonal: any;
  id: any = '';
  data: any;
  total: number = 0;
  perPage: number = 0;
  anime = {
    background: '',
    title: '',
    episodes: '',
    premiered: '',
    image_url: '',
    sinopsis: '',
    score: '',
  };
  animeById: any;

  constructor(private jikan: JikanService) {}

  ngOnInit(): void {}

  getSeasonalAnimeOnePage(year: any, season: any, page: any = 0) {
    for (let i = 1; i < 3; i++) {
      this.jikan.getSeasonalAnime(year, season, page + i).subscribe((data) => {
        this.animeSeasonal.push(...data.data);

        console.log(this.animeSeasonal);
      });
    }

    this.jikan.getSeasonalAnime(year, season, '').subscribe((data) => {
      this.total = data.pagination.items.total;
      this.perPage = data.pagination.items.per_page;
    });
  }

  getSeasonalAnime(year: any, season: any, page: any = 0) {
    this.jikan.getSeasonalAnime(year, season, page + 1).subscribe((data) => {
      this.animeSeasonal = data.data;
      this.total = data.pagination.items.total;
      this.perPage = data.pagination.items.per_page;
      console.log(this.animeSeasonal);
    });
  }

  getSearchAnime(q: any, page: any) {
    this.jikan.getSearchAnime(q, page + 1).subscribe((data) => {
      this.total = data.pagination.items.total;
      this.perPage = data.pagination.items.per_page;
      this.animeSeasonal = data.data;
    });
  }

  getAnimeDetailById(id: any) {
    this.jikan.getAnimeDetail(id).subscribe((data) => {
      this.animeById = data;
    });
  }

  getAnimeDetail(emitid: any) {
    this.jikan.getAnimeDetail(emitid).subscribe((data) => {
      this.anime.background = data.background;
      this.anime.title = data.title;
      this.anime.sinopsis = data.synopsis;
      this.anime.episodes = data.episodes;
      this.anime.premiered = data.premiered;
      this.anime.image_url = data.image_url;
      this.anime.score = data.score;
    });
  }
}
