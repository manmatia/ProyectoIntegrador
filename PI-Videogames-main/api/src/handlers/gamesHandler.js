const Videogame = require("../models/Videogame")
const {getVideogameBiId, getVideogameByNombre, getAllVideogames}= require("../controllers/videogameControllers")

//! BUSCA EL NOMBRE
const getNameHandler=async(req, res) => {
  const {name} = req.query
try {
  if(name){
    const videogameName= await getVideogameByNombre(name)
    res.status(200).json(videogameName)
  }else {
    const response = await getAllVideogames()
    res.status(200).json(response)
  }
  
} catch (error) {
  res.status(error.status).json({error: error.message})
}

}



//! TODOS LOS VIDEOJUEGOS
const getVideogameHandler=async(req, res) => {
  
  try {
    const videogames= await getAllVideogames()
    res.status(200).json(videogames)
    
    } catch (error) {
      res.status(error.status).json({error: error.message})
    }
  }
  


  //! BUSCA POR EL  ID
  const getIdGamesHandler= async(req, res) => {
    const {id}=req.params
    const source=isNaN(id)? "bddt": "api"
    try {
        const response= await getVideogameBiId(id, source)  
      res.status(200).json(response)
     
    } catch (error) {
      res.status(error.status).json({error: error.message})
    }
  }
  


//! BUSCA POR GENERO
  const getGenreHandler =async(req, res) => {
    try {
      
      res.status(200).send("usuario")
    } catch (error) {
      res.status(error.status).json({error: error.message})
    }
  }

  module.exports= {getGenreHandler,getIdGamesHandler,getNameHandler,getVideogameHandler}