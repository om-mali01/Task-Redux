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
        dispatch(UpdateTaskAction(form));
        setIsUpdatedForm(false);    
    }
    
    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    return(
        (isUpdatedForm && <div className="flex justify-center items-center w-60 h-56 m-5 bg-slate-300">
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

                <button
                    type="submit"
                    className="bg-blue-300 w-fit p-1 rounded-md text-sm"
                >Update Task</button>

            </form>
        </div>)
    )
}

export default UpdateTaskForm;