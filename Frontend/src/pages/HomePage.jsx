import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../redux/actions/loginAction";

function HomePage() {

    const dispatch = useDispatch()
    const userData = useSelector((state) => 
        {
            console.log(state,"faskljfklsajklfjklasd")
            return state.userDataEverything.userData
        });

    console.log(userData,"fgsagdfsghsdhsdfhsdf")

    useEffect(()=>{
        dispatch(getTasks())
    },[])
    
    return(
        <div>
            <div>
                <h1>Home Page</h1>
                {userData.username}<br />
                {userData.email}
            </div>
        </div>
    )
}

export default HomePage;