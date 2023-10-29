import './App.css';
import React, {Reducer, useState, useReducer, useCallback} from 'react';
import {ChildrenComponent, ParentComponent, TaskType, TodolistWithRedux} from './TodolistWithRedux';
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
import "./state/todolistsReducer"
import {
    addTodolistAC,
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

    const [isLightMode, setIsLightMode] = useState<"light" | "dark">("light")

    const addTodolist = useCallback((title: string) =>
        dispatch(addTodolistAC(title, v1()))
    ,[dispatch])

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
                                return <Grid item
                                             key={tl.todolistId}>
                                    <Paper sx={{p: "15px"}}
                                           elevation={8}
                                    >
                                        <TodolistWithRedux
                                            todolist={tl}
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


