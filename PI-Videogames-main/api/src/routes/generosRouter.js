const {Router} = require('express');
const generosRouter = Router();
const { genreHandler } = require('../handlers/genrehandler');



generosRouter.get("/", genreHandler)

 

  module.exports = generosRouter