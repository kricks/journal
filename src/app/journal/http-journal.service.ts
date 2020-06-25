import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap, map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HttpJournalService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getAll(): Observable<any> {
    return this.http.get(
      'https://sample-app-88fdd.firebaseio.com/entries.json'
    ).pipe(map(res => {
      return Object.keys(res).map((key) => {
        return res[key];
      });
    }));
  }

  test() {
    this.getAll().subscribe(data => {
      console.log(data);
    });
  }

  // get all by user ID
  // 'https://sample-app-88fdd.firebaseio.com/{uId}/entries.json'

  // create
  create(data): Observable<any> {
    return this.http.post(
      'https://sample-app-88fdd.firebaseio.com/entries.json', data
    );
  }

  // update

  // delete
}
