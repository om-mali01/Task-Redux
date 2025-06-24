import { useDispatch, useSelector } from "react-redux";
import AddTaskForm from "./addTaskForm";
import { useEffect, useState } from "react";
import AssignTaskForm from "./assignTaskForm";
import { getUserInfoAction } from "../redux/actions/userDataAction";
import { getTasksLength } from "../redux/actions/loginAction"

function Dashboard(){

    const dispatch = useDispatch();
    const userData = useSelector((state) => {
        return state.userDataEverything.userData.data});

    const tasks_length = useSelector((state) => {
        console.log(state.userDataEverything.taskLength.data, "9999");
        return state.userDataEverything.taskLength.data});

    const [isData, setIsData] = useState(false);
    const [isAssignForm, setAssignForm] = useState(false);

    useEffect(() => {
        dispatch(getUserInfoAction())
        dispatch(getTasksLength())
    },[dispatch])

    return(
        <div className="bg-blue-400 m-4 h-32 p-5 relative rounded-md">
            <h1 className="text-2xl"> Welcome {userData?.username ? userData.username : "Guest"} !!</h1>

            <h2 className="pt-3">You have {tasks_length === undefined ? "loading":tasks_length} tasks</h2>

            <div>
                <button 
                className="bg-white text-sm h-7 p-1 mr-2 rounded-md"
                onClick={()=>{
                    setIsData(true);
                }}
                >Add New Task</button>

                <button 
                className="bg-white text-sm h-7 p-1 rounded-md"
                onClick={()=>{
                    setAssignForm(true);
                }}
                >
                Assign Task
                </button>

                <button>
                    
                </button>
            </div>
            

            {isData && <div className="flex items-center justify-center">
                <AddTaskForm setIsData={setIsData} />
            </div>}

            {isAssignForm && <div className="flex items-center justify-center">
                <AssignTaskForm setAssignForm={setAssignForm}/>
            </div> }


        </div>
    )
}

export default Dashboard;