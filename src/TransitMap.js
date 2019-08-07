import React, { Component } from 'react';
import ReactMapboxGl, { ZoomControl } from "react-mapbox-gl";

import { mapboxAccessToken, mapboxStyleUrl, towns } from './config';
import TownSelector from './TownSelector';

const Map = ReactMapboxGl({
  accessToken: mapboxAccessToken
});

export default class TransitMap extends Component {
  state = {
    center: [-74.3389, 41.386],
    zoom: [10]
  }

  render() {
    const { center, zoom } = this.state;

    return (
      <Map
        // eslint-disable-next-line
        style={mapboxStyleUrl}
        center={center}
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        zoom={zoom}
      >

        <ZoomControl />
        <TownSelector
          onChange={value => {
            const { center, zoom } = towns.filter(town => town.name === value)[0];
            this.setState({ center, zoom });
          }}
          towns={towns.map(town => town.name)}
        />

      </Map>
    );
  }
}
