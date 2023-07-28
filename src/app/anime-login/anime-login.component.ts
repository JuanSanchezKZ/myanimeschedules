import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { apiUrl } from 'src/environments/constants';
import { AuthService } from '../auth.guard';

@Component({
  selector: 'app-anime-login',
  templateUrl: './anime-login.component.html',
  styleUrls: ['./anime-login.component.scss'],
})
export class AnimeLoginComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}

  formUser = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  error: string = ''

  onSubmit() {
    const email = this.formUser.value.email;
    const password = this.formUser.value.password;
    if (this.formUser.valid) {
      this.http
        .post(`${apiUrl}/api/login/`, {
          username: email,
          password: password,
        })
        .subscribe({
          next: (response: any) => {
            localStorage.setItem('userToken', response.token);
            this.authService.login();
          },
          error: (error) => {
            this.error = error.error.non_field_errors[0]
            console.log(error)
          },
        });
    }
  }

  ngOnInit(): void {}
}
