import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import template from './logo.component.html';

@Component({
  template,
  selector: 'header-logo',
  styles: [require('./logo.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  @Output() private onClick = new EventEmitter();

  public handleClick(e): void {
    e.preventDefault();
    this.onClick.emit();
  }
}
