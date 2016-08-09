import { Map } from 'immutable';

export class PresentationalComponent {
  identify(index: number, item: Map<string, any>): number {
    return item.hashCode();
  }
}
