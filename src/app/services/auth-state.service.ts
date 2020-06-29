import { ModalService } from './../modal/modal.service';
import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  idleState = 'Not started';
  timedOut = false;
  lastPing: Date = null;
  value;

  private userLoggedIn = new Subject<boolean>();
  userLoggedIn$ = this.userLoggedIn.asObservable();

  private authStatus = new BehaviorSubject<any>(this.value);
  authStatus$ = this.authStatus.asObservable();

  constructor(
    private idle: Idle,
    private keepAlive: Keepalive,
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  isLoggedIn(value: boolean) {
    this.userLoggedIn.next(value);
    console.log(value);

    if (value === true) {
      this.setIdle();
    }
  }

  sendAuthStatus(data) {
    this.authStatus.next(data);
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
      this.reset();
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out';
      this.modalService.closeModal();
      this.timedOut = true;
      console.log(this.idleState);
      this.authService.logout();
    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You are idle';
      console.log(this.idleState);
      this.modalService.openModal();
    });

    this.idle.onTimeoutWarning.subscribe((time) => {
      this.idleState = 'You will time out in ' + time + ' secconds';
      console.log(this.idleState);
      this.sendAuthStatus(this.idleState);
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

    this.userLoggedIn$.subscribe((status) => {
      console.log('get user subscribe');
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

}
