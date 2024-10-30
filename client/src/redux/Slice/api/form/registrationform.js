import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const registrationform=createAsyncThunk(
    'registrationform',
    async(form)=>{
        try {
            const {status,data}=await axios.post('http://localhost:8000/register',form)
             switch (status) {
              case 200:
                   toast.success( data.message)
                   return data;
                break;
                case 201:
                   toast.info( data.message)
                   return data
                break;
                case 500:
                  toast.error( data.message)
               break;
             }
           
            
          } catch (error) {
             toast.error(error.message)
          
          }}
)

const registrationSlice=createSlice({
    initialState:{},
    name:"registeration",
    reducers:{
        setRegistration:(state,actions)=>{
        return  {...state,...actions.payload  }
        } },
  extraReducers:(builder)=>{
    builder.addCase(registrationform.fulfilled,(state,actions)=>{
      console.log(actions.payload)
      if (actions.payload.token) {
        localStorage.setItem('data',JSON.stringify(actions.payload))
        return     state={}
      };
  return state ={}
    }).addCase(registrationform.pending,(state,actions)=>{
     return state=true
    })
  }
})

export default registrationSlice.reducer

export const {setRegistration }=registrationSlice.actions