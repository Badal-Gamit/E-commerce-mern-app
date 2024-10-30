import {configureStore} from '@reduxjs/toolkit'
import  formSlice from './Slice/api/form/loginform'
import registrationform from './Slice/api/form/registrationform'
import resetForm from './Slice/api/form/resetForm'
import fetchCategory from './Slice/api/category/fetchCategory'
import productSlice from './Slice/api/product/productSlice'
import fetchProduct from './Slice/api/product/fetchProduct'
import Userid from './Slice/feature/Userid'
import SearchApi from './Slice/api/search/SearchApi'
import  cardSlice from './Slice/feature/Card'


export const Store=configureStore({
    reducer:{
        form:formSlice,
        register:registrationform,
        resetform:resetForm,
        getCategory:fetchCategory,
        products:productSlice,
        productApi:fetchProduct,
        user:Userid,
        search:SearchApi,
        Card:cardSlice
     }
})