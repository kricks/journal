import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Journal } from '../journal.model';
import { HttpJournalService } from '../http-journal.service';


@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  entries: Observable<Journal[]>;
  entry: Journal = new Journal();

  constructor(private service: HttpJournalService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(data => {
      console.log(data);
      this.entries = data;
    });
  }

}
