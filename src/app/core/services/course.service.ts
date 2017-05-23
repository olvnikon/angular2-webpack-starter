import { Injectable } from '@angular/core';
import { Course } from '../entities';
import {
  Request, RequestMethod, RequestOptions, Response, Headers
} from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Backend } from './backend.service';
import { Store } from '@ngrx/store';
import { LOAD_ALL, LOAD_ONE } from '../reducers';

@Injectable()
export class CourseService {
  private outdatedPeriod = 14 * 24 * 60 * 60 * 1000;
  private url: string = 'http://localhost:2403/courses';
  private coursesCount: BehaviorSubject<number> = new BehaviorSubject(0);
  private dbCourses: Observable<Course[]> = null;
  private dbCourse: Observable<Course> = null;

  public constructor(private http: Backend, private store: Store<Course[]>) {
    this.dbCourses = this.store.select<Course[]>('courses');
    this.dbCourse = this.store.select<Course>('activeCourse');
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
    const request = new Request(this.getRequestOptionsForGET(query));

    this.http.request(request)
      .map((response: Response): Course[] => this.convertToJson(response))
      .subscribe(courses => {
        this.store.dispatch({ type: LOAD_ALL, payload: courses });
      });
  }

  public countAll(filterString: string = ''): void {
    const query = {
      name: { $regex: filterString, $options: 'i' },
    };
    const request = new Request(this.getRequestOptionsForGET(query));

    this.http.request(request)
      .map((response: Response) => this.convertToJson(response))
      .map((response): number => response.length)
      .subscribe(count => this.coursesCount.next(count));
  }

  public loadOne(id: string): void {
    const requestOptions = new RequestOptions();
    requestOptions.url = `${this.url}/${id}`;
    requestOptions.method = RequestMethod.Get;

    this.http.request(new Request(requestOptions))
      .map((response: Response): Course => this.convertToJson(response))
      .subscribe((course) => {
        this.store.dispatch({ type: LOAD_ONE, payload: course });
      });
  }

  public create(course: Course): void {
    const requestOptions = this.getRequestOptionsForSave(course);
    requestOptions.method = RequestMethod.Post;

    this.http.request(new Request(requestOptions))
      .map((response: Response): Course[] => this.convertToJson(response))
      .subscribe(createdCourse => {
        this.store.dispatch({ type: LOAD_ONE, payload: createdCourse });
      });
  }

  public update(course: Course, id: string) {
    const requestOptions = this.getRequestOptionsForSave(course);
    requestOptions.method = RequestMethod.Put;

    this.http.request(new Request(requestOptions))
      .map((response: Response): Course[] => this.convertToJson(response))
      .subscribe(updatedCourse => {
        this.store.dispatch({ type: LOAD_ONE, payload: updatedCourse });
      });
  }

  public remove(course: Course): Observable<Response> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Delete;
    requestOptions.url = `${this.url}/${course.id}`;

    return this.http.request(new Request(requestOptions));
  }

  private getRequestOptionsForSave(course: Course): RequestOptions {
    const courseToSave: any = {...course};
    courseToSave.date = courseToSave.date.getTime();
    const requestOptions = new RequestOptions();
    requestOptions.body = JSON.stringify(courseToSave);
    requestOptions.headers = new Headers({ 'Content-Type': 'application/json' });
    requestOptions.url = this.url;

    return requestOptions;
  }

  private get freshPeriodStart(): number {
    return new Date().getTime() - this.outdatedPeriod;
  }

  private getRequestOptionsForGET(query = {}) {
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
