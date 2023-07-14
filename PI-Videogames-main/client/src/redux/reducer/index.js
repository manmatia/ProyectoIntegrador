import { GET_GAMES, GET_BY_NAME, GET_BY_ID, GET_GENRE, GET_CREATE, GET_GAME_BY_ID_FROM_DATABASE} from "../actions";

let initialState = { allGames: [], games: [], gamesCopy: [], videogamesId: [],gameById:[], allBD:[], allGenre:[]};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        allGames: action.payload,
        gamesCopy: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        videogamesId: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        allGames: action.payload,
        gameById: action.payload,
      };
      // case  GET_GAME_BY_ID_FROM_DATABASE:
      //   return{
      //     ...state,
      //    gameById: action.payload,
      //   }
    case GET_GENRE:
      return {
        ...state,
        allGenre: action.payload,
      };
      case GET_CREATE:
        return{
          ...state,
          allBD: action.payload,
        }

    default:
      return state;
  }
}

export default rootReducer;
