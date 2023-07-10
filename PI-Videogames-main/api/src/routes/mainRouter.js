

const {Router} = require('express');
const videogamesRouter = require('./videogamesRouter');
const generosRouter=require("./generosRouter");
const postRouter = require('./postRouter');

const mainRouter = Router();

mainRouter.use("/videogames", videogamesRouter)
mainRouter.use("/genres", generosRouter);
mainRouter.use("/videogames", postRouter)

  

  

  

  module.exports=mainRouter