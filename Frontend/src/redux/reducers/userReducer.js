import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData:[],
    getTask:[],
    taskLength: []
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
        },
        taskLength: (state, action) => {
            state.taskLength = action.payload
        }
    }
})

export const {userData, getTask, taskLength} = userSlice.actions;
export default userSlice.reducer;