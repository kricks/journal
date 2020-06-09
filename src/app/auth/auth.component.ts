import { AuthService } from './auth.service';
import { AuthResponseData } from './../journal/auth-response-data';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpJournalService } from '../http-journal.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
     authObs = this.auth.login(email, password);
    } else {
      authObs = this.auth.signup(email, password);
    }

    authObs.subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(['/list']);
      },
      (error) => {
        console.log(error);
        this.error = error;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
