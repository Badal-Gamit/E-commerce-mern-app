const express=require('express');
const authRoute=require('./routes/authRoute');
const categoryRoutes=require('./routes/categoryRoute')
const productRoutes=require('./routes/productRoutes')
const cors=require('cors');
require('dotenv').config();
require('./config/mongoDBconfig')()
const app=express(); 

const port=process.env.port || 8000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())  
app.use('/',authRoute)
app.use('/',categoryRoutes)
app.use('/',productRoutes)



app.listen(port,()=>{
    console.log(`server is running on ${port} port`);
    })


