import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { apiUrl } from 'src/environments/environment';

@Component({
  selector: 'app-anime-login',
  templateUrl: './anime-login.component.html',
  styleUrls: ['./anime-login.component.css'],
})
export class AnimeLoginComponent implements OnInit {
  constructor(private http: HttpClient) {}

  formUser = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const email = this.formUser.value.email;
    const password = this.formUser.value.password;

    this.http
      .post(`${apiUrl}login/`, {
        username: email,
        password: password,
      })
      .subscribe((data: any) => {
        localStorage.setItem('userToken', data.token);
      });
  }

  ngOnInit(): void {}
}
