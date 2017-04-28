import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_DATE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateControlComponent),
  multi: true,
};

@Component({
  selector: 'date-control',
  template: `
      <div class="form-group">
          <label for="courseDate" class="col-sm-2 control-label">Date</label>
          <div class="col-sm-10">
              <input type="text"
                     (keyup)="setValue($event)"
                     [value]="date"
                     class="form-control"
                     id="courseDate"
                     placeholder="Date"/>
          </div>
      </div>
  `,
  providers: [CUSTOM_DATE_CONTROL_ACCESSOR],
})
export class DateControlComponent implements ControlValueAccessor {
  @Input() public date: string;
  public onChange = (val) => {};
  public onTouched = () => {};

  public setValue(item) {
    this.value = item.target.value;
  }

  public get value() {
    return this.date;
  }

  public set value(newValue) {
    this.date = newValue;
    this.onChange(newValue);
  }

  public writeValue(value: string) {
    if (value !== this.date) {
      this.date = value;
    }
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
