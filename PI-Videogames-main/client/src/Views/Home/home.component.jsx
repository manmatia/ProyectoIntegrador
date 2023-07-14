// import React from 'react'
// import { useEffect, useState } from 'react'
// import {useDispatch, useSelector} from "react-redux"
// import { getByName, getGames } from '../../redux/actions'
// import Cards from '../../Components/cards/cards.components'
// import Navbar from "../../Components/navbar/navbar.components"
// import "./home.styles.css"



// export default function Home() {
//   const dispatch=useDispatch()
//   const allGames = useSelector((state) => state.allGames);
//  const videogamesId = useSelector((state)=>state.videogamesId) //que cambie cada vez que se haga un cambio allGames se subscribe al estado global
// //! filtro con el back
// const [searchstring, setSearchstring]= useState("")


// function handleChange(e) {
//   e.preventDefault()
//   setSearchstring(e.target.value)
  
// }

// async function handleSubmit(e) {
//   e.preventDefault();
//   try {
//     const result = await dispatch(getByName(searchstring));
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }


// //!filtro con el estado
//  // const [filtered, setFiltered]= useState(allGames)
// // const [searchstring, setSearchstring]= useState("")

// // function handleChange(e) {
// //   e.preventDefault()
// //   setSearchstring(e.target.value)
  
// // }

// // function handleSubmit(e) {
// //   e.preventDefault()
// //   const filtered=allGames.filter(game=>game.Nombre.includes(searchstring))
// //   setFiltered(filtered)
// // }



//  useEffect(()=>{
//   dispatch(getGames())
//   // return(()=>{ clearDetail()}) esto es para que se borra cuando desmonte didmount
//  },[dispatch])
  
//  const filteredGames = searchstring ? videogamesId : allGames;

//  return (
//    <div className='home'>
//      <h1>"💥VideoGames💥"</h1>
     
//      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />

//      {filteredGames.length > 0 ? (
//        <Cards allGames={filteredGames} />
//      ) : (
//        <p>No se encontraron juegos</p>
//      )}
//    </div>
//  );
// }
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getGames } from '../../redux/actions';
import Cards from '../../Components/cards/cards.components';
import Navbar from '../../Components/navbar/navbar.components';
import './home.styles.css';

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  const videogamesId = useSelector((state) => state.videogamesId);

  const [searchstring, setSearchstring] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;

  function handleChange(e) {
    setSearchstring(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await dispatch(getByName(searchstring));
      console.log(result);
      setCurrentPage(1); // Reiniciar la página a 1 después de buscar
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  const filteredGames = searchstring ? videogamesId : allGames;
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className="home">
      <h1 className='neon-text'>"💥VideoGames💥"</h1>

      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />

      {currentGames.length > 0 ? (
        <Cards allGames={currentGames} />
      ) : (
        <p>No se encontraron juegos</p>
      )}

      <div className="pagination">
        <button className='neon-button' disabled={currentPage === 1} onClick={goToFirstPage}>
         Inicio
        </button>
        <button className='neon-button'  disabled={currentPage === 1} onClick={goToPreviousPage}>
          Anterior
        </button>
        <span>{`Página ${currentPage} de ${totalPages}`}</span>
        <button className='neon-button'  disabled={currentPage === totalPages} onClick={goToNextPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
}