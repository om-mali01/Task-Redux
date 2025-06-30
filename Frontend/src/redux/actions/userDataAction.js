import apiclient from "../../utils/apiclient";
import { userData } from "../reducers/userReducer"


export const getUserInfoAction = () => async(dispatch) => {
    try{
        dispatch(userData([]))
        const uData = await apiclient.get('/get-user-info');
        dispatch(userData(uData));
    }
    catch(error){
        console.log(error)
    }
}