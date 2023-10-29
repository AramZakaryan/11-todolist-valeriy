import React, {ChangeEvent, useCallback} from 'react';
import {TodolistType} from './AppWithRedux';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem, Paper,
    Typography
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {green, lightGreen} from "@mui/material/colors";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "./state/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

type ParentComponentType = {
    children: React.ReactNode
}

export const ParentComponent = ({children}:ParentComponentType) => {
    return (<>
            <Paper>
                <br/>
                ParentComponent
                <br/>
                {children}
                <br/>
                ParentComponent
                <br/>

            </Paper>
        </>
    )
}


export const ChildrenComponent = () => {
    return (<>
            <Paper>
                ChildrenComponent
            </Paper>
        </>
    )
}


export function TodolistWithRedux({todolist}: PropsType) {

    console.log("Todolist render.")

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

    const taskTitleChangeHandler = useCallback(
        (taskId: string, newTitle: string) => dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
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
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, todolistId))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, todolistId))
                    }

                    return <ListItem
                        sx={{p: "0 2px"}}
                        key={t.id}
                        className={t.isDone ? "is-done" : ""}
                    >
                        <Checkbox
                            size={"small"}
                            color={"success"}
                            onChange={onChangeHandler}
                            checked={t.isDone}
                        />
                        <EditableSpan oldTitle={t.title}
                                      onChange={(newTitle) => taskTitleChangeHandler(t.id, newTitle)}/>
                        <IconButton onClick={onClickHandler}
                                    size={"small"}
                        >
                            <DeleteForeverIcon fontSize={"small"}/>
                        </IconButton>
                    </ListItem>
                })
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


