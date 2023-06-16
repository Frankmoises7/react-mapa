import { PlacesProvider} from './context'
import { HomeScreen } from './pages'
import { MapProvider } from './context'
import './style.css'

export const GeoBikes = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  )
}
