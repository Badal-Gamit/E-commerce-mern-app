const mongoose=require('mongoose');
const mongoDBconfig=async()=>{
    try { 
      
      await mongoose.connect(process.env.mongodbUrl);
      console.log('connection suceesfull');
      
    } catch (error) { 
         console.log(`mongodb error ${error}`);
         
    }
}
module.exports=mongoDBconfig