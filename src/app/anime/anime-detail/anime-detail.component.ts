import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetAnimeService } from '../../getanime.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css'],
})
export class AnimeDetailComponent {
  idd = new FormControl('');

  constructor(private getAnime: GetAnimeService) {}
}
