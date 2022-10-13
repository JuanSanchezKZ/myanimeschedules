import { Component, OnInit } from '@angular/core';

import { JikanService } from 'src/app/jikan.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-anime-searcher',
  templateUrl: './anime-searcher.component.html',
  styleUrls: ['./anime-searcher.component.css'],
})
export class AnimeSearcherComponent implements OnInit {
  cardData: any;
  constructor(private api: JikanService) {}

  ngOnInit(): void {
    this.api.getSeasonalAnime('2022', 'fall', '1').subscribe((data: any) => {
      this.cardData = data.data;
    });
    this.api.getSeasonalAnime('2022', 'fall', '2').subscribe((data: any) => {
      this.cardData.push(...data.data);
    });
  }
}
