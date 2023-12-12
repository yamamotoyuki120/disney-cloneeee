import {createSlice} from '@reduxjs/toolkit'
const initialState={
    name:'',
    email:'',
    photo:''
}
const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserLoginDetails:(state,action)=>{
            state.name=action.payload.name;
            state.email=action.payload.email;
            state.photo=action.payload.photo;
        },
        setSignOutState:state=>{
       state.name=null;
       state.email=null;
       state.photo=null;
        }
    },
})

export default UserSlice.reducer
export const {setSignOutState,setUserLoginDetails}=UserSlice.actions
export const selectUsername=(state)=>state.user.name
export const selectUserEmail=(state)=>state.user.email
export const selectUserPhoto=(state)=>state.user.photo