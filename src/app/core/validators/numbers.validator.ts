import { FormControl } from '@angular/forms';

export function validateNumbersOnly(control: FormControl): { [key: string]: boolean } {
  if (!control.value || control.value.length === 0) {
    return null;
  }

  return Number(control.value).toString() === control.value ?
    null : { invalidDate: true };
}
