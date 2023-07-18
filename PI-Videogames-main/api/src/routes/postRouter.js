const {Router}= require("express")
const postRouter = Router()
const {getPostHandler, getGenreHandler}=require("../handlers/postHandler")

postRouter.post(`/`,getPostHandler )
postRouter.post("/genres", getGenreHandler)



  module.exports = postRouter