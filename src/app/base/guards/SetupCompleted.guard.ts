import { Inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SetupCompleted } from '../timers';

@Injectable()
export class SetupCompletedGuard implements CanActivate {

  constructor(@Inject(SetupCompleted) private setupCompleted$: BehaviorSubject<boolean>) {}

  canActivate() {
    return this.setupCompleted$
      .filter(val => val)
      .first()
      // wait for the router outlet to be present in App.tpl.html
      .delay(1);
  }

}
