import { ModalComponent } from '../modal/modal.component';
import { MatDialogModule, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
