import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anime-navbar',
  templateUrl: './anime-navbar.component.html',
  styleUrls: ['./anime-navbar.component.css'],
})
export class AnimeNavbarComponent implements OnInit {
  isLogged = localStorage.getItem('userToken');
  constructor(private router: Router) {}

  logOut() {
    localStorage.removeItem('userToken');
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {}
}
