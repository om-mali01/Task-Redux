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
        dispatch(AssignTaskAction(form));
        setAssignForm(false);
    }

    return(
        <div className="flex justify-center items-center h-52 w-60 bg-slate-400 rounded-md m-4 relative">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 absolute bottom-10">
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

                <button type="submit"
                className="bg-white rounded-md w-fit h-7 text-sm p-1 m-5"
                >Assign Task</button>

            </form>
        </div>
    )
}

export default AssignTaskForm;