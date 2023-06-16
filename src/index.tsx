import React from 'react';
import ReactDOM from 'react-dom/client';
import { GeoBikes } from './GeoBikes';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

//const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmttb2lzZXM3IiwiYSI6ImNsaW83ZHFtcDBob3YzbW8ybXdrbWZhaGEifQ.OlEN2KJo4fqUMNMSZNAa4w'

if( !navigator.geolocation ) {
  alert( 'Geolocation is not supported by your browser' );
  throw new Error('Geolocation is not supported by your browser')
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GeoBikes />
  </React.StrictMode>
);

