import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getGenre } from "../../redux/actions";
import React, { useState, useEffect } from "react";
import "./create.styles.css";

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [input, setInput] = useState({
    Nombre: "",
    Imagen: "",
    Descripcion: "",
    Plataforma: "",
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
  });

  const genres = useSelector((state) => state.allGenre);

  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    dispatch(getGenre());

  }, [dispatch]);

  const botonHome = () => {
    history.push("/home");
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "Nombre") {
      if (value.length === 0) {
        error = "El nombre no puede estar vacío";
      } else if (value.length > 40) {
        error = "El nombre no puede tener más de 40 caracteres";
      }
    } else if (name === "Descripcion") {
      if (value.length === 0) {
        error = "La descripción no puede estar vacía";
      }
    } else if (name === "Lanzamiento") {
      if (value.length === 0 || !isDate(value)) {
        error = "Debe ser una fecha en formato aaaa-mm-dd";
      }
    } else if (name === "Rating") {
      if (value.length === 0 || !isValidRating(value)) {
        error = "Debe ser un número entre 0 y 5 con hasta 2 decimales";
      }
    }

    return error;
  };

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

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    const fieldError = validateField(name, value);

    if (name === "Genero") {
      setInput((prevInput) => {
        if (checked) {
          return {
            ...prevInput,
            Genero: [...prevInput.Genero, value],
          };
        } else {
          return {
            ...prevInput,
            Genero: prevInput.Genero.filter((genre) => genre !== value),
          };
        }
      });
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
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
    };

    dispatch(createGame(updatedInput));

    setInput({
      Nombre: "",
      Imagen: "",
      Descripcion: "",
      Plataforma: "",
      Lanzamiento: "",
      Rating: "",
      Genero: [],
    });
  }

  const isDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const isValidRating = (rating) => {
    const regex = /^\d{1}(\.\d{1,2})?$|^5(\.0{1,2})?$/;
    return regex.test(rating);
  };

  return (
    <div>
      <button className="neon-button" onClick={botonHome}>
        INICIO
      </button>
      <form>
        <div>
          <br />
          <br />
          <label>Nombre</label>
          <input
            type="text"
            value={input.Nombre}
            onChange={handleChange}
            name="Nombre"
          />
          {error.Nombre && <span>{error.Nombre}</span>}
        </div>
        <hr />
        <hr />

        <div>
          <label>Descripción</label>
          <input
            value={input.Descripcion}
            onChange={handleChange}
            name="Descripcion"
          />
          {error.Descripcion && <span>{error.Descripcion}</span>}
        </div>
        <br />
        <br />

        <div>
          <label>Plataforma</label>
          <input
            value={input.Plataforma}
            onChange={handleChange}
            name="Plataforma"
          />
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
          />
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
          ))}
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
          />
          {error.Imagen && <span>{error.Imagen}</span>}
          <br />
          <br />
          <br />
          <br />
          {Object.values(error).every((errorMsg) => errorMsg === "") && (
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
  );
};

export default Create;
