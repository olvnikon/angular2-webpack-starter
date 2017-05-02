import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare const $: any;

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
                      #select
                      name="{{nameOption}}">
                  <option *ngFor="let author of authors" [value]="author.name">
                      {{author.name}}
                  </option>
              </select>
          </div>
      </div>
  `,
  providers: [CUSTOM_AUTHORS_CONTROL_ACCESSOR],
})
export class AuthorsControlComponent implements ControlValueAccessor, AfterViewInit {
  @Input() public authors: string[];
  @Input() public nameOption: string[];
  @ViewChild('select') public select: ElementRef;
  private currentValue: string[];

  public onChange = val => val;
  public onTouched = () => 1;

  public get value(): string[] {
    return this.currentValue;
  }

  public set value(newValue: string[]) {
    this.currentValue = newValue;
    this.onChange(newValue);
  }

  public writeValue(value: string[]): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public ngAfterViewInit() {
    $(this.select.nativeElement).bootstrapDualListbox();
    $(this.select.nativeElement).on('change', () => {
      this.writeValue($(this.select.nativeElement).val());
    });
  }
}
