import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimeWrapperComponent } from './anime/anime-wrapper/anime-wrapper.component';
import { AnimeScheduleComponent } from './anime-schedule/anime-schedule.component';
import { AnimeNavbarComponent } from './anime-navbar/anime-navbar.component';
import { AppRoutingModule } from './app.routing.module';
import { SearchAnimeComponent } from './search-anime/search-anime.component';
import { ModalComponent } from './modal/modal.component';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from 'src/store/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AnimeLoginComponent } from './anime-login/anime-login.component';
import { AnimeRegisterComponent } from './anime-register/anime-register.component';
import { AnimeCardComponent } from './anime-card/anime-card.component';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { AnimeScheduleCardComponent } from './anime-schedule/anime-schedule-card/anime-schedule-card.component';



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
    AnimeScheduleCardComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DayPilotModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    CdkAccordionModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
