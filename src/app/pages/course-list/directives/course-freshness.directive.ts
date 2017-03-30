import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[courseFreshness]'
})
export class CourseFreshnessDirective implements OnInit {
  @Input() public courseFreshness: Date;
  private freshnessDaysPeriod = 14;

  constructor(private el: ElementRef, private ren: Renderer2) {

  }

  public ngOnInit() {
    this.setCourseFreshness();
  }

  private setCourseFreshness() {
    const courseDateInMS = this.courseFreshness.getTime();
    const freshnessPeriodInMS = this.freshnessDaysPeriod * 24 * 60 * 60 * 1000;
    const curDateInMS = new Date().getTime();

    if (courseDateInMS > curDateInMS) {
      this.ren.addClass(this.el.nativeElement, 'course_upcoming');
    } else if (courseDateInMS + freshnessPeriodInMS > curDateInMS) {
      this.ren.addClass(this.el.nativeElement, 'course_fresh');
    }
  }
}
