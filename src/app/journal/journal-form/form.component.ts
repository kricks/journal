import { Journal } from './../journal.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpJournalService } from '../http-journal.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  journal: Journal = new Journal();

  constructor(
    private service: HttpJournalService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form =  this.fb.group({
      entryId: null,
      date: null,
      entry: null
    });
  }

  saveForm(form) {
    this.form = form;
    console.log(this.form.value);
    this.service.create(this.form.value).subscribe();
  }
}
