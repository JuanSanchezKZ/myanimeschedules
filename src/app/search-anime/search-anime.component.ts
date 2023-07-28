import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppState } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { onSearchAnime } from 'src/store/actions/actions';

@Component({
  selector: 'app-search-anime',
  templateUrl: './search-anime.component.html',
  styleUrls: ['./search-anime.component.scss'],
})
export class SearchAnimeComponent implements OnInit {
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;
  constructor(private store: Store<AppState>) {}

  search() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map((event: any) => {
          return event.target.value;
        }),
        distinctUntilChanged()
      )
      .subscribe((searchData: string) => {
        this.store.dispatch(onSearchAnime({ input: searchData }));
      });
  }

  ngOnInit(): void {
    this.search();
  }
}
