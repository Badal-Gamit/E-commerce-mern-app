import { createSlice } from "@reduxjs/toolkit";

const CartSlice=createSlice({
    initialState:[],
    name:"cart",
    reducers:{
        AddCart:(state,actions)=>{
        return  state=actions.payload;
       
        },
        itemRemove:(state,actions)=>{
            const id=actions.payload
             return state.filter((product)=>{
                if (product._id!=id) return product
        })},
       clearCart:(state)=>{
          return state=[];
       }
    }
})

export default CartSlice.reducer
export const {itemRemove,AddCart,clearCart }=CartSlice.actions