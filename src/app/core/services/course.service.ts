import { Injectable } from '@angular/core';
import { Course } from '../entities';
import { Observable } from 'rxjs';
import {
  Http, Request, RequestMethod, RequestOptions, Response
} from '@angular/http';

@Injectable()
export class CourseService {
  private outdatedPeriod = 14 * 24 * 60 * 60 * 1000;
  private url: string = 'http://localhost:2403/courses';

  public constructor(private http: Http) {
  }

  public getAll(page: number = 1, itemsPerPage: number = 3): Observable<Course[]> {
    const query = {
      $limit: itemsPerPage,
      $skip: (page - 1) * itemsPerPage,
      $sort: { date: 1 }
    };
    const request = new Request(this.getRequestOptions(query));

    return this.http.request(request)
      .map((response: Response): Course[] => this.convertToJson(response))
      .map(courses => courses.map(course => {
          course.date = new Date(course.date);
          return course;
        })
      );
  }

  public count(): Observable<number> {
    const request = new Request(this.getRequestOptions());

    return this.http.request(request)
      .map((response: Response) => this.convertToJson(response))
      .map((response): number => response.length);
  }

  public getById(id: number) {
    //
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

  private get freshPeriodStart(): number {
    return new Date().getTime() - this.outdatedPeriod;
  }

  private getRequestOptions(query = {}) {
    const requestOptions = new RequestOptions();
    const wholeQuery = Object.assign({}, query, this.freshnessCondition);

    requestOptions.url = `${this.url}?${JSON.stringify(wholeQuery)}`;
    requestOptions.method = RequestMethod.Get;

    return requestOptions;
  }

  private get freshnessCondition() {
    return {
      date: {
        $gte: this.freshPeriodStart
      }
    };
  }

  private convertToJson(response: Response) {
    return response.status === 200 ? response.json() : [];
  }
}
