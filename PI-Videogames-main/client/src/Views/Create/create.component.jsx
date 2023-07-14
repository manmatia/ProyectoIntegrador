import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCreate, getGenre } from '../../redux/actions';
import React, { useState, useEffect } from 'react';
import './create.styles.css';

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [input, setInput] = useState({
    Nombre: '',
    Imagen: '',
    Descripcion: '',
    Plataforma: '',
    Lanzamiento: '',
    Rating: '',
    Genero: '',
  });

  const [error, setError] = useState({
    Nombre: 'no puede estar vacio',
    Imagen: 'no puede estar vacio',
    Descripcion: 'no puede estar vacio',
    Plataforma: '',
    Lanzamiento: '',
    Rating: 'Debe ser un número entre 0 y 5 con hasta 2 decimales',
    Genero: '',
  });
  
  const genres = useSelector((state) => state.allGenre);
  console.log(genres)
  const [selectedGenres, setSelectedGenres] = useState([]);

useEffect(() => {
  dispatch(getGenre());
}, []);
  const botonHome = () => {
    history.push('/home');
  };

  const validate = (input) => {
    const newError = { ...error };

    if (input.Nombre.length === 0) {
      newError.Nombre = 'no puede estar vacio';
    } else {
      newError.Nombre = '';
    }

    if (input.Descripcion.length === 0) {
      newError.Descripcion = 'no puede estar vacio';
    } else {
      newError.Descripcion = '';
    }

    if (input.Imagen.length === 0 || !isUrl(input.Imagen)) {
      newError.Imagen = 'Debe ser una URL válida';
    } else {
      newError.Imagen = '';
    }

    if (input.Lanzamiento.length === 0 || !isDate(input.Lanzamiento)) {
      newError.Lanzamiento = 'Debe ser una fecha en formato aaaa-mm-dd';
    } else {
      newError.Lanzamiento = '';
    }

    if (input.Rating.length === 0 || !isValidRating(input.Rating)) {
      newError.Rating = 'Debe ser un número entre 0 y 5 con hasta 2 decimales';


    }if (selectedGenres.length === 0) {
      newError.Genero = 'Debes seleccionar al menos un género';
    } 
    
    
    else {
      newError.Rating = '';
      newError.Genero = '';
    }

    setError(newError);
  };

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    }
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    validate({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(getCreate(input));

  };

  const isUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const isDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const isValidRating = (rating) => {
    const regex = /^\d{1}(\.\d{1,2})?$|^5(\.0{1,2})?$/;
    return regex.test(rating);
  };

  const canCreate = () => {
    const hasErrors = Object.values(error).some((errorMsg) => errorMsg.length > 0);
    return !hasErrors;
  };

  return (
    <div>
      <button className='neon-button' onClick={botonHome}>INICIO</button>
      <form>
        <div>
          <br />
          <br />
          <label>Nombre</label>
          <input type="text" value={input.Nombre} onChange={handleChange} name="Nombre" />
          {error.Nombre && <span>{error.Nombre}</span>}
        </div>
        <hr />
        <hr />

        <div>
          <label>Descripcion</label>
          <input value={input.Descripcion} onChange={handleChange} name="Descripcion" />
          {error.Descripcion && <span>{error.Descripcion}</span>}
        </div>
        <br />
        <br />

        <div>
          <label>Plataforma</label>
          <input value={input.Plataforma} onChange={handleChange} name="Plataforma" />
        </div>
        <div>
          <br />
          <br />
          <label>Fecha de lanzamiento</label>
          <input value={input.Lanzamiento} onChange={handleChange} name="Lanzamiento" />
          {error.Lanzamiento && <span>{error.Lanzamiento}</span>}
        </div>
        <br />
        <br />
        <div>
          <label>Rating</label>
          <input value={input.Rating} onChange={handleChange} name="Rating" />
          {error.Rating && <span>{error.Rating}</span>}
        </div>
        <br />
        <br />
        <div>
  <label>Género</label>
  {genres.map((genre) => (
    <div key={genre.id}>
      <label>{genre.Nombre}</label>
      <input
        type="checkbox"
        value={genre.Nombre}
        onChange={handleGenreChange}
        checked={selectedGenres.includes(genre.Nombre)}
      />
      <span>{genre.name}</span>
    </div>
  ))}
  {error.Genero && <span>{error.Genero}</span>}
</div>
        <br />
        <br />
        <div>
          <label>Imagen</label>
          <input value={input.Imagen} onChange={handleChange} name="Imagen" />
          {error.Imagen && <span>{error.Imagen}</span>}
          <br />
          <br />
          <br />
          <br />
          <button className='neon-button' disabled={!canCreate()} onClick={handleSubmit}>
            CREAR VIDEO GAME 😃
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;