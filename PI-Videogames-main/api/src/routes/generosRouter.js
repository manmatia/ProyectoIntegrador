const {Router} = require('express');
const generosRouter = Router();
const {getGenreHandler}=require("../handlers/gamesHandler")



generosRouter.get("/genres", getGenreHandler)

 

  module.exports = generosRouter