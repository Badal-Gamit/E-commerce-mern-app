import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
export const getCategory=createAsyncThunk(
    'fetch-Category',
    async()=>{
        try {
            const {status,data}=await  axios.get('http://localhost:8000/categorys');

              if (status==200) {
              return  data.getcatory
              }
          } catch (error) {
             toast.error(error.message)
          }

    }
)

export const deleteCategoryApi=createAsyncThunk(
  'delete-category',
  async(id)=>{
      try {
          const Token=localStorage.getItem('data')
          const  userToken=JSON.parse(Token)
          const header={headers: {
            'Authorization':  userToken?.user?.role===1?`Bearer ${userToken.token}`:""
          }}
       const{data}=await axios.delete(`http://localhost:8000/category/${id}`,header)
        toast.success(data.message)
        return id ;
      }catch (error) {
      toast.error(error.message)
      return;
      }

  }
)

const categorySlice=createSlice({
  initialState:[],
  name:"getCategory",
  reducers:{
   },
  extraReducers:(builder)=>{
      builder.addCase(getCategory.fulfilled,(state,actions)=>{
        return  state=actions.payload
      }).addCase(deleteCategoryApi.fulfilled,(state,actions)=>{
       return  state.filter((item)=>item._id!=actions.payload )
      })
  }
})

export default categorySlice.reducer