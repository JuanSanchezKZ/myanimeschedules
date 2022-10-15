import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';
import { scheduleState } from '../interfaces/appstate.interface';

export const selectAppFeature = (state: AppState) => state.scheduleState;

export const selectSchedules = createSelector(
  selectAppFeature,
  (state: scheduleState) => state.schedules
);

export const selectSearchAnime = createSelector(
  selectAppFeature,
  (state: scheduleState) => state.searchInput
);
