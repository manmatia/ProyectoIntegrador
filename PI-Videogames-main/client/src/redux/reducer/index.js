import {
  GET_GAMES,
  GET_BY_NAME,
  GET_BY_ID,
  GET_GENRE,
  CREATE_GAME,
  ORDER,
  FILTER,
  ERROR,
  RESET_FILTERS,
  FILTER_API_BD,
} from "../actions";

let initialState = {
  allGames: [],
  games: [],
  gamesCopy: [],
  videogamesId: [],
  gameById: [],
  allBD: [],
  allGenre: [],
  userGames: [],
  allAPI: [],
  error: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        allGames: [...action.payload],
        gamesCopy: [...action.payload],
        error: null,
      };
    case GET_BY_NAME:
      return {
        ...state,
        videogamesId: action.payload,
        error: null,
      };
    case GET_BY_ID:
      return {
        ...state,
        allGames: action.payload,
        gameById: action.payload,
        error: null,
      };
    case RESET_FILTERS:
      return {
        ...state,
        allGames: state.gamesCopy,
        error: null,
      };
    case ORDER:
      let orden;
      if (action.payload === "az") {
        orden = state.allGames
          .slice()
          .sort((a, b) => a.Nombre.localeCompare(b.Nombre));
      } else {
        orden = state.allGames
          .slice()
          .sort((a, b) => b.Nombre.localeCompare(a.Nombre));
      }
      return {
        ...state,
        allGames: orden,
        error: null,
      };
    case GET_GENRE:
      return {
        ...state,
        allGenre: action.payload,
        error: null,
      };
    case CREATE_GAME:
      return {
        ...state,
        allBD: [...state.allBD, action.payload],
        error: null,
      };
    case FILTER_API_BD:
      let filteredGames;
      if (action.payload === "CREADOS") {
        filteredGames = state.gamesCopy.filter((game) => game.created);
      } else {
        filteredGames = state.gamesCopy.filter((game) => !game.created);
      }
      return {
        ...state,
        allGames: filteredGames,
        error: null,
      };
    case FILTER:
      return {
        ...state,
        allGames: state.gamesCopy.filter((game) => {
          if (game.Genero) {
            const genres = game.Genero.split("-");
            return genres.some((genre) => genre.trim() === action.payload);
          }
          return false;
        }),
        error: null,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;