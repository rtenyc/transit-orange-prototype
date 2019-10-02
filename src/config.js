export const mapboxAccessToken = 'pk.eyJ1IjoiZXJpY3J0ZSIsImEiOiJjanh5cmhvMTQwMnRuM21xczVrczlxMjN2In0.-b1kRpcWg52iFTcPFferTw';
export const mapboxStyles = {
  geographic: 'mapbox://styles/ericrte/cjxyri6ya0x1s1cocb4py33do/draft',
  schematic: 'mapbox://styles/ericrte/cjzoiwq1p2p6y1co14y4rd1kl/draft'
}

export const layers = [
  {
    id: 'dial_a_ride',
    mapboxLayers: [
      'dial_a_ride',
      'dial-a-ride-diagram'
    ],
    name: 'Dial-a-Ride',
    selected: true
  },
  {
    id: 'fixed_route',
    mapboxLayers: [
      'fixed-routes-diagram',
      'fixed-routes-geographic',
    ],
    name: 'Fixed Route',
    selected: true
  },
  {
    id: 'park_and_ride',
    mapboxLayers: [],
    name: 'Park and Ride',
    selected: false
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
