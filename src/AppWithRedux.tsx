import './App.css';
import React, {Reducer, useState, useReducer} from 'react';
import {TaskType, TodolistWithRedux} from './TodolistWithRedux';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    createTheme,
    Grid,
    IconButton, Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {blue, green, grey, lightGreen, red, yellow} from "@mui/material/colors";
import {Menu} from "@mui/icons-material";
/* forDel*/
import "./state/todolistsReducer"
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";
import {
    addTodolistAC,
    changeFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsActionType,
    todolistsReducer
} from "./state/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const todolistId1 = v1();
export const todolistId2 = v1();


function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<rootStateType,TodolistType[]>(state => state.todolists)
    // const tasks = useSelector<rootStateType, TasksStateType>(state => state.tasks)

    const [isLightMode, setIsLightMode] = useState<"light" | "dark">("light")

    // function removeTask(id: string, todolistId: string) {
    //     // dispatchTasks(removeTaskAC(id, todolistId))
    //     dispatch(removeTaskAC(id, todolistId))
    // }

    // function addTask(title: string, todolistId: string) {
    //     // dispatchTasks( addTaskAC(title,todolistId))
    //     dispatch( addTaskAC(title,todolistId))
    // }

    // function changeStatus(id: string, isDone: boolean, todolistId: string) {
    //     // dispatchTasks(changeTaskStatusAC(id,isDone,todolistId))
    //     dispatch(changeTaskStatusAC(id,isDone,todolistId))
    // }

    // function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    //     // dispatchTasks(changeTaskTitleAC(id, newTitle,todolistId))
    //     dispatch(changeTaskTitleAC(id, newTitle,todolistId))
    // }

    // function changeFilter(value: FilterValuesType, todolistId: string) {
    //     // dispatchTodolists(changeFilterAC(todolistId, value))
    //     dispatch(changeFilterAC(todolistId, value))
    // }

    // function removeTodolist(id: string) {
    //     // const removeTodolistAction =  removeTodolistAC(id)
    //     // dispatchTodolists(removeTodolistAction)
    //     // dispatchTasks(removeTodolistAction)
    //     dispatch(removeTodolistAC(id))
    // }

    const addTodolist = (title: string) => {
        // const addTodolistAction = addTodolistAC(title, v1())
        // dispatchTodolists(addTodolistAction)
        // dispatchTasks(addTodolistAction)
        dispatch(addTodolistAC(title, v1()))

    }

    // const changeTodolistTitle = (todolistId: string, title: string) => { // title is a new title
    //     // dispatchTodolists(changeTodolistTitleAC(todolistId,title))
    //     dispatch(changeTodolistTitleAC(todolistId,title))
    // }

    const changeModeHandler = () => {
        isLightMode === "light"
            ? setIsLightMode("dark")
            : setIsLightMode("light")
    }

    const myTheme = createTheme({
        palette: {
            primary: {main: yellow.A400},
            secondary: {main: grey["300"]},
            success: {main: red.A700},
            mode: isLightMode

        }

    })

    return (
        <ThemeProvider theme={myTheme}>
            <AppBar position={"static"}>
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>Todolists </Typography>
                    <Button variant={"outlined"}
                            color={"inherit"}
                            onClick={changeModeHandler}
                    >
                        {isLightMode === "light" ? "Set Dark" : "Set Light"}
                    </Button>
                    <Button variant={"outlined"}
                            color={"inherit"}
                    >
                        LogOut
                    </Button>
                </Toolbar>
            </AppBar>

            <div className="App" style={{alignItems: "flex-start"}}>
                <Container>
                    <Grid container
                          sx={{
                              p: "15px 0",
                              m: "5px"
                          }}
                    >
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={"30px"}>
                        {
                            todolists.map(tl => {
                                // let allTodolistTasks = tasks[tl.todolistId];
                                // let tasksForTodolist = allTodolistTasks;
                                //
                                // if (tl.filter === "active") {
                                //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                                // }
                                // if (tl.filter === "completed") {
                                //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                                // }

                                return <Grid item
                                             key={tl.todolistId}>
                                    <Paper sx={{p: "15px"}}
                                           elevation={8}
                                    >
                                        <TodolistWithRedux
                                            todolist={tl}
                                            // todolistId={tl.todolistId}
                                            // title={tl.title}
                                            // tasks={tasksForTodolist}
                                            // removeTask={removeTask}
                                            // changeFilter={changeFilter}
                                            // addTask={addTask}
                                            // changeTaskStatus={changeStatus}
                                            // filter={tl.filter}
                                            // removeTodolist={removeTodolist}
                                            // changeTaskTitle={changeTaskTitle}
                                            // changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            })
                        }
                    </Grid>
                </Container>
            </div>

        </ThemeProvider>
    );
}

export default AppWithRedux;


