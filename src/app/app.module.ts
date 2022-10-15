import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AnimeWrapperComponent } from './anime/anime-wrapper/anime-wrapper.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AnimeScheduleComponent } from './anime-schedule/anime-schedule.component';
import { AnimeNavbarComponent } from './anime-navbar/anime-navbar.component';
import { AppRoutingModule } from './app.routing.module';
import { SearchAnimeComponent } from './search-anime/search-anime.component';
import { ModalComponent } from './modal/modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from 'src/store/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AnimeLoginComponent } from './anime-login/anime-login.component';
import { AnimeRegisterComponent } from './anime-register/anime-register.component';
import { AnimeCardComponent } from './anime-card/anime-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    AnimeWrapperComponent,
    AnimeScheduleComponent,
    AnimeNavbarComponent,
    SearchAnimeComponent,
    ModalComponent,
    AnimeLoginComponent,
    AnimeRegisterComponent,
    AnimeCardComponent,
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
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
