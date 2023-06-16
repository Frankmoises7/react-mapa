import axios from "axios";

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit:5,
    language: 'es',
    access_token: 'pk.eyJ1IjoiZnJhbmttb2lzZXM3IiwiYSI6ImNsaW83ZHFtcDBob3YzbW8ybXdrbWZhaGEifQ.OlEN2KJo4fqUMNMSZNAa4w'
  }
})

export default searchApi