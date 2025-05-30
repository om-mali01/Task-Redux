import apiclient from "../../utils/apiclient"
import { getTask } from "../reducers/userReducer";
import { getTasks } from "./loginAction";

export const AddTaskAction = (data, cb) => async(dispatch) => {
    try{
        const taskdata = await apiclient.post("/add-task", data);
        // dispatch(getTask(taskdata));
        cb(dispatch(getTasks()))
    }
    catch(error){
        console.log(error);
    }
}

export const DeleteTaskAction = (id, cb) => async(dispatch) => {
    try{
        await apiclient.delete("/delete-task", {
            params: {id}
        });
        cb(dispatch(getTasks()));
    }
    catch(error){
        console.log(error);
    }
}

export const UpdateTaskAction = (data, cb) => async(dispatch) => {
    try{
        await apiclient.put("/task-update", data);
        cb(dispatch(getTasks()));
    }
    catch (error){
        console.log(error);
    }
}