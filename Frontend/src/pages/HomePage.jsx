import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../redux/actions/loginAction";
import Dashboard from "../components/dashboard";
import TaskComponent from "../components/taskComponent";
import AddTaskForm from "../components/addTaskForm";

function HomePage() {

    const dispatch = useDispatch()
    const userData = useSelector((state) => 
        {
            console.log(state,"faskljfklsajklfjklasd")
            return state.userDataEverything
        });

    console.log(userData,"fgsagdfsghsdhsdfhsdf");

    useEffect(()=>{
        dispatch(getTasks())
    }, [])

    return(
        <div>
            <div>
                <Dashboard />
                <TaskComponent />
              
            </div>
        </div>
    )
}

export default HomePage;