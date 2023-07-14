import React from 'react'
import {useHistory} from "react-router-dom"
import "./landing.styles.css" //no anda 
function Landing() {
  const history= useHistory()
  const botonclick= () => {
    history.push("/home")
  }
  return (

    <div>
      <br />
      <hr />
      <hr />
      <h1> Bienvenidos a la pagina de  </h1> 
      <h2>💥VIDEOGAMES💥</h2>
      <hr /><hr />
      <br />
    <h3> click aqui para ingresar a la pagina </h3>
    <button onClick={botonclick}>INGRESAR</button>
    
    </div>
  )
}

export default Landing         