const express=require('express');
const path=require('path')
const authRoute=require('./routes/authRoute');
const categoryRoutes=require('./routes/categoryRoute')
const productRoutes=require('./routes/productRoutes')
const cors=require('cors');
require('dotenv').config();
require('./config/mongoDBconfig')()
const app=express(); 

const port=process.env.port || 8000
app.use(cors(
    {
        origin:["http://localhost:5173","https://e-commerce-f3rt.onrender.com" ]
    }
))
app.use(express.json())
app.use(express.urlencoded())  
app.use('/',authRoute)
app.use('/',categoryRoutes)
app.use('/',productRoutes)
app.use(express.static(path.join(path.resolve(),"..","client","dist")))

console.log(path.join(path.resolve(),"..","client","dist","index.html"));

app.get("*",(req,res)=>{
 res.sendFile(path.join(path.resolve(),"..","client","dist","index.html"))
})

app.listen(port,()=>{
    console.log(`server is running on ${port} port`);
    })


