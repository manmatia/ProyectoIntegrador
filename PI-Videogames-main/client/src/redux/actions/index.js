import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID";
export const GET_GENRE = "GET_GENRE";
export const CREATE_GAME = "CREATE_GAME";
export const ORDER = "ORDER";
export const FILTER = "FILTER";
export const ERROR = "ERROR";
export const RESET_FILTERS = "RESET_FILTERS";
export const FILTER_API_BD = "FILTER_API_BD";
export const CLEAR_GAME_DETAIL = "CLEAR_GAME_DETAIL"
export const ORDER_RATING = "ORDER_RATING"

export function getGames() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/videogames/");
      dispatch({
        type: GET_GAMES,
        payload: response.data,
      });
    } catch (error) {
     dispatch({
        type: ERROR,
        payload: {
          message: error.response.data.message,
        },
      });
    }
  };
}


export function getByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames/?name=${name}`
      );
      dispatch({
        type: GET_BY_NAME,
        payload: response.data,
      });
      return response.data; // Devolver el resultado de la respuesta
    } catch (error) {
      alert("Juego no encontrado");
      console.error("Error al obtener el juego por nombre:", error);
    }
  };
}

export function getById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: GET_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: {
          message: error.response.data.message,
        },
      });
    }
  };
}
export function clearGameDetail() {
  return {
    type: CLEAR_GAME_DETAIL,
  };
}

export function orderGames(order) {
  return {
    type: ORDER,
    payload: order,
  };
}

export function orderRating(order) {
  return {
    type: ORDER_RATING,
    payload: order,
  };
}

export function filterGame(genre) {
  return {
    type: FILTER,
    payload: genre,
  };
}

export function filterApiBd(create) {
  return {
    type: FILTER_API_BD,
    payload: create,
  };
}

export const resetFilters = () => ({
  type: RESET_FILTERS
});

export function getGenre() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/genres");
      return dispatch({
        type: GET_GENRE,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: {
          message: error.response.data.message,
        },
      });
    }
  };
}

export function createGame(input) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/videogames/",
        input
      );
      alert("JUEGO CREADO CON ÉXITO");
      return dispatch({
        type: CREATE_GAME,
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data);
      return dispatch({
        type: ERROR,
        payload: {
          message: error.response.data.message,
        },
      });
    }
  };
}