import { useContext, useEffect, useReducer } from "react";
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";

import { mapReducer } from "./mapReducer";
import { MapContext } from "./MapContext";
import { PlacesContext } from "../";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, distpach] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popUp = new Popup().setHTML(`
          <h6>${place.text_es}</h6>
          <p>${place.place_name_es}</p>
        `);

      const newMarker = new Marker()
        .setPopup(popUp)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    //Todo: limpiar POLYLINE

    distpach({ type: "setMarkers", payload: newMarkers });
    // eslint-disable-next-line
  }, [places]);

  const myLocationPopup = new Popup().setHTML(`
  <h4> Aquí estoy </h4>
  <p>En algun lugar del mundo</p>
  <a href="www.google.com" target="_blank"> click aqui</a>
  `);

  const setMap = (map: Map) => {
    new Marker({
      color: "red",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    distpach({ type: "setMap", payload: map });
  };

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;

    let kms = Math.round((distance / 1000) * 100) / 100;
    const minutes = Math.floor(duration / 60);
    console.log({ kms, minutes });

    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 50,
    });

    //Polyline

    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };


    if(state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
    }

  state.map?.addSource('RouteString', sourceData)

  state.map?.addLayer({
    id: 'RouteString',
    type: 'line',
    source: 'RouteString',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
          'line-color': 'red',
          'line-width': 2,
        },
  });
  };



  return (
    <MapContext.Provider
      value={{
        ...state,
        //Methods
        setMap,
        getRouteBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
