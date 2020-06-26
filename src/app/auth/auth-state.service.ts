import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal/modal.component';
import { Injectable, ViewChild } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subject, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  userLoggedIn = new Subject<boolean>();
  idleState = 'Not started';
  timedOut = false;
  lastPing: Date = null;
  @ViewChild('modal', { static: false }) modal: ModalComponent;

  constructor(private idle: Idle, private keepAlive: Keepalive, private dialog: MatDialog) {
    this.setIdle();
  }

  isLoggedIn() {
    this.userLoggedIn.next(false);
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
    console.log(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  setIdle() {
    // 900 would be 15 minutes
    this.idle.setIdle(5);
    // 300 would be 5 minutes
    this.idle.setTimeout(5);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'Not idle anymore';
      console.log(this.idleState);
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out';
      this.closeModal();
      this.timedOut = true;
      console.log(this.idleState);
    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You are idle';
      console.log(this.idleState);
      // thiis is where I will call modal;
      this.openModal();
    });

    this.idle.onTimeoutWarning.subscribe((time) => {
      this.idleState = 'You will time out in ' + time + ' secconds';
      console.log(this.idleState);
    });

    // sets ping interval to 15 seconds
    this.keepAlive.interval(15);

    /**
     *  // Keepalive can ping request to an HTTP location
     * to keep server session alive.
     * keepalive.request('<String URL>' or HTTP Request);
     * // Keepalive ping response can be read using below option
     */
    this.keepAlive.onPing.subscribe((t) => {
      console.log(t);
      this.lastPing = new Date();
      console.log(this.lastPing);
    });

    this.getUserLoggedIn().subscribe((status) => {
      if (status) {
        this.idle.watch();
        this.timedOut = false;
      } else {
        this.idle.stop();
      }
    });

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
    this.idleState = 'Started';
  }

  openModal() {
    console.log('opn');
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog() {
    this.dialog.closeAll();
    console.log('close');
  }

  closeModal() {

  }
}
