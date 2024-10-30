const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const authentication = (req, res, next) => {
    const auth = req.headers.authorization
    try {
        if (!auth) return res.status(200).json({ message: "token require" })
        const token = auth.split(' ')[1]
        const decode = jwt.verify(token, process.env.jwt_secret)
        if (decode) {
          req.user=decode
            next()
        }
 } catch (err) {
        return res.status(200).json({ message: err.message })
    }
}

const isAdmin=async(req,res,next)=>{
    const isAdmin=await userModel.findOne({email:req.user})
if (isAdmin.role!==1) return res.status(401).json({ message:"unauthorized acess" })
next()
}
module.exports ={ authentication,isAdmin}