const axios= require('axios');
const {Videogame}=require("../db");
const apiclean = require('../utils/cleanApi');
const { API_KEY, API_KEY2} = process.env;
const { Op } = require("sequelize");



const createPostDB=async (Nombre,Descripcion, Imagen, Lanzamiento,Rating, Plataforma, Genero)=>{
return await Videogame.create({Nombre,Descripcion, Imagen, Lanzamiento,Rating, Plataforma, Genero})
}



const getVideogameBiId = async (id, source) => {
  let videogame;

  if (source === "api") {
    videogame = (await axios.get(`https://api.rawg.io/api/games/${id}${API_KEY}`)).data;
    videogame = apiclean([videogame])[0];
  } else {

  videogame = await Videogame.findByPk(id);}
  return videogame;
};

const getAllVideogamesNombre = async (name) => {
  const videogamesBD = await Videogame.findAll({
    where: {
      Nombre: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  
  const response = await axios.get(`https://api.rawg.io/api/games?search=${name}${API_KEY2}`);
  const games = response.data.results;
  const cleanGames = apiclean(games);

  return [...videogamesBD, ...cleanGames].slice(0, 15);
};

const getAllVideogames = async () => {
  const videogamesBD = await Videogame.findAll();

  // Realizar múltiples solicitudes a la API para obtener los juegos en varias páginas
  const apiCleanVideogames = [];
  let page = 1;

  while (apiCleanVideogames.length < 100) {
    const response = await axios.get(`https://api.rawg.io/api/games${API_KEY}&page=${page}`);
    const games = response.data.results;
    const cleanGames = apiclean(games);
    apiCleanVideogames.push(...cleanGames);
    page++;
  }

  return [...videogamesBD, ...apiCleanVideogames.slice(0, 100)];
};

const getVideogameByNombre = async (name) => {
  const allVideogames = [];
  const request = [];
  for (let i = 1; i < 6; i++) {
    if (i === 1) {
      request.push(axios.get(`https://api.rawg.io/api/games?search=${name}${API_KEY}`));
    }
    request.push(axios.get(`https://api.rawg.io/api/games?search=${name}&page=${i}${API_KEY}`));
  }
  const response = await axios.all(request);
  response.filter((response) => {
    allVideogames.push(...response.data.results);
  });

  const apiCleanVideogames = apiclean(allVideogames);
//filtra coincidencias 
  const videogameFiltered = apiCleanVideogames.filter((videogame) =>
    videogame.Nombre.toLowerCase().includes(name.toLowerCase())
  );

  return videogameFiltered;
};

module.exports = { createPostDB, getVideogameBiId, getAllVideogames, getVideogameByNombre, getAllVideogamesNombre };