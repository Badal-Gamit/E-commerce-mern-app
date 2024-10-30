import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from 'axios'

export const passwordReset=createAsyncThunk(
    'passwordRest',
    async(form)=>{
        try {
            const {status,data} = await axios.post('http://localhost:8000/reset-password', form)
            switch (status) {
                case 200:
                    toast.success(data.message)
                   return;
                case 201:
                    toast.info(data.message)
                  return;
                } 
 } catch (error) {
            toast.error(error.message)

        }
    }
)

const resetPasswordSlice=createSlice({
    initialState:{},
    name:'reset-paasword',
    reducers:{
        setPassword:(state,actions)=>{
            return  {...state,...actions.payload }
         }
    },
    extraReducers:(builder)=>{
        builder.addCase(passwordReset.fulfilled,(state,actions)=>{
           return  state={}
        })
    }
})

export default resetPasswordSlice.reducer
export const{setPassword}=resetPasswordSlice.actions