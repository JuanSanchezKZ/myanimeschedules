import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AnimeLoginComponent } from './anime-login/anime-login.component';
import { AnimeRegisterComponent } from './anime-register/anime-register.component';
import { AnimeWrapperComponent } from './anime/anime-wrapper/anime-wrapper.component';
import { AnimeguardGuard } from './animeguard.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AnimeguardGuard],
    component: AnimeWrapperComponent,
  },
  { path: 'login', component: AnimeLoginComponent },
  { path: 'register', component: AnimeRegisterComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
