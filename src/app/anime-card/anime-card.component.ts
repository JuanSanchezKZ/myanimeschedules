import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/app.state';
import { selectSearchAnime } from 'src/store/selectors/selector';
import { JikanService } from '../jikan.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css'],
})
export class AnimeCardComponent implements OnInit {
  cardData: any;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private api: JikanService
  ) {}

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

  fillCards() {
    this.api.getSeasonalAnime('2023', 'spring', '1').subscribe((data: any) => {
      this.cardData = data.data;
      this.api
        .getSeasonalAnime('2023', 'spring', '2')
        .subscribe((data: any) => {
          this.cardData.push(...data.data);
        });
    });
  }

  ngOnInit(): void {
    this.fillCards();
    this.store.select(selectSearchAnime).subscribe((data) => {
      data
        ? (this.cardData = this.cardData.filter(
            (s: any) => s.title.toLowerCase().indexOf(data.toLowerCase()) != -1
          ))
        : this.fillCards();
    });
  }
}
