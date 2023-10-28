import React, {ChangeEvent} from 'react';
// import {FilterValuesType} from './App';
// import {FilterValuesType} from './AppWithReducer';
import {FilterValuesType, TasksStateType, TodolistType} from './AppWithRedux';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {
    Button,
    Checkbox,
    createTheme,
    CssBaseline,
    Icon,
    IconButton,
    List,
    ListItem,
    ThemeProvider, Typography
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {green, lightGreen} from "@mui/material/colors";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "./state/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {debug} from "util";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
    // todolistId: string
    // title: string
    // tasks: Array<TaskType>
    // removeTask: (taskId: string, todolistId: string) => void
    // changeFilter: (value: FilterValuesType, todolistId: string) => void
    // addTask: (title: string, todolistId: string) => void
    // changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    // changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    // removeTodolist: (id: string) => void
    // changeTodolistTitle: (id: string, newTitle: string) => void
    // filter: FilterValuesType
}

export function TodolistWithRedux({todolist}: PropsType) {

    const {todolistId, title, filter} = todolist

    const dispatch = useDispatch()
    const tasks = useSelector<rootStateType, TaskType[]>(state => state.tasks[todolistId])

    const removeTodolist = () => dispatch(removeTodolistAC(todolistId))
    // props.removeTodolist(props.todolistId)

    const onAllClickHandler = () => dispatch(changeFilterAC(todolistId, "all"))
    // props.changeFilter("all", props.todolistId);
    const onActiveClickHandler = () => dispatch(changeFilterAC(todolistId, "active"))
    // props.changeFilter("active", props.todolistId);
    const onCompletedClickHandler = () => dispatch(changeFilterAC(todolistId, "completed"))
    // props.changeFilter("completed", props.todolistId);

    const addTask = (title: string) => dispatch(addTaskAC(title, todolistId))
    // props.addTask(title, props.todolistId)

    const todolistTitleChangeHandler = (newTitle: string) => dispatch(changeTodolistTitleAC(todolistId, newTitle))
    // props.changeTodolistTitle(props.todolistId, newTitle)

    const taskTitleChangeHandler = (taskId: string, newTitle: string) => dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    // props.changeTaskTitle(taskId, newTitle, props.todolistId)

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
                oldTitle={title}       //{props.title}
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
                    // props.removeTask(t.id, props.todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, todolistId))
                        // props.changeTaskStatus(t.id, newIsDoneValue, props.todolistId);
                    }

                    // const taskTitleChangeHandler = (newTitle: string) => {
                    //     props.changeTaskTitle(t.id, newTitle, props.id)
                    //
                    // }

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
                            {/*x*/}
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
                // {props.filter === "all" ? "primary" : "secondary"}
                    disableElevation
                // className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button sx={{mr: "2px"}}
                    variant={"contained"}
                    size={"small"}
                    color={filter === "active" ? "primary" : "secondary"}
                // {props.filter === "active" ? "primary" : "secondary"}
                    disableElevation
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button sx={{mr: "2px"}}
                    variant={"contained"}
                    size={"small"}
                    color={filter === "completed" ? "primary" : "secondary"}
                // {props.filter === "completed" ? "primary" : "secondary"}
                    disableElevation
                // className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>

    </div>
}


