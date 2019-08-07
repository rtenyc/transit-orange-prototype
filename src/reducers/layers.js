import { layers } from '../config';
import * as actions from '../actions';

export default (state = layers, action) => {
  switch (action.type) {
    case actions.TOGGLE_LAYER:
      return state.map(layer =>
        (layer.id === action.layer)
          ? { ...layer, selected: action.selected }
          : layer
      );
    default:
      return state;
  }
}
