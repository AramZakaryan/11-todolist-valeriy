// import {TasksStateType, TodolistType} from "../App";
// import {TasksStateType, TodolistType} from "../AppWithReducer";
import {TasksStateType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";
import {addTodolistActionType, removeTodolistActionType, todolistId1, todolistId2} from "./todolistsReducer";

export type ActionType = removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | addTodolistActionType
    | removeTodolistActionType

type removeTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todolistId}
    } as const
}


type addTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistId}
    } as const
}

type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {id, isDone, todolistId}
    } as const
}

type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {id, newTitle, todolistId}
    } as const
}

const tasksInitialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const tasksReducer = (state: TasksStateType = tasksInitialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t =>
                    t.id !== action.payload.id
                )
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [
                    {id: v1(), title: action.payload.title, isDone: false},
                    ...state[action.payload.todolistId]
                ]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.id
                        ? {...t, isDone: action.payload.isDone}
                        : t
                )
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.id
                        ? {...t, title: action.payload.newTitle}
                        : t
                )
            }
        case 'REMOVE-TODOLIST':
            // let copyState = {...state}
            // delete copyState[action.payload.todolistId]
            // return copyState
            const {[action.payload.todolistId]: todolistTobeDeleted, ...restState} = state
            return restState
        case 'ADD-TODOLIST':
            return {[action.payload.todolistId]: [], ...state}
        default:
            // throw new Error('I don\'t understand this type')
            return state
    }
}