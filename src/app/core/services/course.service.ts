import { Injectable } from '@angular/core';
import { Course } from '../entities';
import {
  Request, RequestMethod, RequestOptions, Response
} from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Backend } from './backend.service';

@Injectable()
export class CourseService {
  private outdatedPeriod = 14 * 24 * 60 * 60 * 1000;
  private url: string = 'http://localhost:2403/courses';
  private courses: BehaviorSubject<Course[]> = new BehaviorSubject([]);
  private coursesCount: BehaviorSubject<number> = new BehaviorSubject(0);

  public constructor(private http: Backend) {
  }

  public get coursesObservable() {
    return this.courses.asObservable();
  }

  public get coursesCountObservable() {
    return this.coursesCount.asObservable();
  }

  public loadAll(page = 1,
                 itemsPerPage = 3,
                 filterString = ''): void {
    const query = {
      $limit: itemsPerPage,
      $skip: (page - 1) * itemsPerPage,
      $sort: { date: 1 },
      name: { $regex: filterString, $options: 'i' },
    };
    const request = new Request(this.getRequestOptions(query));

    this.http.request(request)
      .map((response: Response): Course[] => this.convertToJson(response))
      .map(courses => courses.map(course => {
        course.date = new Date(course.date);
        return course;
      }))
      .subscribe(courses => this.courses.next(courses));
  }

  public countAll(filterString: string = ''): void {
    const query = {
      name: { $regex: filterString, $options: 'i' },
    };
    const request = new Request(this.getRequestOptions(query));

    this.http.request(request)
      .map((response: Response) => this.convertToJson(response))
      .map((response): number => response.length)
      .subscribe(count => this.coursesCount.next(count));
  }

  public getById(id: string): Observable<Course> {
    const requestOptions = new RequestOptions();
    requestOptions.url = `${this.url}/${id}`;
    requestOptions.method = RequestMethod.Get;

    return this.http.request(new Request(requestOptions))
      .map((response: Response): Course => this.convertToJson(response))
      .map(course => {
        course.date = new Date(course.date);
        return course;
      });
  }

  public create(course: Course): void {
    const requestOptions = new RequestOptions();
    requestOptions.url = this.url;
    requestOptions.method = RequestMethod.Post;
    requestOptions.body = JSON.stringify(course);

    this.http.request(new Request(requestOptions))
      .map((response: Response) => console.log(response))
      .subscribe();
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
