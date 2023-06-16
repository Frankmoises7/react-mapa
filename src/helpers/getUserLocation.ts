export const getUserLocation = async(): Promise<[number, number]> => {

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve([position.coords.longitude, position.coords.latitude]);
      },
      (err) => {
        alert('No se pudo obtener la geolocalizacion')
        console.log(err)
        reject()
      }
    )
  });
}