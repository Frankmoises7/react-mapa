

export const Loading = () => {
  return (
    <div className=" loading-map d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h3> Espere por favor </h3>
        <div className="lds-ripple"><div></div><div></div></div> <br />
        <span>Localizando...</span>
      </div>
    </div>
  )
}

