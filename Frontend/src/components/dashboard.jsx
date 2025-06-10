import { useSelector } from "react-redux";
import AddTaskForm from "./addTaskForm";
import { useState } from "react";
import AssignTaskForm from "./assignTaskForm";

function Dashboard(){

    const userData = useSelector((state) => state.userDataEverything.userData);
    console.log(userData);

    const tasks = useSelector((state) => state.userDataEverything.getTask);
    console.log(tasks);

    const [isData, setIsData] = useState(false);
    const [isAssignForm, setAssignForm] = useState(false);

    return(
        <div className="bg-blue-400 m-4 h-32 p-5 relative rounded-md">
            <h1 className="text-2xl">Welcome {userData?.username} !!</h1>
            <h2 className="pt-3">You have {tasks.length} tasks</h2>

            <button 
            className="bg-white text-sm h-7 p-1 mt-1 rounded-md"
            onClick={()=>{
                setIsData(true);
            }}
            >Add New Task</button>

            <button 
            className="bg-white text-sm h-7 p-1 mt-1 rounded-md"
            onClick={()=>{
                setAssignForm(true);
            }}
            >
            Assign Task
            </button>

            {isData && <div className="absolute top-[400px]">
                <AddTaskForm setIsData={setIsData} />
            </div>}

            {isAssignForm && <div className="absolute top-[400px]">
                <AssignTaskForm setAssignForm={setAssignForm}/>
            </div> }
        </div>
    )
}

export default Dashboard;