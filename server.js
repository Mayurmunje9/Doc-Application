const express=require("express");
const morgan=require("morgan")
const dotenv=require('dotenv');
const connectToDb = require("./config/db");

//env config 
dotenv.config() 
//MongoDb Connection 
connectToDb();
//rest object -- all the features of express gets into app variable
const app=express()

//middlewares
//we will not get any errors related to parsing by express.json
app.use(express.json())
app.use(morgan('dev'))

//ROUTES

 app.use('/api/auth/user',require('./routes/userRoutes'))

//only for testing purpose at the start
// app.get('/',(req,res)=>{
//     res.status(200).send({ 
//         message:"server running",
//     })
// })

// port 
const port=process.env.PORT || 5000

//Listen port 
app.listen(port,()=>{
    console.log(`Server running in ${process.env.NODE_MODE} Mode on port ${process.env.port}`)})