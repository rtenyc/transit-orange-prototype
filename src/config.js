export const mapboxAccessToken = 'pk.eyJ1IjoiZXJpY3J0ZSIsImEiOiJjanh5cmhvMTQwMnRuM21xczVrczlxMjN2In0.-b1kRpcWg52iFTcPFferTw';
export const mapboxStyleUrl = 'mapbox://styles/ericrte/cjxyri6ya0x1s1cocb4py33do/draft';

export const layers = [
  {
    id: 'dial_a_ride',
    mapboxLayers: ['dial_a_ride'],
    name: 'Dial-a-Ride',
    selected: true
  },
  {
    id: 'fixed_route',
    mapboxLayers: [
      'kiryas-joel-routes-2orsdt',
      'kiryas-joel-stops-2uc4i2'
    ],
    name: 'Fixed Route',
    selected: true
  },
  {
    id: 'park_and_ride',
    mapboxLayers: [],
    name: 'Park and Ride',
    selected: true
  }
];

export const towns = [
  {
    name: 'Newburgh',
    center: [-74.022, 41.515],
    zoom: [11.5]
  },
  {
    name: 'Port Jervis',
    center: [-74.679, 41.369],
    zoom: [12.5]
  }
];
