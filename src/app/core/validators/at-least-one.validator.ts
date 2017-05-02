import { FormControl } from '@angular/forms';

export const atLeastOne = (control: FormControl): { [key: string]: boolean } => (
  !control.value || control.value.length < 1 ?
    { lessThanOne: true } : null
);
