import { Injectable } from '@angular/core';
import { Course } from '../../core/entities';
import { BehaviorSubject, Observable } from 'rxjs';

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
const delay = 2000;

@Injectable()
export class CourseService {
  private courses = <BehaviorSubject<Course[]>> new BehaviorSubject([]);

  constructor() {
    this.updateCourses();
  }

  public getAll(): Observable<Course[]> {
    return this.courses.asObservable();
  }

  public getById(id: number): Observable<Course> {
    return this
      .courses
      .map(allCourses => allCourses.find(course => course.id === id));
  }

  public create(course: Course): void {
    course.id = lastInsertId++;
    courses = [...courses, course];
    this.updateCourses();
  }

  public update(course: Course): void {
    courses = courses.map((c) => (c.id === course.id ? { ...course } : c));
    this.updateCourses();
  }

  public remove(course: Course): void {
    courses = courses.filter(c => (c.id !== course.id));
    this.updateCourses();
  }

  private updateCourses() {
    setTimeout(() => this.courses.next([...courses]), delay);
  }
}
