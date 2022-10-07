import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      .post('http://127.0.0.1:8000/api/login/', {
        username: email,
        password: password,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  ngOnInit(): void {}
}
