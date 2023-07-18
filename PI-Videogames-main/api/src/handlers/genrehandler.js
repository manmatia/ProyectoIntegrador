const { genreControllers } = require("../controllers/genreControllers")
const { getAllGenre } = require("../controllers/genreControllers");

const genreHandler=async(req, res) => {
    // const {genre} = req.query
  try {
  
      const response = await getAllGenre()
      res.status(200).json(response)
    
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  
  }

  module.exports={
   genreHandler
  }