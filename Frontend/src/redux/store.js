import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer"

const rootReducer = combineReducers({
    userDataEverything: userReducer
})

export const store = configureStore({
    reducer: rootReducer
})
