import { useDispatch, useSelector } from "react-redux";
import { DeleteTaskAction } from "../redux/actions/TaskAction";
import { getTasksAction } from "../redux/actions/loginAction";
import { useEffect, useState } from "react";
import UpdateTaskForm from "./updateTaskForm"

function TaskComponent() {
    const dispatch = useDispatch();
    const Data = useSelector((state) => state.userDataEverything.getTask);
    const DataLength = useSelector((state) => state.userDataEverything.DataLength);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationStart, setPaginationStart] = useState(1);

    const [isUpdatedForm, setIsUpdatedForm] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null); // Track task to update

    useEffect(() => {
        dispatch(getTasksAction(currentPage));
    }, [currentPage]);

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
                    Data.map((task) => (
                        <div key={task.id} className="w-96 p-2 m-5 h-[160px] bg-white rounded-md">
                            <h2 className="text-lg">{task.title}</h2>
                            <p className="text-sm">{task.description}</p>
                            <p className="text-sm flex">
                                <b className="p-1">Status:</b>
                                <span className={`text-sm ml-2 w-fit p-1 rounded-sm ${getStatusBg(task.status)}`}>
                                    {task.status}
                                </span>
                            </p>
                            <p className="text-sm"><b>Created at:</b> {task.created_at}</p>

                            {/* Open update form when clicking Update */}
                            <button 
                                className="bg-blue-300 text-sm p-1 m-3 rounded-md"
                                onClick={() => {
                                    setIsUpdatedForm(true);
                                    setSelectedTaskId(task.id);
                                }}
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

            {/* Pagination remains unchanged */}
            <div className="flex justify-center space-x-2 p-4">
                <button 
                    className="bg-gray-300 px-4 py-2 rounded-md"
                    onClick={() => {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                            if ((currentPage - 1) % 3 === 0) {
                                setPaginationStart(paginationStart - 3);
                            }
                        }
                    }}
                >
                    Prev
                </button>

                {[paginationStart, paginationStart + 1, paginationStart + 2].map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-md ${currentPage === page ? "bg-gray-500 text-white" : "bg-gray-300"}`}
                    >
                        {page}
                    </button>
                ))}

                {Data.length >= 6 && (
                    <button 
                        className="bg-gray-300 px-4 py-2 rounded-md"
                        onClick={() => {
                            if (currentPage % 3 === 0) {
                                setPaginationStart(paginationStart + 3);
                            }
                            setCurrentPage(currentPage + 1);
                        }}
                    >
                        Next
                    </button>
                )}
            </div>

            {/* Show UpdateTaskForm when update button is clicked */}
            {isUpdatedForm && (
                <UpdateTaskForm 
                    id={selectedTaskId} 
                    setIsUpdatedForm={setIsUpdatedForm} 
                    isUpdatedForm={isUpdatedForm} 
                />
            )}
        </div>
    );
}

export default TaskComponent;
