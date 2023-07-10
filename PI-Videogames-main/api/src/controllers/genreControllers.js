const {Genre}=require("../db")
const axios = require("axios");
const {API_KEY} = process.env

const apicleanGenre = require("../utils/cleanGenre");

const genreControllers= async(genre)=>{
    let genreApi= (await axios.get(`https://api.rawg.io/api/genres${API_KEY}`)).data
    genreApi.map((genre)=>{
        Genre.findOrCreate({where:{name: genre.name}})
    })
    let genres=await Genre.findAll()
    return genres
}

const getAllGenre = async () => {
    const genreBD = await Genre.findAll();
    const genreApi = (await axios.get(`https://api.rawg.io/api/genres${API_KEY}`)).data.results;
    const apiCleanVideogames = apicleanGenre(genreApi);
  
    return [...genreBD, ...apiCleanVideogames];
  };

module.exports={genreControllers,getAllGenre}