// import {TasksStateType, TodolistType} from "../App";
// import {TasksStateType, TodolistType} from "../AppWithReducer";
import {TasksStateType, TodolistType} from "../AppWithRedux";
import {addTodolistAC, todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []
    const newTodolistId = v1()

    const action = addTodolistAC('new todolist',newTodolistId )

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].todolistId

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})
