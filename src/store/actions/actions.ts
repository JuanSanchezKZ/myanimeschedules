import { createAction, props } from '@ngrx/store';

export const addScheduleAction = createAction(
  '[Schedule] Schedule Added',
  props<{ data: any }>()
);

export const onSearchAnime = createAction(
  '[Schedule] Searching Anime',
  props<{ input: string }>()
);
