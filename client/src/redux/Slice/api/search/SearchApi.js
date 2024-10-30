import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export  const SearchApi=createAsyncThunk(
    'SearchApi',
    async(search)=>{
       const {data}=await axios.get(`https://e-commerce-mern-app-t2gp.onrender.com/product/search/${search}`)
       return data
    }
)


const SearchSlice=createSlice({
    name:"serch",
    initialState:[],
    reducers:{
        search:(state,actions)=>{
            return  state=actions.payload
        }
    },
    extraReducers:(builder)=>{
         builder.addCase(SearchApi.fulfilled,(state,actions)=>{
         return state=actions.payload.product
        })}
})

export default  SearchSlice.reducer
export const {search}=SearchSlice.actions