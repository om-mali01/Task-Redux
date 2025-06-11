import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AssignTaskAction } from "../redux/actions/TaskAction";

function AssignTaskForm({setAssignForm}) {
    const [form, setForm] = useState({
        user_name: '',
        task: '',
        description: ''
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        dispatch(AssignTaskAction(form, () => {
            setAssignForm(false)
        }));
    }

    const handleClose = (e) => {
        setAssignForm(false);
    }

    return(
        <div className="flex items-center justify-center bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <h1 className="text-center">Assign Task</h1>

                    <input type="text"
                    placeholder="Enter User name"
                    name="user_name"
                    value={form.user_name}
                    onChange={handleChange}
                    required
                    className="p-2"
                    />

                    <input type="text"
                    placeholder="Enter Task"
                    name="task"
                    value={form.task}
                    onChange={handleChange}
                    className="p-1"
                    required/>

                    <input type="text"
                    placeholder="Enter Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="p-1"
                    />

                    <div>
                        <button type="submit"
                        className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
                        >Assign Task</button>

                        <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={handleClose}
                        >Close</button>
                    </div>
                </form>
            </div>

        </div>
        
    )
}

export default AssignTaskForm;