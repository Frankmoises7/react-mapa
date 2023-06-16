
import axios from "axios";

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: 'pk.eyJ1IjoiZnJhbmttb2lzZXM3IiwiYSI6ImNsaW83ZHFtcDBob3YzbW8ybXdrbWZhaGEifQ.OlEN2KJo4fqUMNMSZNAa4w'
  }
})

export default directionsApi