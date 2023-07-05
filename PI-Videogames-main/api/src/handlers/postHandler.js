const { createPostDB } = require("../controllers/videogameControllers")

const getPostHandler=async (req, res) => {
    const {Nombre, Descripcion, Imagen } = req.body
   try {
    const response= await createPostDB(Nombre, Descripcion, Imagen )
    res.status(200).json(response) 
  } catch (error) {
     res.status(400).json({error: error.message})
   }
    
   }
    
    

  module.exports = {
    getPostHandler
  }