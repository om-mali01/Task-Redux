import { useDispatch, useSelector } from "react-redux";
import { DeleteTaskAction, UpdateTaskAction } from "../redux/actions/TaskAction";
import { useEffect, useState } from "react";
import UpdateTaskForm from "./updateTaskForm";
import { getTasksAction } from "../redux/actions/loginAction";

function TaskComponent() {
    const dispatch = useDispatch();
    const Data = useSelector((state) => state.userDataEverything.getTask);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getTasksAction(currentPage)); 
    }, [currentPage, dispatch]);

    const handleDelete = (id) => {
        dispatch(DeleteTaskAction(id));
    };

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

    return (
        <div className="bg-blue-400 m-4 rounded-md">
            <div className="grid grid-cols-3 gap-2 h-[410px]">
                {Data.length > 0 ? (
                    Data.map((task, index) => (
                        <div key={index} className="w-96 p-2 m-5 h-[160px] bg-white rounded-md">
                            <h2 className="text-lg">{task.title}</h2>
                            <p className="text-sm">{task.description}</p>
                            <p className="text-sm flex">
                                <b className="p-1">Status:</b>
                                <span className={`text-sm ml-2 w-fit p-1 rounded-sm ${getStatusBg(task.status)}`}>
                                    {task.status}
                                </span>
                            </p>
                            <p className="text-sm"><b>Created at:</b> {task.created_at}</p>
                            <button 
                                className="bg-blue-300 text-sm p-1 m-3 rounded-md"
                                onClick={() => dispatch(UpdateTaskAction(task.id))}
                            >
                                Update
                            </button>
                            <button 
                                className="bg-red-400 text-sm p-1 m-3 rounded-md"
                                onClick={() => handleDelete(task.id)}
                            >
                                Delete Task
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No Tasks available</p>
                )}
            </div>
            <div className="flex justify-center space-x-2 p-4">
                <button 
                    className="bg-gray-300 px-4 py-2 rounded-md"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Prev
                </button>
                {/* <button className="bg-gray-300 px-4 py-2 rounded-md">{currentPage}</button>
                <button className="bg-gray-300 px-4 py-2 rounded-md">{currentPage+1}</button>
                <button className="bg-gray-300 px-4 py-2 rounded-md">{currentPage+2}</button> */}
                <button 
                    className="bg-gray-300 px-4 py-2 rounded-md"
                    disabled={Data.length < 6}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default TaskComponent;
