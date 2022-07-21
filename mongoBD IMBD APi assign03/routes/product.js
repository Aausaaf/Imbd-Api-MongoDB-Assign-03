const express = require('express')
const { fetchall, checkid, createproduct, deleteproduct, updates, searchmovies, sortmovie, paginations } = require('../handlers/products')

const productRoute = express.Router()

productRoute.get('/movies/all',fetchall)
productRoute.get('/movies/:id',checkid)
productRoute.post("/movies",createproduct)
productRoute.delete("/movies/:id",deleteproduct)
productRoute.patch("/movies/:id" , updates)
productRoute.get("/movies",searchmovies)
productRoute.get("/movie",sortmovie)
productRoute.get("/movie/all",paginations)
module.exports=productRoute