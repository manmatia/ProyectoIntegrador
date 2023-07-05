const {Router}= require("express")
const postRouter = Router()
const {getPostHandler}=require("../handlers/postHandler")

postRouter.post(`/`,getPostHandler )



  module.exports = postRouter