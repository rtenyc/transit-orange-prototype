import { combineReducers } from 'redux';
import layers from './layers';
import time from './time';

export default combineReducers({
  layers,
  time
});
