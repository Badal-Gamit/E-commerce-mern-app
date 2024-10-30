import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";


export const signIn=createAsyncThunk(
    'form/signIn',
    async(form)=>{
     try {
        const {status,data} = await axios.post('http://localhost:8000/login',form)
         switch (status) {
                case 200:
                    toast.success(data.message)
                    return data ;
                case 201:
                    toast.info(data.message)
                   return data ;
            }
     } catch (error) {
          toast.error(error.message)
     }
    }
)


const formSlice=createSlice({
    initialState:{},
    name:'form',
    reducers:{
       setform:(state,actions)=>{
    return {...state,...actions.payload}  
       }
    },
    extraReducers:(builder)=>{
        builder.addCase(signIn.fulfilled,(state,actions)=>{
             if (actions.payload.token) {
                localStorage.setItem('data',JSON.stringify(actions.payload))
                return     state={}};
          return state ={};
        }).addCase(signIn.pending,(state,actions)=>{
          return   state=true
        })
    }
})
export default formSlice.reducer;
export const {setform}=formSlice.actions


