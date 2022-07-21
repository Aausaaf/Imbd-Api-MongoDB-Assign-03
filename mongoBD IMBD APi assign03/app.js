const express = require('express')

const cors = require('cors')
const connectdatabase = require('./database/data')
const productRoute = require('./routes/product')

const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)
app.use(productRoute)
function logger (req,res,next){
  console.log(new Date(),req.method,req.path)
  next()
}
 
connectdatabase().then(()=>{
    app.listen(3001, () => {
        console.log("serving at gytiur7ui 6r6");
      })
})



