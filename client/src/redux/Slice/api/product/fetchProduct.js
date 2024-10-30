import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

export const getProducts=createAsyncThunk(
    'getProducts',
    async()=>{
       try {
        const{data,status} = await  axios.get('http://localhost:8000/product');
         return data
       } catch (error) {
          toast.error(error.message);
          return;
       }
    }
)

const productApiSlice=createSlice({
    initialState:[],
    name:"product-api",
    reducers:{

    },
    extraReducers:(builder)=>{
          builder.addCase(getProducts.fulfilled,(state,actions)=>{
         return state=actions.payload.product
          })
    }
})

export default productApiSlice.reducer