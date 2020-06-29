import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sample';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
