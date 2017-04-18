import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges,
  Output
} from '@angular/core';
import template from './pagination.component.html';

@Component({
  template,
  selector: 'courses-pagination',
  styles: [require('./pagination.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {
  @Input() public totalCount: number = 0;
  @Input() public itemsPerPage: number = 0;
  @Input() public activePage = 1;
  @Output() public changePage = new EventEmitter();
  private pages = [];

  public ngOnChanges() {
    if (!this.totalCount || !this.itemsPerPage) {
      this.pages = [];
    } else {
      const pagesAmount = Math.ceil(this.totalCount / this.itemsPerPage);
      this.pages = new Array(pagesAmount);
    }
  }

  public onChangePage($event, activePage: number) {
    $event.preventDefault();
    this.changePage.emit({ activePage });
  }

  public toPreviousPage($event) {
    $event.preventDefault();
    this.changePage.emit({ activePage: this.activePage - 1 });
  }

  public toNextPage($event) {
    $event.preventDefault();
    this.changePage.emit({ activePage: this.activePage + 1 });
  }
}
