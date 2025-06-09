import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddTaskAction } from "../redux/actions/TaskAction";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
        }));
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return(
        <div className="flex justify-center items-center h-52 w-60 bg-slate-400 rounded-md m-4 relative">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 absolute bottom-10">
                <h1 className="text-center">Create New Task</h1>

                <input type="text"
                placeholder="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="p-1"
                required
                />

                <input type="text"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                name="description"
                className="p-1"
                required />

                <button
                type="submit"
                className="bg-white rounded-md w-fit h-7 text-sm p-1"
                >Add Task</button>

            </form>
        </div>
    )
}

export default AddTaskForm;