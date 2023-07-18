const {Genre}=require("../db")
const axios = require("axios");
const {API_KEY} = process.env

const apicleanGenre = require("../utils/cleanGenre");




const genreControllers = async () => {
  try {
    let genreApi = (await axios.get(`https://api.rawg.io/api/genres${API_KEY}`)).data.results;

    const gameGenres = apicleanGenre(genreApi);
    return gameGenres;
  } catch (error) {
    // Manejo de errores
    console.error(error);
    throw new Error('Error al obtener los géneros');
  }

}



//
const getAllGenre = async () => {
  try {
    let genreBD = false;
    if (genreBD === false) {
      const allGenres = await genreControllers();
      genreBD = true;
      const setGenresDB = allGenres.map(async (item) => {
        await Genre.findOrCreate({ where: { Nombre: item } });
      });
      await Promise.all(setGenresDB);
    }

    const allGenresFromDB = await Genre.findAll();
    return allGenresFromDB;
  } catch (error) {
    // Manejo de errores
    console.error(error);
    throw new Error('Error al obtener todos los géneros');
  }
};
 



  

module.exports={genreControllers,getAllGenre}