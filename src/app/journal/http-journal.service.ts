import { AuthResponseData } from './auth-response-data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class HttpJournalService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(
      'https://sample-app-88fdd.firebaseio.com/entries.json'
    );
  }

  signup(email: string, password: string) {
    console.log('hit');
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEPysAfaX-Vy6IOgovDXKJiiNx2DGV7D0',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((data) => {
          this.handleAuth(
            data.email,
            data.localId,
            data.idToken,
            +data.expiresIn
          );
        })
      );
  }

  login(email, password) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEPysAfaX-Vy6IOgovDXKJiiNx2DGV7D0`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }

  handleAuth(email, userId, token, expiresIn) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }
}
