import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'
import { clearGameDetail, getById } from '../../redux/actions'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import "./detail.styles.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Detail() {
  const { id } = useParams();
  console.log(id)
  const dispatch = useDispatch();
  const videogameId = useSelector((state) => state.gameById);
  const [loadedGame, setLoadedGame] = useState(null);


useEffect(() => {
   dispatch(getById(id))
   return () => {
    dispatch(clearGameDetail());
  };

}, [dispatch, id])
useEffect(() => {
  return () => {
    setLoadedGame(null); // Limpiar el detalle del juego al salir de la página
  };
}, []);

const {
  Nombre,
  Plataforma,
  Lanzamiento,
  Rating,
  Genero,
  Imagen,
  Descripcion,
  
} =videogameId ;

  return (
    <div>
      {videogameId ? (
        <div>
          <Link to="/home">
            <button  className='neon-button' >INICIO</button>
          </Link>
          <h1 className='neon-text'>NOMBRE: {Nombre}</h1>
          <h2>ID: {id}</h2>
          <hr /><hr />
          <img className='imagen' src={Imagen} alt={Nombre} />
         <br /> <br /> <span>Descripción: </span>
          <span>{Descripcion}</span><br /><br />
          <span>Plataformas: </span>
          <span>{Plataforma}</span><br /><br />
          <span>Generos: </span>
          <span>{Genero}</span><br /><br />
          <span>Rating:</span>
          <span>{Rating}</span><br /><br />
          <span>Lanzamiento:</span>
          <span>{Lanzamiento}</span>
        </div>
      ) : (
        <p>No se encontro id </p>
      )}
    </div>
  );
}

export default Detail;