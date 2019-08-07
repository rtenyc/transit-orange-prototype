import React, { useState } from 'react';
import ReactMapboxGl, { ZoomControl } from "react-mapbox-gl";
import { useSelector } from 'react-redux';

import { mapboxAccessToken, mapboxStyleUrl, towns } from './config';
import LayerSelector from './LayerSelector';
import TownSelector from './TownSelector';

const Map = ReactMapboxGl({
  accessToken: mapboxAccessToken
});

export default function TransitMap(props) {
  const [center, setCenter] = useState([-74.3389, 41.386]);
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState([10]);
  const layers = useSelector(state => state.layers);

  function updateLayerVisibility(map, layers) {
    layers.forEach(({ mapboxLayers, selected }) => {
      mapboxLayers.forEach(mapboxId => {
        map.setLayoutProperty(mapboxId, 'visibility', selected ? 'visible' : 'none');
      });
    });
  }

  if (map && layers) {
    updateLayerVisibility(map, layers);
  }

  return (
    <Map
      // eslint-disable-next-line
      style={mapboxStyleUrl}
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

    </Map>
  );
}
