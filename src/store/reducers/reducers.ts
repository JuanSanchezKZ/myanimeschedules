import { scheduleState } from '../interfaces/appstate.interface';
import { createReducer, on } from '@ngrx/store';
import { addScheduleAction } from '../actions/actions';
export const initialState: scheduleState = {
  schedules: null,
};

export const appReducer = createReducer(
  initialState,
  on(addScheduleAction, (state, data) => {
    return { ...state, schedules: data };
  })
);
