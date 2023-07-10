const Videogame = require("../models/Videogame")
const {getVideogameBiId, getAllVideogames, getAllVideogamesNombre}= require("../controllers/videogameControllers")

//! BUSCA EL NOMBRE
const getNameHandler=async(req, res) => {
  const {name} = req.query
try {
  if(name){
    // const videogameName= await getVideogameByNombre(name)
    const allVideogames = await getAllVideogamesNombre(name);
const videogameName = allVideogames.filter(videogame => videogame.Nombre.toLowerCase().includes(name.toLowerCase()));
    res.status(200).json(videogameName)
  }
  else {
    const response = await getAllVideogames()
   res.status(200).json(response) 
  }
  
} catch (error) {
  res.status(400).json({error: error.message})
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
      const response = await getVideogameBiId(id, source);
  
      if (!response) {
        res.status(404).send("El videojuego no existe" );
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  



  module.exports= {getIdGamesHandler,getNameHandler,getVideogameHandler}