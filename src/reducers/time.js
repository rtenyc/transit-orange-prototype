import moment from 'moment';

import * as actions from '../actions';

const now = moment();

const DEFAULT_STATE = {
  dayOfWeek: now.format('dddd'),
  timeOfDay: now.format('hhmm')
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actions.SET_DAY_OF_WEEK:
      return {
        ...state,
        dayOfWeek: action.value
      };
    case actions.SET_TIME_OF_DAY:
      return {
        ...state,
        timeOfDay: action.value
      };
    default:
      return state;
  }
}
