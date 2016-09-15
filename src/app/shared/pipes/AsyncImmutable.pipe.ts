import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Pipe({
  name: 'dcsAsyncImmutable'
})
export class AsyncImmutablePipe implements PipeTransform {

  transform(observable: Observable<any>, args: string[]): any {
    if (!observable || args.length === 0) {
      return;
    }

    let returnValue: any;

    let subscription: Subscription = observable.subscribe(value => {
      returnValue = value.get(args);
    });

    subscription.unsubscribe();
    return returnValue;
  }
}
