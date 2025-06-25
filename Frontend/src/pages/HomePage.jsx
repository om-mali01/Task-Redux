import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../components/dashboard";
import TaskComponent from "../components/taskComponent";
// import PaginationExample from "../Pagination";

function HomePage() {

    const [selectedStatus, setStatus] = useState("all");

    const dispatch = useDispatch()
    const userData = useSelector((state) =>
        {
            console.log(state,"faskljfklsajklfjklasd")
            return state.userDataEverything
        });


    return(
        <div>
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden bg-[#030712]">
                <Dashboard selectedStatus={selectedStatus} setStatus={setStatus}/>
                <TaskComponent selectedStatus={selectedStatus} setStatus={setStatus}/>
            </div>
        </div>
    )
}

export default HomePage;