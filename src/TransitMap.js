import React, { useState } from 'react';
import ReactMapboxGl, { ZoomControl } from "react-mapbox-gl";
import { useSelector } from 'react-redux';

import { mapboxAccessToken, mapboxStyles, towns } from './config';
import LayerSelector from './LayerSelector';
import TimeSelector from './TimeSelector';
import TownSelector from './TownSelector';

const Map = ReactMapboxGl({
  accessToken: mapboxAccessToken
});

export default function TransitMap(props) {
  const [center, setCenter] = useState([-74.3389, 41.386]);
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState([10]);
  const layers = useSelector(state => state.layers);
  const { dayOfWeek, timeOfDay } = useSelector(state => state.time);

  function filterByTime(map, layers, dayOfWeek, timeOfDay) {
    layers.forEach(({ mapboxLayers }) => {
      mapboxLayers.forEach(mapboxId => {
        if (map.getLayer(mapboxId)) {
          const prefix = dayOfWeek.replace('day', '').toLowerCase();
          const filter = ['all',
            ['<=', `${prefix}_min`, timeOfDay],
            ['>=', `${prefix}_max`, timeOfDay]
          ];
          map.setFilter(mapboxId, filter);
        }
      });
    });
  }

  function updateLayerVisibility(map, layers) {
    layers.forEach(({ mapboxLayers, selected }) => {
      mapboxLayers.forEach(mapboxId => {
        if (map.getLayer(mapboxId)) {
          map.setLayoutProperty(mapboxId, 'visibility', selected ? 'visible' : 'none');
        }
      });
    });
  }

  if (map && layers) {
    updateLayerVisibility(map, layers);
  }

  if (map && layers && dayOfWeek && timeOfDay) {
    filterByTime(map, layers, dayOfWeek, timeOfDay);
  }

  return (
    <Map
      // eslint-disable-next-line
      style={mapboxStyles.geographic}
      center={center}
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}
      onStyleLoad={setMap}
      zoom={zoom}
    >

      <ZoomControl />

      <TownSelector
        onChange={value => {
          const { center, zoom } = towns.filter(town => town.name === value)[0];
          setCenter(center);
          setZoom(zoom);
        }}
        towns={towns.map(town => town.name)}
      />

      <LayerSelector />
      <TimeSelector />

    </Map>
  );
}
