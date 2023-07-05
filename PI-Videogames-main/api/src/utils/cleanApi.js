


const apiclean=(arr)=> {
    arr.map((e)=>{
        return{
            id:e.id,
            Nombre:e.name,
            Descripcion:e.description,
            Imagen:e.image_url,
            created:false,
        }
    })
    }
  
  module.exports = apiclean