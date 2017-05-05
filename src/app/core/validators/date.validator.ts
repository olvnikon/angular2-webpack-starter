import { FormControl } from '@angular/forms';

export function validateDate(control: FormControl): { [key: string]: boolean } {
  if (!control.value || control.value.length === 0) {
    return null;
  }

  const dateRegexp = new RegExp(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/);
  return isCorrectDate(control.value) && dateRegexp.test(control.value) ?
    null : { invalidDate: true };
}

function isCorrectDate(date: string) {
  const dayMonthYear = date.split('/');
  const year = Number(dayMonthYear[2]);
  const month = Number(dayMonthYear[1]) - 1;
  const day = Number(dayMonthYear[0]) - 1;

  return !isNaN(new Date(year, month, day).getTime());
}
