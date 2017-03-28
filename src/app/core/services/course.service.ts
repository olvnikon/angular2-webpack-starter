import { Injectable } from '@angular/core';
import { Course } from '../../core/entities';
import { BehaviorSubject, Observable } from 'rxjs';
import { coursesMock } from '../mocks';

let lastInsertId = 3;
const delay = 1000;

@Injectable()
export class CourseService {
  private courses: BehaviorSubject<Course[]> = new BehaviorSubject([]);

  public get coursesObservable(): Observable<Course[]> {
    return this.courses;
  }

  public loadAll(): void {
    this.timeout(() => {
      this.courses.next([...coursesMock]);
    });
  }

  public getById(id: number): Observable<Course> {
    return this
      .coursesObservable
      .map(allCourses => allCourses.find(course => course.id === id));
  }

  public create(course: Course): void {
    this.timeout(() => {
      course.id = ++lastInsertId;
      this.courses.next([...this.courses.getValue(), course]);
    });
  }

  public update(course: Course): void {
    this.timeout(() => {
      this.courses.next(
        this.courses
          .getValue()
          .map((c) => (c.id === course.id ? { ...course } : c))
      );
    });
  }

  public remove(course: Course): void {
    this.timeout(() => {
      this.courses.next(
        this.courses
          .getValue()
          .filter(c => (c.id !== course.id))
      );
    });
  }

  private timeout(callback): void {
    setTimeout(() => callback(), delay);
  }
}
