import * as actions from '../actions';

const DEFAULT_STATE = {
  dayOfWeek: 'Monday',
  timeOfDay: '1200'
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
