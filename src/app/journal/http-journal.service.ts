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
    );
  }

  // get all by user ID
  // 'https://sample-app-88fdd.firebaseio.com/{uId}/entries.json'

  // create
  create(date, entry): Observable<any> {
    console.log(JSON.parse(date));
    console.log(entry + " " + date);
    return this.http.post(
      'https://sample-app-88fdd.firebaseio.com/entries.json',
      {
        date,
        entry
      }
    );
  }

  // update

  // delete
}
