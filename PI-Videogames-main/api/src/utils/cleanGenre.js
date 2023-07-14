const apicleanGenre = (arr) => {
    return arr.map((e) => {
      return {
        Id: e.id,
        Nombre: e.name,
        Juegos: e.games?.map((juego)=>{
            return juego.name
        }).join("-"),
       
        Imagen: e.image_background,
    
      };
    });
  };


  module.exports = apicleanGenre