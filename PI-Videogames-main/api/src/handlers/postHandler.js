const { createGenrePostBD } = require("../controllers/genreControllers")
const { createPostDB} = require("../controllers/videogameControllers")

const getPostHandler=async (req, res) => {
    const {Nombre, Descripcion, Imagen, Lanzamiento, Rating, Plataforma, Genero} = req.body
   try {
    const response= await createPostDB(Nombre, Descripcion, Imagen, Lanzamiento, Rating, Plataforma, Genero)
    res.status(200).json(response) 
  } catch (error) {
     res.status(400).send(error.message)
   }
    
   }
    
   const getGenreHandler=async () => {
    const {Generos} = req.body
   try {
    const response= await createGenrePostBD(Generos)
    res.status(200).json(response) 
  } catch (error) {
     res.status(400).send(error.message)
   }
    
   }
    

  module.exports = {
    getPostHandler, getGenreHandler
  }