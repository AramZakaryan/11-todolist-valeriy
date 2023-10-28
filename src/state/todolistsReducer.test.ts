import {todolistsActionType, todolistsReducer} from './todolistsReducer'
import {v1} from 'uuid'
// import {FilterValuesType, TodolistType} from "../App";
// import {FilterValuesType, TodolistType} from "../AppWithReducer";
import {FilterValuesType, TodolistType} from "../AppWithRedux";

let todolistId1:string
let todolistId2:string

let startState: Array<TodolistType>

beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {todolistId: todolistId1, title: 'What to learn', filter: 'all'},
        {todolistId: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(
        startState,
        {type: 'REMOVE-TODOLIST', payload: {todolistId: todolistId1}}
    )

    expect(endState.length).toBe(1)
    expect(endState[0].todolistId).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist'
    let newTodolistId = v1()

    const endState = todolistsReducer(
        startState,
        {type: 'ADD-TODOLIST', payload: {title: newTodolistTitle, todolistId: newTodolistId }}
    )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].todolistId).toBe(newTodolistId)
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId: todolistId2, title: newTodolistTitle}
    } as const


    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistId: todolistId2, filter: newFilter}
    } as const

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

