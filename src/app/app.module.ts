import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSearchIdComponent } from './form-search-id/form-search-id.component';
import { AnimeDetailComponent } from './anime/anime-detail/anime-detail.component';
import { AnimeSeasonListComponent } from './anime/anime-season-list/anime-season-list.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AnimeSearcherComponent } from './anime/anime-searcher/anime-searcher.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AnimeScheduleComponent } from './anime-schedule/anime-schedule.component';
import { AnimeNavbarComponent } from './anime-navbar/anime-navbar.component';
import { AppRoutingModule } from './app.routing.module';
import { SearchAnimeComponent } from './search-anime/search-anime.component';
import { ModalComponent } from './modal/modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { AnimeHomeComponent } from './anime-home/anime-home.component';

@NgModule({
  declarations: [
    AppComponent,
    FormSearchIdComponent,
    AnimeDetailComponent,
    AnimeSeasonListComponent,
    AnimeSearcherComponent,
    AnimeScheduleComponent,
    AnimeNavbarComponent,
    SearchAnimeComponent,
    ModalComponent,
    AnimeHomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxDatatableModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    DayPilotModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
