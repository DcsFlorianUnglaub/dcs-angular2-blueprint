import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class ContainerComponent implements OnDestroy {

  subscriptions: Array<Subscription> = [];

  ngOnDestroy() {
    console.log('desytoy');
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
