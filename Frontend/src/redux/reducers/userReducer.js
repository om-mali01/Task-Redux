import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData:[],
    getTask:[]
}

const userSlice = createSlice({
    name:"userDataEverything",
    initialState:initialState,
    reducers:{
        userData:(state, action)=>{
            state.userData = action.payload
        },
        getTask:(state, action)=>{
            state.getTask = action.payload
        }
    }
})

export const {userData, getTask} = userSlice.actions;
export default userSlice.reducer;