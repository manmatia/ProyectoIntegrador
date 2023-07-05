const axios= require('axios');
const {Videogame }=require("../db");
const apiclean = require('../utils/cleanApi');
const { API_KEY} = process.env;
const createPostDB=async (Nombre,Descripcion, Imagen)=>{

    
return await Videogame.create({Nombre,Descripcion, Imagen})

}


const getVideogameBiId= async (id, source)=>{
const videogame=source==="api"?(await axios.get(`https://api.rawg.io/api/games/${id}${API_KEY}`)).data:
 apiclean(Videogame.findByPk(id))

return videogame
}

const getAllVideogames= async()=>{
  const videogamesBD=await Videogame.findAll()
  
  
  const videogamesApi=(await axios.get(`https://api.rawg.io/api/games${API_KEY}`)).data

const apiCleanVideogames= apiclean(videogamesApi)
  return [...videogamesBD, ...apiCleanVideogames]
}

const getVideogameByNombre =async(name)=>{
  const videogamesApi=(await axios.get(`https://api.rawg.io/api/games?search=${name}${API_KEY}`)).data

  const apiCleanVideogames= apiclean(videogamesApi)
const videogameFiltered= apiCleanVideogames.filter(videogame=>videogame.name===name)
const videogamesDB= await Videogame.findAll({where: {name:name}})

return [...videogamesDB,...videogameFiltered]

}


module.exports = {createPostDB, getVideogameBiId, getAllVideogames, getVideogameByNombre}

