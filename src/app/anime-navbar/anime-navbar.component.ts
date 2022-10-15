import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.guard';

@Component({
  selector: 'app-anime-navbar',
  templateUrl: './anime-navbar.component.html',
  styleUrls: ['./anime-navbar.component.css'],
})
export class AnimeNavbarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  constructor(private authService: AuthService) {}

  logOut() {
    localStorage.removeItem('userToken');
    this.authService.logout();
  }

  ngOnInit(): void {
    if (localStorage.getItem('userToken')) {
      this.authService.login();
    } else {
      this.authService.logout();
    }
    
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
}
