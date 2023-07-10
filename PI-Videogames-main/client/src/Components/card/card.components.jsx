import React from 'react'
import "./card.styles.css"
function Card({games}) {
  console.log(games)
  const{Nombre, Imagen, Genero}=games
  return (
    <div className='card-conteiner'>
     <h2>{Nombre}</h2>
    <p>-{Genero}-</p>

    <img src={Imagen}className="card-image" alt={Nombre} />
      </div>
  )
}

export default Card