const  bcrypt=require('bcrypt');
const hashPassword=async (password)=>{
 const genSalt=await bcrypt.genSalt(10)
    const  hashpassword=await bcrypt.hash(password,genSalt)
    return  hashpassword
 }
const comparePassword=async(password,haspassword)=>{
    const result=await bcrypt.compare(password,haspassword)
    return result
}
module.exports={hashPassword,comparePassword}
