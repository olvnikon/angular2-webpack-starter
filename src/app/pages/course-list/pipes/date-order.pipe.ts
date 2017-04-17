import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../../core/entities';

@Pipe({
  name: 'orderByDate',
  pure: true,
})
export class DateOrderPipe implements PipeTransform {
  public transform(courses: Course[]): Course[] {
    return !courses || courses.length === 0 ?
      [] : courses.sort((cur, next) => (cur.date.getTime() - next.date.getTime()));
  }
}
