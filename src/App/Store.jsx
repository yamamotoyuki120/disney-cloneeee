import {configureStore} from '@reduxjs/toolkit'
import Userslice from '../Features/User/UserSlice'
import movieReducer from '../Features/User/Movies/MovieSlice'
const Store=configureStore({
    reducer:{
        user:Userslice,
        movie:movieReducer
    },
    
})
export default Store