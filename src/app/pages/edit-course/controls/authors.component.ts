import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_AUTHORS_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AuthorsControlComponent),
  multi: true,
};

@Component({
  selector: 'authors-control',
  template: `
      <div class="form-group">
          <label for="courseAuthors" class="col-sm-2 control-label">Authors</label>
          <div class="col-sm-10">
              <select multiple="multiple"
                      id="courseAuthors"
                      size="5"
                      (change)="setValue($event)"
                      dual-box>
                  <option *ngFor="let author of authors"
                          [value]="author.name"
                          [selected]="author.isSelected"
                  >{{author.name}}</option>
              </select>
          </div>
      </div>
  `,
  providers: [CUSTOM_AUTHORS_CONTROL_ACCESSOR],
})
export class AuthorsControlComponent implements ControlValueAccessor {
  @Input() public authors: string[];
  public currentValue: any;
  public onChange = (val) => {};
  public onTouched = () => {};

  public setValue(item) {
    console.log(item);
    this.value = item.target.value;
  }

  public get value() {
    return this.currentValue;
  }

  public set value(newValue) {
    this.currentValue = newValue;
    this.onChange(newValue);
  }

  public writeValue(value: string) {
    if (value !== this.currentValue) {
      this.currentValue = value;
    }
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
