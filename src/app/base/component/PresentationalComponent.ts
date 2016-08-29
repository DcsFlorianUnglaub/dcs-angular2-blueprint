import { FormGroup } from '@angular/forms';
import { Map } from 'immutable';

export class PresentationalComponent {

  identify(index: number, item: Map<string, any>): number {
    return item.hashCode();
  }

   hasError(form: FormGroup, fieldName: string, errorName?: string): boolean {
     if (form.controls[fieldName].untouched) {
       return false;
     }

    if (errorName) {
      return !!(form.controls[fieldName].errors && form.controls[fieldName].errors[errorName]);
    } else {
      return !!form.controls[fieldName].errors;
    }
  }

}
