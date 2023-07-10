const { genreControllers } = require("../controllers/genreControllers")
const { getAllGenre } = require("../controllers/genreControllers");

const genreHandler=async(req, res) => {
    const {genre} = req.query
  try {
    if(genre){
      const videogameName= await genreControllers(genre)
      res.status(200).json(videogameName)
    }else {
      const response = await getAllGenre()
      res.status(200).json(response)
    }
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  
  }

  module.exports={
   genreHandler
  }