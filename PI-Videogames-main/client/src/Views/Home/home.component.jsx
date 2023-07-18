import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getGames } from '../../redux/actions';
import Cards from '../../Components/cards/cards.components';
import Navbar from '../../Components/navbar/navbar.components';
import Filteryorder from '../filters/filteryorder.component';
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
    // Cargar los juegos inicialmente
    dispatch(getGames());
  }, [dispatch]);

  let filteredGames = [];
  if (searchstring) {
    filteredGames = videogamesId instanceof Array ? videogamesId : [];
  } else {
    filteredGames = allGames instanceof Array ? allGames : [];
  }

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

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="home">
      <h1 className='neon-text'>"💥VideoGames💥"</h1>
    
      <Filteryorder/>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
     
      {currentGames.length > 0 ? (
        <Cards allGames={currentGames} />
      ) : (
        <div className='spinner'>
          <p>Cargando...</p>
        </div>
      )}

      <div className="pagination">
        <button className='neon-button' disabled={currentPage === 1} onClick={goToFirstPage}>
          Inicio
        </button>
        <button className='neon-button' disabled={currentPage === 1} onClick={goToPreviousPage}>
          Anterior
        </button>
        <span>{`Página ${currentPage} de ${totalPages}`}</span>
        <button className='neon-button' disabled={currentPage === totalPages} onClick={goToNextPage}>
          Siguiente
        </button>
        <button className='neon-button' disabled={currentPage === totalPages} onClick={goToLastPage}>
          Última
        </button>
      </div>
    </div>
  );
}