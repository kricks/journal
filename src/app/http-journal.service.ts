import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpJournalService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAll(): Observable<any> {
    return this.auth.user.pipe(take(1), exhaustMap(user => {
      return this.http.get(
        'https://sample-app-88fdd.firebaseio.com/entries.json',
        {
          params: new HttpParams().set('auth', user.token)
        }
      );
    }));
  }


}
