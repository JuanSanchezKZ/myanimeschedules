import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { apiUrl } from 'src/environments/environment';

@Component({
  selector: 'app-anime-register',
  templateUrl: './anime-register.component.html',
  styleUrls: ['./anime-register.component.css'],
})
export class AnimeRegisterComponent implements OnInit {
  formUser = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.formUser.valid) {
      const name = this.formUser.value.name;
      const email = this.formUser.value.email;
      const password = this.formUser.value.password;

      this.http
        .post(`${apiUrl}profile/`, {
          email: email,
          name: name,
          password: password,
        })
        .subscribe((data) => console.log(data));
    }
  }

  ngOnInit(): void {}
}
