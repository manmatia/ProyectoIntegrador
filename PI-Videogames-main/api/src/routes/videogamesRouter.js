const {Router} = require('express');
const {getIdGamesHandler, getVideogameHandler,getNameHandler} = require("../handlers/gamesHandler")

const videogamesRouter= Router()



// routes /videogames

videogamesRouter.get("/", getVideogameHandler)

videogamesRouter.get(`/:id`, getIdGamesHandler )

videogamesRouter.get("/",getNameHandler)
    
     
    
    
module.exports=videogamesRouter
