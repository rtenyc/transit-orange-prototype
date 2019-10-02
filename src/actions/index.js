export const SET_DAY_OF_WEEK = 'SET_DAY_OF_WEEK';
export const SET_TIME_OF_DAY = 'SET_TIME_OF_DAY';
export const TOGGLE_LAYER = 'TOGGLE_LAYER';

export const setDayOfWeek = value => ({
  type: SET_DAY_OF_WEEK,
  value
});

export const setTimeOfDay = value => ({
  type: SET_TIME_OF_DAY,
  value
});

export const toggleLayer = (layer, selected) => ({
  type: TOGGLE_LAYER,
  layer,
  selected
});
