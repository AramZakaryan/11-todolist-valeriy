import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todolistsReducer} from "./todolistsReducer";


const rootReducer = combineReducers(
    {
        tasks: tasksReducer,
        todolists: todolistsReducer
    }
)

export const store = legacy_createStore(rootReducer)

export type rootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store