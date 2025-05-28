import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { loginAction } from "../redux/actions/loginAction";

function Login(){
    const [form, setForm] = useState({
        user_name: '',
        password: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const userdata = useSelector((state)=>{
    //     console.log(state,"fjkldasjfkljklsajd")
    //     return state.userDataEverything.userData
    // })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        dispatch(loginAction(form))
        // console.log(userdata,"fjalksjkfljsakljdjaskljfas")
    }

    return(
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="bg-gray-200 p-8 rounded-md w-96">
            <h1 className="text-center pb-5 text-lg">Login</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <input type="text"
                    placeholder="Enter User Name"
                    name="user_name"
                    value={form.user_name}
                    onChange={handleChange}
                    className="p-3 w-full"
                    />

                    <input type="text"
                    placeholder="Enter Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="p-3 w-full" />

                    <button className="w-full bg-blue-400 h-10"
                    onClick={()=>navigate("/home")}>Login</button>

                    <button className="w-full bg-blue-400 h-10"
                    onClick={()=>navigate("/register")}>Register</button>

                </form>
            </div>
        </div>
    )
}

export default Login;