import { useDispatch, useSelector } from "react-redux";
import { DeleteTaskAction, UpdateTaskAction } from "../redux/actions/TaskAction";
import { useState } from "react";
import UpdateTaskForm from "./updateTaskForm";

function TaskComponent(){

    const tasks = useSelector((state) => state.userDataEverything.getTask);
    console.log(tasks, "asdfaf");

    const getStatusBg = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-300";
            case "in-process":
                return "bg-blue-300";
            case "completed":
                return "bg-green-300";
            default:
                return "bg-gray-300";
        }
    };
    
    const dispatch = useDispatch()
    const handleDelete = (id) => {
        console.log(id);
        dispatch(DeleteTaskAction(id))
    }

    const [updatedTaskId, setUpdatedTaskId] = useState(null);
    const [isUpdatedForm, setIsUpdatedForm] = useState(false);

    return(
        <div className="bg-blue-400 m-4 rounded-md">
            <h1 className="p-5 text-xl">Tasks List</h1>
            <div className="grid grid-cols-3 gap-2">
                {
                    tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <div key={index} className="w-96 h-auto p-2 m-5 bg-white rounded-md">
                                <div className="">
                                <h2 className="text-lg">{task.title}</h2>
                                <p className="text-sm">{task.description}</p>
                                <p className="text-sm flex"><b className="p-1">Status: </b> <span className={`text-sm ml-2 w-fit p-1 rounded-sm ${getStatusBg(task.status)}`}>{task.status}</span></p>
                                <p className="text-sm"><b>Created at:</b> {task.created_at}</p>
                                <div className="">
                                <button 
                                    className="bg-blue-300 text-sm p-1 m-3 rounded-md"
                                    onClick={() => {setUpdatedTaskId(task.id); setIsUpdatedForm(true);}}
                                >Update</button>

                                    <button 
                                    className="bg-red-400 text-sm p-1 m-3 rounded-md"
                                    onClick={()=> handleDelete(task.id)}
                                    >Delete Task
                                    </button>
                                </div>
                                </div>
                                <div className="absolute right-[500px] ">
                                {updatedTaskId === task.id && (
                                        <UpdateTaskForm className="flex justify-center items-center" id={task.id} setIsUpdatedForm={setIsUpdatedForm} isUpdatedForm={isUpdatedForm}/>
                                )}
                                </div>
                            </div>
                            
                        ))
                    ) : (
                        <p>No Tasks available</p>
                    )
                }
            </div>
        </div>
    )
}

export default TaskComponent;