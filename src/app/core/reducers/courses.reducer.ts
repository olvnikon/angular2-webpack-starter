import { Action, ActionReducer } from '@ngrx/store';
import { Course } from '../entities';

export const LOAD_ALL = 'load_all';

export const coursesReducer: ActionReducer<Course[]> = (store: Course[] = [],
                                                        action: Action) => {
  switch (action.type) {
    case LOAD_ALL:
      const courses: Course[] = [...action.payload];
      courses.map(course => {
        course.date = new Date(course.date);
        course.authors = course.authors || [];
        return course;
      });
      return courses;
    default:
      return store;
  }
};
