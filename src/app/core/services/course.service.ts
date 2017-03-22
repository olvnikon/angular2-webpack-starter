import { Injectable } from '@angular/core';
import { Course } from '../../core/entities';

let courses = [
  {
    id: 1,
    name: 'Video course 1',
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
    id: 2,
    name: 'Video course 2',
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
    id: 3,
    name: 'Video course 3',
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
let lastInsertId = 3;

@Injectable()
export class CourseService {
  public getAll(): Course[] {
    return [...courses];
  }

  public getById(id: number): Course {
    const foundCourse = courses
      .filter(course => (id === course.id));
    return foundCourse.length ?
      { ...foundCourse[0] } : null;
  }

  public create(course: Course): void {
    course.id = lastInsertId++;
    courses = [...this.getAll(), course];
  }

  public update(course: Course): void {
    courses = courses.map((c) => {
        if (c.id === course.id) {
          return { ...course };
        }
        return c;
      }
    );
  }

  public remove(course: Course): void {
    courses = courses.filter(c => (c.id !== course.id));
  }
}
