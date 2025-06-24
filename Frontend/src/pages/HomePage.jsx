import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../components/dashboard";
import TaskComponent from "../components/taskComponent";

function HomePage() {

    // const dispatch = useDispatch()
    // const userData = useSelector((state) =>
    //     {
    //         console.log(state,"faskljfklsajklfjklasd")
    //         return state.userDataEverything
    //     });

    // console.log(userData,"fgsagdfsghsdhsdfhsdf");

    // useEffect(()=>{
    //     // dispatch(getTasksAction(1))
    //     // dispatch(getTasksLength())
    // }, [dispatch])

    return(
        <div>
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
                <Dashboard />
                <TaskComponent />
            </div>
        </div>
    )
}

export default HomePage;