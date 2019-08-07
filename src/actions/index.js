export const TOGGLE_LAYER = 'TOGGLE_LAYER';

export const toggleLayer = (layer, selected) => ({
  type: TOGGLE_LAYER,
  layer,
  selected
});
