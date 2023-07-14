import React from 'react'
import {Link} from "react-router-dom"
import "./card.styles.css"
function Card({games}) {
  // console.log(games)
  const{Nombre, Imagen, Genero, id}=games
  return (
    <div className='card-conteiner'>
      <Link to={`/home/${id}`}>
      
     <h2>{Nombre}</h2>
    <p>-{Genero}-</p>

    <img src={Imagen}className="card-image" alt={Nombre} />
      </Link>
      </div>
  )
}

export default Card