const apiclean = (arr) => {
    return arr.map((e) => {
      return {
        id: e.id,
        Nombre: e.name,
        Descripcion: e.description_raw,
        Plataforma: e.parent_platforms?.map((platforms)=>{
            return platforms.platform.name
        }),
        Rating: e.rating,
        Imagen: e.background_image,
       Genero:  e.genres?.map((genre)=>{
        return genre.name
    }),
      };
    });
  };


  module.exports = apiclean