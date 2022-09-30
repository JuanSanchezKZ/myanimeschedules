import { createAction, props } from '@ngrx/store';

export const addScheduleAction = createAction(
  '[Schedule] Schedule Added',
  props<{ data: any }>()
);
