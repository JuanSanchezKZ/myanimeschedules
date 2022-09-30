import { ActionReducerMap } from '@ngrx/store';
import { scheduleState } from './interfaces/appstate.interface';
import { appReducer } from './reducers/reducers';

export interface AppState {
  scheduleState: scheduleState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  scheduleState: appReducer,
};
