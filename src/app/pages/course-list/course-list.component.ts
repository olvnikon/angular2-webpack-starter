import { Component, Input } from '@angular/core';
import { Course } from '../../core/entities';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styles: [require('./course-list.component.scss')],
})
export class CourseListComponent {
  @Input() private courses: Course[];

  constructor() {
    this.courses = [
      {
        id: 1, name: 'Video course 1',
        date: new Date(),
        duration: '1h 28m',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
         quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
         nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
         officia deserunt mollit anim id est laborum.`
      },
      {
        id: 2, name: 'Video course 2',
        date: new Date(),
        duration: '15m',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
         quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
         nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
         officia deserunt mollit anim id est laborum.`
      },
      {
        id: 3, name: 'Video course 3',
        date: new Date(),
        duration: '2h 15m',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
         quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
         nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
         officia deserunt mollit anim id est laborum.`
      }
    ];
  }

  public deleteCourse(course: Course) {
    console.log(course.id);
  }
}
