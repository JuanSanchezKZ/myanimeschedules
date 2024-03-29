import { Component, Input, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/app.state';
import { selectSearchAnime } from 'src/store/selectors/selector';
import { JikanService } from '../jikan.service';
import { ModalComponent } from '../modal/modal.component';
import { Overlay } from '@angular/cdk/overlay';
import { concat, debounceTime, delay, distinctUntilChanged, forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css'],
})
export class AnimeCardComponent implements OnInit {
  cardData: any[] = []

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private api: JikanService,
    private overlay: Overlay
  ) {}

  openDialog(data: any) {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    this.dialog.open(ModalComponent, {
      data: {
        title: data.title,
        synopsis: data.synopsis,
        image: data.images.jpg.image_url,
        broadcast: data.aired.prop.from,
        broadcastTime: data.broadcast.time,
        storage: data,
      },
      autoFocus: false,
      scrollStrategy,
    });
  }

  fillCards() {

  const getSeasonalAnimeFirstPage = this.api.getSeasonalAnime('1')
  const getSeasonalAnimeSecondPage = this.api.getSeasonalAnime('2')
   
 
  
  concat(getSeasonalAnimeFirstPage, getSeasonalAnimeSecondPage).subscribe((data) => {
    
    this.cardData.push(...data.data)
    this.cardData = this.cardData.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.title === value.title 
    ))
  )} )

  }

  ngOnInit(): void {
    
    this.store.select(selectSearchAnime).subscribe((data) => {
      
      data
        ? (this.cardData = this.cardData.filter(
            (s: any) => s.title.toLowerCase().indexOf(data.toLowerCase()) != -1
          ))
        : this.fillCards();
    });
    

  }
}
