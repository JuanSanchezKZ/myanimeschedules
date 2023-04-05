import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiUrl } from 'src/environments/constants';

@Component({
  selector: 'app-anime-register',
  templateUrl: './anime-register.component.html',
  styleUrls: ['./anime-register.component.css'],
})
export class AnimeRegisterComponent implements OnInit {
  formUser = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.formUser.valid) {
      const name = this.formUser.value.name;
      const email = this.formUser.value.email;
      const password = this.formUser.value.password;

      this.http
        .post(`${apiUrl}/api/profile/`, {
          email: email,
          name: name,
          password: password,
        })
        .subscribe({
          next: (response: any) => {
            this.router.navigateByUrl('login');
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }

  ngOnInit(): void {}
}
