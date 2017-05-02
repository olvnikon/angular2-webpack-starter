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
                     name="{{nameOption}}"
                     (keyup)="setValue($event)"
                     [value]="value"
                     class="form-control"
                     id="courseDate"
                     placeholder="Date"/>
          </div>
      </div>
  `,
  providers: [CUSTOM_DATE_CONTROL_ACCESSOR],
})
export class DateControlComponent implements ControlValueAccessor {
  @Input() public nameOption: string;
  private date: string;

  public onChange = val => val;
  public onTouched = () => 1;

  public setValue(event): void {
    this.value = event.target.value;
  }

  public get value(): string {
    return this.date;
  }

  public set value(newValue) {
    this.date = newValue;
    this.onChange(newValue);
  }

  public writeValue(value: string): void {
    if (value !== this.date) {
      this.value = value;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
