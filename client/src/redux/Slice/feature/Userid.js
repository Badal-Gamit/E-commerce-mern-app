import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

const UserSlice=createSlice({
    initialState:{},
    name:"user",
    reducers:{
      setUser:(state,actions)=>{
         return   state=actions.payload
      },
      clearuser:(state)=>{
        return  state={}
      }
    }
})
export default UserSlice.reducer
export const {setUser,clearuser}=UserSlice.actions