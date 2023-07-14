const { createPostDB } = require("../controllers/videogameControllers")

const getPostHandler=async (req, res) => {
    const {Nombre, Descripcion, Imagen, Lanzamiento, Rating, Plataforma, Generos} = req.body
   try {
    const response= await createPostDB(Nombre, Descripcion, Imagen, Lanzamiento, Rating, Plataforma, Generos)
    res.status(200).json(response) 
  } catch (error) {
     res.status(400).json({error: error.message})
   }
    
   }
    
    

  module.exports = {
    getPostHandler
  }