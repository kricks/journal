
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  extendSession() {
  }

  logOut() {
   
  }

}
