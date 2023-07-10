import axios from "axios"

export const GET_GAMES= "GET_GAMES"

export function getGames(){
    return async function(dispatch){
        const response= await axios(`http://localhost:3001/videogames/`)
        return dispatch({
            type: "GET_GAMES",
            payload:response.data
        })
    }
}