import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { UpdateTaskAction } from "../redux/actions/TaskAction";

function UpdateTaskForm({id, setIsUpdatedForm , isUpdatedForm}){
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: '',
        id
    })

    const dispatch = useDispatch();
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(form);
        dispatch(UpdateTaskAction(form, ()=> {
            setIsUpdatedForm(false);
        }));  
    }
    
    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleCLose = (e) =>{
        setIsUpdatedForm(false);
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        { isUpdatedForm && <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3 p-5 items-center">
            <h1 className="text-lg font-bold">Update the Task</h1>
                <input type="text" 
                placeholder="Task Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="p-1"
                />

                <input type="text"
                placeholder="Description" 
                name="description"
                value={form.description}
                onChange={handleChange}
                className="p-1"
                />

                <input type="text"
                placeholder="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="p-1"
                />

                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
                    >Update Task</button>

                    <button 
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handleCLose}
                    >Close</button>
                </div>

            </form>
        </div>}

        </div>
        
    )
}

export default UpdateTaskForm;