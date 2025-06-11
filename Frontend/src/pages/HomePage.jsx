import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getTasksAction, getTasksLength} from "../redux/actions/loginAction";
import Dashboard from "../components/dashboard";
import TaskComponent from "../components/taskComponent";
import AddTaskForm from "../components/addTaskForm";
import AssignTaskForm from "../components/assignTaskForm";
import Modal from "../components/TrialModal";
// import StaticExample from "../components/TrialModal";

function HomePage() {

    const dispatch = useDispatch()
    const userData = useSelector((state) => 
        {
            console.log(state,"faskljfklsajklfjklasd")
            return state.userDataEverything
        });

    console.log(userData,"fgsagdfsghsdhsdfhsdf");

    useEffect(()=>{
        dispatch(getTasksAction(1))
        dispatch(getTasksLength())
    }, [dispatch])

    return(
        <div>
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
                <Dashboard />
                <TaskComponent />
                {/* <Modal 
                    cstmClass={"w-[500px] h-[300px] bg-white"}
                    // setVisible={true}
                    showFooter={false}
                    visible={true}
                    innerContent={<div>hello</div>}
                    heading="hello"
                    /> */}
                {/* <StaticExample /> */}

            </div>
        </div>
    )
}

export default HomePage;