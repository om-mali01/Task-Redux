import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddTaskAction } from "../redux/actions/TaskAction";
import {getTasksAction} from "../redux/actions/loginAction";

const AddTaskForm=({setIsData})=> {
    const [form, setForm] = useState({
        title: '',
        description: '',
    })

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        dispatch(AddTaskAction(form, ()=>{
            console.log("closing the form")
            setIsData(false);
            dispatch(getTasksAction(1));
        }));
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleClose = (e) => {
        console.log("close btn pressed")
        setIsData(false);
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-center text-lg font-bold mb-4">Create New Task</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="p-2 border rounded mb-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="p-2 border rounded mb-4"
                        required
                    />
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
                        <button onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTaskForm;