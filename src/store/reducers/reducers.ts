import { scheduleState } from '../interfaces/appstate.interface';
import { createReducer, on } from '@ngrx/store';
import { addScheduleAction, onSearchAnime } from '../actions/actions';
export const initialState: scheduleState = {
  schedules: null,
  searchInput: '',
};

export const appReducer = createReducer(
  initialState,
  on(addScheduleAction, (state, data) => {
    return { ...state, schedules: data };
  }),
  on(onSearchAnime, (state, { input }) => {
    return { ...state, searchInput: input };
  })
);
