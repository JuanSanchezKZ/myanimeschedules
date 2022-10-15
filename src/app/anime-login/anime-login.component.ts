import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiUrl } from 'src/environments/environment';
import { AuthService } from '../auth.guard';

@Component({
  selector: 'app-anime-login',
  templateUrl: './anime-login.component.html',
  styleUrls: ['./anime-login.component.css'],
})
export class AnimeLoginComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}

  formUser = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const email = this.formUser.value.email;
    const password = this.formUser.value.password;
    if (this.formUser.valid) {
      this.http
        .post(`${apiUrl}login/`, {
          username: email,
          password: password,
        })
        .subscribe({
          next: (response: any) => {
            localStorage.setItem('userToken', response.token);
            this.authService.login();
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }

  ngOnInit(): void {}
}
