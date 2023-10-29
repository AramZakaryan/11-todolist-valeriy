import React, {useCallback} from 'react';
import {TodolistType} from './AppWithRedux';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List, Paper, Typography} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "./state/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolistsReducer";
import {addTaskAC} from "./state/tasksReducer";
import {TaskWithRedux} from "./TaskWithRedux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}




export function TodolistWithRedux({todolist}: PropsType) {

    const {todolistId, title, filter} = todolist

    const dispatch = useDispatch()
    const tasks = useSelector<rootStateType, TaskType[]>(state => state.tasks[todolistId])

    const removeTodolist = () =>
        dispatch(removeTodolistAC(todolistId))

    const onAllClickHandler = () =>
        dispatch(changeFilterAC(todolistId, "all"))

    const onActiveClickHandler = () =>
        dispatch(changeFilterAC(todolistId, "active"))

    const onCompletedClickHandler = () =>
        dispatch(changeFilterAC(todolistId, "completed"))


    const addTask = useCallback(
        (title: string) => dispatch(addTaskAC(title, todolistId))
        , [dispatch, todolistId])

    const todolistTitleChangeHandler = useCallback(
        (newTitle: string) => dispatch(changeTodolistTitleAC(todolistId, newTitle))
        , [dispatch, todolistId])

    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks


    if (filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }

    if (filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }

    return <div>
        <Typography variant={"h5"}
                    sx={{fontWeight: "bold"}}
                    align={"center"}
        >
            <EditableSpan
                oldTitle={title}
                onChange={todolistTitleChangeHandler}
            />
            <IconButton onClick={removeTodolist}
                        size={"small"}
            >

                <DeleteForeverIcon
                    fontSize={"small"}
                />
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTask}/>
        <List>
            {tasksForTodolist.map(t =>
                <TaskWithRedux key={t.id}
                               task={t}
                               todolistId={todolistId}
                />
            )
            }
        </List>
        <div style={{display: "flex", justifyContent: "space-around"}}>
            <Button sx={{mr: "2px"}}
                    variant={"contained"}
                    size={"small"}
                    color={filter === "all" ? "primary" : "secondary"}
                    disableElevation
                    onClick={onAllClickHandler}>All
            </Button>
            <Button sx={{mr: "2px"}}
                    variant={"contained"}
                    size={"small"}
                    color={filter === "active" ? "primary" : "secondary"}
                    disableElevation
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button sx={{mr: "2px"}}
                    variant={"contained"}
                    size={"small"}
                    color={filter === "completed" ? "primary" : "secondary"}
                    disableElevation
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

