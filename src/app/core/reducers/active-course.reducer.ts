import { Action, ActionReducer } from '@ngrx/store';
import { Course } from '../entities/course';

export const LOAD_ONE = 'load';

export const activeCourseReducer: ActionReducer<Course> = (store: Course, action: Action) => {
  switch (action.type) {
    case LOAD_ONE:
      const course: Course = {...action.payload};
      course.date = new Date(course.date);
      course.authors = course.authors || [];
      return course;
    default:
      return store;
  }
};
