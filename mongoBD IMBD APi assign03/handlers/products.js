const Movie = require("../database/product");



async function fetchall (req,res,next){
    const {titles} = req.query
    const {ratings} = req.query
    const {limit} = req.query

    let {sort} = req.query
    if(titles != undefined)
    {
        let movies = await Movie.find({Title:titles})
        res.status(200).send({
            data:movies
        })
    }
    else if(ratings != undefined)
    {
        const movies =  await Movie.find({rating:ratings})
        return res.send({
            data:movies
           }) 
    }
    else if(sort!=undefined)
    {
        let movies = await Movie.find().sort({_id:sort})
        res.status(200).send({
            data:movies
        })
    }
    else if(limit!=undefined)
    {
        let movies = await Movie.find().limit(limit)
        res.status(200).send({
            data:movies
        })
    }
    else{
   const movies = await Movie.find();
   console.log(movies)
   return res.send({
    data:movies
   })}
  
}
async function checkid (req,res,next){
    const {id} = req.params;
    const movies = await Movie.findById(id)

    if(movies)
    {
        return res.send({
            data:movies
        })
    }
    else
    {
        return res.status(404).send({
            error:"Product Id does not match"
        })
    }
}
async function createproduct(req,res,next){
    const {movie:productData} = req.body
    let movies = new Movie(productData)
    await movies.save();
    return res.send({
        message:"ha ho gya add"
    })
}
async function deleteproduct(req,res,next){
    const {id:movieId} = req.params;
    await Movie.findByIdAndDelete(movieId)
    return res.send({
        message:"Movie ho gya delete"
    }) 
}

async function updates(req,res,next)
{
    const {product:productdata} = req.body
    const {id: movieId} = req.params
    let movies = await Movie.findById(movieId)
    for(const [key,value] of Object.entries(productdata)){
    movies[key] = value;
    }
    await movies.save()
    return res.send({
        message:"Movie edit ho gya hai",
        data:movies
    })

} 
async function searchmovies (req,res,next)
{
    try{
    let {q} = req.query
    console.log(q)
    let movies= await Movie.find({title:{$regex:q}});
    res.status(200).send({
        data:movies
    })
}catch(err){
    console.log(err)
    return res.status(500).send(err)
}
}
async function sortmovie(req,res,next){
    try{
        let {sort} = req.query
        console.log(sort)
        let movies = await Movie.find().sort({_id:sort})
        res.status(200).send({
            data:movies
        })
    }
    catch(err){
         console.log(err)
         res.status(500).send(err)
    }
}
async function paginations(req,res,next){
    try{
        let {limit} = req.query
        console.log(limit)
        let movies = await Movie.find().limit(limit)
        res.status(200).send({
            data:movies
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
module.exports={
    fetchall,
    checkid,
    createproduct,
    deleteproduct,
    updates,
    searchmovies,
    sortmovie,
    paginations
}