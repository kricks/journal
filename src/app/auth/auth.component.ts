import { Router } from '@angular/router';
import { HttpJournalService } from './../journal/http-journal.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLogin = true;
  error;

  constructor(private service: HttpJournalService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLogin) {
      this.service.login(email, password).subscribe(
        (data) => {
          console.log('log in');
          console.log(data);
          this.router.navigate(['/list']);
        },
        (error) => {
          console.log('log in');
          console.log(error);
        }
      );
    } else {
      this.service.signup(email, password).subscribe(
        (data) => {
          console.log('sing up');
          console.log(data);
        },
        (error) => {
          console.log('sing up');
          console.log(error);
        }
      );
    }

    form.reset();
  }
}
