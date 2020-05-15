import { AuthResponseData } from './auth-response-data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpJournalService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(
      'https://sample-app-88fdd.firebaseio.com/entries.json'
    );
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEPysAfaX-Vy6IOgovDXKJiiNx2DGV7D0',
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }
}
