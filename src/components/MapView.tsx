import { useContext, useLayoutEffect, useRef } from "react"
import { MapContext, PlacesContext } from "../context"
import { Loading } from "./"
import { Map } from "mapbox-gl"


export const MapView = () => {

  const { isLoading, userLocation} = useContext( PlacesContext)
  const { setMap } = useContext(MapContext)
  const mapDiv = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if( !isLoading ) {
      const map = new Map({
        container: mapDiv.current!, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
        });

        setMap( map )
    }
    // eslint-disable-next-line
  }, [isLoading])

  if ( isLoading ) {
    return (<Loading />)
  }

  return (
    <div ref={mapDiv}
    style={{
      backgroundColor: 'red',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0 
    }}
    >

      { userLocation?.join(", ") }
    </div>
  )
}
