import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '../journal/auth-response-data';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  value;
  user = new BehaviorSubject<User>(this.value);

  constructor(private http: HttpClient) { }

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
        catchError(this.handleError),
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
    ).pipe(catchError(this.handleError));
  }

  handleAuth(email, userId, token, expiresIn) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let error = 'An unkown error!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(error);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        error = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        error = 'This email does not exists';
        break;
      case 'INVALID_PASSWORD':
        error = 'Invalid password';
        break;
    }
    return throwError(error);
  }

}
