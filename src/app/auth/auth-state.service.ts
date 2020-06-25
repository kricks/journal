import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  userLoggedIn = new Subject<User>();
  idleState = 'Not started';
  timedOut = false;
  lastPing: Date = null;

  constructor(private idle: Idle, private keepAlive: Keepalive) { }

  setIdle() {
    this.idle.setIdle(5);
    this.idle.setTimeout(5);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
 
    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'Not idle anymore';
      console.log(this.idleState);
    });
 
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out';
      this.timedOut = true;
      console.log(this.idleState);
    });
 
    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You are idle';
      console.log(this.idleState);
      // thiis is where I will call modal;
    });
 
    this.idle.onTimeoutWarning.subscribe(time => {
      this.idleState = 'You will time out in ' + time + ' secconds';
      console.log(this.idleState);
    });
 
    this.keepAlive.interval(15);
    this.keepAlive.onPing.subscribe( (t) => {
      console.log(t);
      this.lastPing = new Date();
      console.log(this.lastPing);
    });
 
   }
}
