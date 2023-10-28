// import {FilterValuesType, TodolistType} from "../App";
// import {FilterValuesType, TodolistType} from "../AppWithReducer";
import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";

export const todolistId1 = v1();
export const todolistId2 = v1();



const todolistsInitialState:TodolistType[] = [
    {todolistId: todolistId1, title: "What to learn", filter: "all"},
    {todolistId: todolistId2, title: "What to buy", filter: "all"}
]

export const todolistsReducer = (state:TodolistType[] =todolistsInitialState, action: todolistsActionType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.todolistId !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            return [
                {todolistId: action.payload.todolistId, title: action.payload.title, filter: "all"},
                ...state
            ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.todolistId === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.todolistId === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        default:
            // throw new Error('I don\'t understand this type')
            return state
    }
}


export type todolistsActionType = removeTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleActionType
    | changeFilterrActionType

export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId: todolistId}
    } as const
}

export type addTodolistActionType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, todolistId:string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, todolistId}
    } as const
}

type changeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId, title}
    } as const
}

type changeFilterrActionType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistId, filter}
    } as const
}

