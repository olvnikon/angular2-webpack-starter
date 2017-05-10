import { FormControl } from '@angular/forms';

export function atLeastOne(control: FormControl): { [key: string]: boolean } {
  return !control.value || control.value.length < 1 ?
    { lessThanOne: true } : null;
}
