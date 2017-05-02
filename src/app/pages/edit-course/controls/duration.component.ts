import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_DURATION_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DurationControlComponent),
  multi: true,
};

@Component({
  selector: 'duration-control',
  template: `
      <div class="form-group">
          <label for="courseDuration" class="col-sm-2 control-label">Duration</label>
          <div class="col-sm-10">
              <div class="input-group">
                  <input type="text"
                         (keyup)="setValue($event)"
                         [value]="value"
                         name="{{nameOption}}"
                         class="form-control"
                         id="courseDuration"
                         placeholder="Duration"/>
                  <span class="input-group-addon">{{value|duration}}</span>
              </div>
          </div>
      </div>
  `,
  providers: [CUSTOM_DURATION_CONTROL_ACCESSOR],
})
export class DurationControlComponent implements ControlValueAccessor {
  @Input() public nameOption: string;
  private duration: string;

  public onChange = val => val;
  public onTouched = () => 1;

  public setValue(event): void {
    this.value = event.target.value;
  }

  public get value(): string {
    return this.duration;
  }

  public set value(newValue) {
    this.duration = newValue;
    this.onChange(newValue);
  }

  public writeValue(value: string): void {
    if (value !== this.duration) {
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
