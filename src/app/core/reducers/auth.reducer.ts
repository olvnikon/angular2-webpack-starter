import { ActionReducer, Action } from '@ngrx/store';
import { LoggedUser } from '../entities/loggedUser';

export const LOG_IN = 'log_in';
export const LOG_OUT = 'log_out';

export const authReducer: ActionReducer<LoggedUser> = (store: LoggedUser = null,
                                                       action: Action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...action.payload };
    case LOG_OUT:
      return null;
    default:
      return store;
  }
};
