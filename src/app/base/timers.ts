import { OpaqueToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const SetupCompleted: OpaqueToken = new OpaqueToken('SetupCompleted');

export function getSetupCompletedTimer(): BehaviorSubject<boolean> {
  return new BehaviorSubject(false);
}
