import { Component, OnInit } from '@angular/core';

import { JikanService } from 'src/app/jikan.service';

@Component({
  selector: 'app-anime-wrapper',
  templateUrl: './anime-wrapper.component.html',
  styleUrls: ['./anime-wrapper.component.css'],
})
export class AnimeWrapperComponent implements OnInit {
  cardData: any;
  constructor() {}

  ngOnInit(): void {}
}
