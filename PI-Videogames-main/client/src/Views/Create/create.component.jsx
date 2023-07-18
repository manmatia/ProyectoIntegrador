import { useDispatch, useSelector } from "react-redux";
import { createGame, getGenre } from "../../redux/actions";
import React, { useState, useEffect } from "react";
import "./create.styles.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    Nombre: "",
    Imagen: "",
    Descripcion: "",
    Plataforma: [],
    Lanzamiento: "",
    Rating: "",
    Genero: [],
  });

  const [error, setError] = useState({
    Nombre: "",
    Imagen: "",
    Descripcion: "",
    Plataforma: "",
    Lanzamiento: "",
    Rating: "",
    Genero: "",
  });

  const genres = useSelector((state) => state.allGenre);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  const platforms = [
    
      "PC",
      "PlayStation",
      "Xbox",
      "Android",
      "Apple Macintosh",
      "Linux",
      "Nintendo",
      "iOS",
      "Web",
    ];
  

  const handleGenreChange = (e) => {
    const { value } = e.target;

    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(value)) {
        // Si el género ya está seleccionado, se remueve de la lista
        return prevSelectedGenres.filter((genre) => genre !== value);
      } else {
        // Si el género no está seleccionado, se agrega a la lista
        return [...prevSelectedGenres, value];
      }
    });
  };

  const handlePlatformChange = (e) => {
    const { value } = e.target;

    setSelectedPlatforms((prevSelectedPlatforms) => {
      if (prevSelectedPlatforms.includes(value)) {
        // Si la plataforma ya está seleccionada, se remueve de la lista
        return prevSelectedPlatforms.filter((platform) => platform !== value);
      } else {
        // Si la plataforma no está seleccionada, se agrega a la lista
        return [...prevSelectedPlatforms, value];
      }
    });
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    const fieldError = validateField(name, value);

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: fieldError,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const imageUrl =
      input.Imagen.trim() === ""
        ? "https://i.guim.co.uk/img/media/cb4244417e49c9841188396ed8c9fe3d3b0a3331/0_0_5497_3641/master/5497.jpg?width=620&dpr=1&s=none"
        : input.Imagen;

    const updatedInput = {
      ...input,
      Imagen: imageUrl,
      Genero: selectedGenres,
      Plataforma: selectedPlatforms,
    };

    dispatch(createGame(updatedInput));

    setInput({
      Nombre: "",
      Imagen: "",
      Descripcion: "",
      Plataforma: [],
      Lanzamiento: "",
      Rating: "",
      Genero: [],
    });
    setSelectedGenres([]);
    setSelectedPlatforms([]);
    setError({
      Nombre: "",
      Imagen: "",
      Descripcion: "",
      Plataforma: "",
      Lanzamiento: "",
      Rating: "",
      Genero: "",
    });
  }

  const validateField = (name, value) => {
    let error = "";

    if (name === "Nombre") {
      if (value.length === 0) {
        error = "El nombre no puede estar vacío";
      } else if (value.length > 40) {
        error = "El nombre no puede tener más de 40 caracteres";
      } else if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
        error = "El nombre solo puede contener letras, números y espacios";
      }
    } else if (name === "Descripcion") {
      if (!value.length) {
        error = "La descripción no puede estar vacía";
      }
    } else if (name === "Plataforma") {
      if (value.length === 0) {
        error = "Debe seleccionar al menos una plataforma";
      }
    } else if (name === "Lanzamiento") {
      if (!value.length || !isDate(value)) {
        error = "Debe ser una fecha en formato aaaa-mm-dd";
      }
    } else if (name === "Rating") {
      if (value > 5 || !isValidRating(value)) {
        error = "Debe ser un número entre 0 y 5 con hasta 2 decimales";
      }
    } else if (name === "Genero") {
      if (value.length === 0) {
        error = "Debe seleccionar al menos un género";
      }
    }

    return error;
  };

  const isDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const isValidRating = (rating) => {
    const regex = /^\d{1}(\.\d{1,2})?$|^5(\.0{1,2})?$/;
    return regex.test(rating);
  };

  const isFormValid =
    input.Nombre.trim() !== "" &&
    input.Descripcion.trim() !== "" &&
    selectedPlatforms.length > 0 &&
    input.Lanzamiento.trim() !== "" &&
    input.Rating.trim() !== "" &&
    selectedGenres.length > 0 &&
    Object.values(error).every((errorMsg) => errorMsg === "");

  return (
        <div>
          <Link to="/home">
            <button className="neon-button">INICIO</button>
          </Link>
          <form>
            <br />
            <br />
            <div>
              <label>Nombre</label>
              <input
                type="text"
                value={input.Nombre}
                onChange={handleChange}
                name="Nombre"
              /> <br />
              {error.Nombre && <span >{error.Nombre}</span>} 
            </div>
            <hr />
            <hr />
      
            <div>
              <label>Descripción</label>
              <input
                value={input.Descripcion}
                onChange={handleChange}
                name="Descripcion"
              /> <br />
              {error.Descripcion && <span>{error.Descripcion}</span>}
            </div>
            <br />
            <br />
      
            <div>
              <label>Plataforma</label>
              {platforms.map((platform) => (
                <div key={platform}>
                  <input
                    type="checkbox"
                    id={platform}
                    name="Plataforma"
                    value={platform}
                    checked={selectedPlatforms.includes(platform)}
                    onChange={handlePlatformChange}
                  />
                  <label htmlFor={platform}>{platform}</label>
                </div>
              ))} <br />
              {error.Plataforma && <span>{error.Plataforma}</span>}
            </div>
            <div>
              <br />
              <br />
              <label>Fecha de lanzamiento</label>
              <input
                type="date"
                value={input.Lanzamiento}
                onChange={handleChange}
                name="Lanzamiento"
              /> <br />
              {error.Lanzamiento && <span>{error.Lanzamiento}</span>}
            </div>
            <br />
            <br />
            <div>
              <label>Rating</label>
              <input value={input.Rating} onChange={handleChange} name="Rating" /> <br />
              {error.Rating && <span>{error.Rating}</span>}
            </div>
            <br />
            <br />
            <div>
              <label>Género</label>
              {genres.map((genre) => (
                <div key={genre.id}>
                  <input
                    type="checkbox"
                    id={genre.id}
                    name="Genero"
                    value={genre.Nombre}
                    checked={selectedGenres.includes(genre.Nombre)}
                    onChange={handleGenreChange}
                  />
                  <label htmlFor={genre.id}>{genre.Nombre}</label>
                </div>
              ))} <br />
              {error.Genero && <span>{error.Genero}</span>}
            </div>
            <br />
            <br />
            <div></div>
            <br />
            <br />
            <div>
              <label>Imagen</label>
              <input
                value={input.Imagen}
                onChange={handleChange}
                name="Imagen"
                placeholder=""
              /> <br />
              {error.Imagen && <span>{error.Imagen}</span>}
              <br />
              <br />
              <br />
              <br />
              {isFormValid && (
                <button
                  className="neon-button"
                  type="submit"
                  onClick={handleSubmit}
                >
                  CREAR VIDEO GAME 😃
                </button>
              )}
            </div>
          </form>
        </div>
      );;
            
  }

export default Create;
