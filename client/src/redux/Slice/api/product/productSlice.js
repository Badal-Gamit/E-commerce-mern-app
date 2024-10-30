import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
export const createProductApi=createAsyncThunk(
    'create-product',
    async(Data)=>{
        try {
            console.log('yes');
            console.log(Data);
            
          const Token=localStorage.getItem('data')
         const  userToken=JSON.parse(Token)
         const header={headers: {
           'Authorization':  userToken?.user?.role===1?`Bearer ${userToken.token}`:"",
           "Content-Type": "multipart/form-data"
         }}
      const {data}= await axios.post(`https://e-commerce-mern-app-t2gp.onrender.com/product`,Data,header)
        toast.success(data.message)
         return data;
        } catch (error) {
        toast.error(error.message)
        }  

    }
)

const ProductSlice=createSlice({
    initialState:{},
    name:"product",
    reducers:{
        setProduct:(state,actions)=>{
            return {...state,...actions.payload}
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createProductApi.fulfilled,(state)=>{
        return state=null
        })
    }
})

export default ProductSlice.reducer
export const {setProduct}=ProductSlice.actions