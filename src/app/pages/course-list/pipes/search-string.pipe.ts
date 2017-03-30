import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../../core/entities';

@Pipe({
  name: 'searchString',
  pure: true
})
export class SearchStringPipe implements PipeTransform {
  public transform(courses: Course[], filterString: string = ''): Course[] {
    if (filterString.trim().length === 0) {
      return courses;
    }

    return courses.filter(course => (
      course.name.toLocaleLowerCase().indexOf(filterString.toLocaleLowerCase()) !== -1
    ));
  }
}
