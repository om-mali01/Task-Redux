import { getTask, taskLength, userData } from "../reducers/userReducer"
import apiclient from "../../utils/apiclient"

export const loginAction = (logindata) => async(dispatch) => {
    try{
        const data = await apiclient.post("/login", logindata);
        localStorage.setItem("username",data.data.data.username);
        dispatch(userData(data.data.data))
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
        const data = await apiclient.get("/get-tasks");
        dispatch(taskLength(data.data))
    }catch(error){
        console.log(error);
    }
}