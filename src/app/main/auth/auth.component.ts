import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';

interface TokenResponse {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  pass = '123456';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private data: DataService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.value.password === this.pass) {
      localStorage.setItem('password', this.pass);
      this.router.navigate(['/']);
      this.data.setUser(this.loginForm.value.userName);
    }
    this.http
      .post<TokenResponse>('http://localhost:3000/login', this.loginForm.value)
      .subscribe((res) => {
        localStorage.setItem('access-token', res.token);
      });
  }
}
