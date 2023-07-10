const {Router} = require('express');
const {getIdGamesHandler, getVideogameHandler,getNameHandler} = require("../handlers/gamesHandler")

const videogamesRouter= Router()



// routes /videogames
// videogamesRouter.get("/", getVideogameHandler)
videogamesRouter.get("/",getNameHandler)

videogamesRouter.get(`/:id`, getIdGamesHandler )


    
     
    
    
module.exports=videogamesRouter
