import { Injectable } from '@angular/core';
import { Course } from '../entities';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';

@Injectable()
export class CourseService {
  private outdatedPeriod = 14 * 24 * 60 * 60 * 1000;

  public constructor(private http: Http) {}

  public getAll(): Observable<Course[]> {
    return this.http.get('http://localhost:2403/courses')
      .map((response: Response): Course[] => (
        response.status === 200 ? response.json() : []
    ));
  }

  public getById(id: number) {
    return this.http.get('http://localhost:2403/courses')
      .map((response: Response): Course[] => (
        response.status === 200 ? response.json() : []
      ));
  }

  public create(course: Course): void {
    //
  }

  public update(course: Course): void {
    //
  }

  public remove(course: Course): void {
    //
  }
}
