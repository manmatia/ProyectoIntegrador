import { GET_GAMES } from "../actions";

let initialState = { allGames: [], games:[], gamesCopy: [] };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        allGames: action.payload,
        gamesCopy: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;