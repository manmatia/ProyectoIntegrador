const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios=require("axios");
const Videogame = require('../models/Videogame');

const {API_KEY}=process.env
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// const getApi=async ()=>{
// const apiUrl= await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
// const apiInfo= await apiUrl.data.map(e=>{
//     return{
//         Id:e.id,
//        Nombre:e.name,
//         Descripcion:e.description,
//         image:e.image,
//         Lanzamiento:e.price,
//         Rating:e.rating,
//     }
// })
// return apiInfo
// }
// const getDbInfo = async ()=>{
//     return await Videogame.findAll({
//         include:{
//             model:Genre,
//             attributes:['id','Nombre'],
//             through:{
//                 attributes:[]
//             }
//         }
//     })
// }

// const getAllVideoGame= async ()=>{
//     const apiInfo=await getApi()
//     const dbInfo=await getDbInfo()
//     return apiInfo.concat(dbInfo)
// }


// router.get(`/videogames/name`, async (req,res)=>{
// const name= req.query.name
// let nameTotal= await getAllVideoGame()
// if (name){
//     let gameName= await nameTotal.filter(e=>e.name.toLoweCase().includes(name.toLowerCase()))
//    gameName.length ?
//    res.status(200).json(gameName) :
//    res.status(404).json({message:"No se encontraron resultados"})
// }else{
//     res.status(200).json(nameTotal)
// }
// })


module.exports = router;