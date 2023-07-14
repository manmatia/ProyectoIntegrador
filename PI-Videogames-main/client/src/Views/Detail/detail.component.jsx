import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory} from 'react-router-dom'
import { getById } from '../../redux/actions'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import "./detail.styles.css"

function Detail() {
  const { id } = useParams();
  console.log(id)
  const dispatch = useDispatch();
  const videogameId = useSelector((state) => state.gameById);
 
const history = useHistory()
const volverHome=() => {
  history.push("/home")
}
useEffect(() => {
   dispatch(getById(id))
  
}, [dispatch, id])


  return (
    <div>
      {videogameId ? (
        <div>
          <header>
            <button  className='neon-button' onClick={volverHome}>INICIO</button>
          </header>
          <h1 className='neon-text'>NOMBRE: {videogameId.Nombre}</h1>
          <h2>ID: {videogameId.id}</h2>
          <hr /><hr />
          <img className='imagen' src={videogameId.Imagen} alt={videogameId.Nombre} />
         <br /> <br /> <span>Descripción: </span>
          <span>{videogameId.Descripcion}</span><br /><br />
          <span>Plataformas: </span>
          <span>{videogameId.Plataforma}</span><br /><br />
          <span>Generos: </span>
          <span>{videogameId.Genero}</span><br /><br />
          <span>Rating:</span>
          <span>{videogameId.Rating}</span><br /><br />
          <span>Lanzamiento:</span>
          <span>{videogameId.Lanzamiento}</span>
        </div>
      ) : (
        <p>No se encontro id </p>
      )}
    </div>
  );
}

export default Detail;