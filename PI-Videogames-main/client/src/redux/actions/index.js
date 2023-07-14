import axios from "axios"

export const GET_GAMES= "GET_GAMES"
export const GET_BY_NAME="GET_BY_NAME"
export const GET_BY_ID="GET_BY_ID"
export const GET_GENRE="GET_GENRE"
export const GET_CREATE="GET_CREATE"
export const GET_GAME_BY_ID_FROM_DATABASE="GET_GAME_BY_ID_FROM_DATABASE"
export function getGames(){
    return async function(dispatch){
        const response= await axios.get(`http://localhost:3001/videogames/`)
        
        return dispatch({
            type: GET_GAMES,
            payload:response.data
        })
    }
}

export function getByName(name){
    return async function(dispatch){
        const response= await axios.get(`http://localhost:3001/videogames/?name=${name}`)
        return dispatch({
            type: GET_BY_NAME,
            payload:response.data
        })
    }
}

export function getById(id){
    return async function(dispatch){
        const response= await axios.get(`http://localhost:3001/videogames/${id}`)
        console.log(response.data)
        return dispatch({
            type: GET_BY_ID,
            payload:response.data
        })
    }
}


// export const getByIdFromDatabase = (id) => {
//     return async (dispatch) => {
//       try {
//         const response = await axios.get(`http://localhost:3001/videogames/${id}`);
//         dispatch({
//           type: GET_GAME_BY_ID_FROM_DATABASE,
//           payload: response.data,
//         });
//       } catch (error) {
//         console.log(error);
//         // Manejo de errores
//       }
//     };
//   };

export function getGenre(){
    return async function(dispatch){
        const response= await axios(`http://localhost:3001/genres`)
        return dispatch({
            type: GET_GENRE,
            payload:response.data
        })
    }
}

export function getCreate(input){
    return async function(dispatch){
        const response= await axios.post("http://localhost:3001/videogames/", input)
        return dispatch({
            type: GET_CREATE,
            payload:response.data
        })
    }
}