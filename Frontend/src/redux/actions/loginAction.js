import { getTask, taskLength, userData } from "../reducers/userReducer"
import apiclient from "../../utils/apiclient"
import { combineSlices } from "@reduxjs/toolkit";

export const loginAction = (logindata) => async(dispatch) => {
    try{
        const data = await apiclient.post("/login", logindata);
        console.log(data.data.data.User_data.user_id, "asdfasdfasd");
        localStorage.setItem("access_token",data.data.data.access_token);
        localStorage.setItem("user_id", data.data.data.User_data.user_id);
        localStorage.setItem("user_name", data.data.data.User_data.user_name);

        // dispatch(userData(data.data.data))
    }
    catch(error){
        console.log(error);
    }
}

export const registerAction = (registerData) => async(dispatch) => {
    try{
        const data = await apiclient.post("/register", registerData)
        dispatch(userData(data.data.data))
    }
    catch(error){
        console.log(error);
    }
}

export const getTasksAction = (page) => async (dispatch) => {
    try{
        dispatch(getTask([]))
        const data = await apiclient.get("/get-tasks", {
            params: {page}
        });
        dispatch(getTask(data.data))
    }catch(error){
        console.log(error);
    }
}

export const getTasksLength = () => async (dispatch) => {
    try{
        dispatch(taskLength([]))
        const lengthdata = await apiclient.get("/total-task-length");
        dispatch(taskLength(lengthdata))
    }catch(error){
        console.log(error);
    }
}