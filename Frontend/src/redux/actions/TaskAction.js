import apiclient from "../../utils/apiclient"
import { getTask } from "../reducers/userReducer";
import { getTasksAction } from "./loginAction";

export const AddTaskAction = (data, cb) => async(dispatch) => {
    try{
        await apiclient.post("/add-task", data);
        // dispatch(getTask(taskdata));
        dispatch(getTasksAction(1));
        cb()
    }
    catch(error){
        console.log(error);
    }
}

export const AssignTaskAction = (data) => async(dispatch) => {
    try {
        const taskdata = await apiclient.post("/assign-task", data);
        dispatch(getTasksAction(1))
        console.log(taskdata);
    }
    catch(error){
        console.log(error)
    }
}

export const DeleteTaskAction = (id, cb) => async(dispatch) => {
    try{
        await apiclient.delete("/delete-task", {
            params: {id}
        });
        cb(dispatch(getTasksAction(1)));
    }
    catch(error){
        console.log(error);
    }
}

export const UpdateTaskAction = (data) => async(dispatch) => {
    try{
        await apiclient.put("/task-update", data);
        dispatch(getTasksAction(1));
    }
    catch (error){
        console.log(error);
    }
}