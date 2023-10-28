import React from "react";
// import './App.css';
// import React, {Reducer, useState, useReducer} from 'react';
// import {TaskType, Todolist} from './Todolist';
// import {v1} from 'uuid';
// import {AddItemForm} from "./AddItemForm";
// import {
//     AppBar,
//     Button,
//     Container,
//     createTheme,
//     Grid,
//     IconButton, Paper,
//     ThemeProvider,
//     Toolbar,
//     Typography
// } from "@mui/material";
// import {blue, green, grey, lightGreen, red, yellow} from "@mui/material/colors";
// import {Menu} from "@mui/icons-material";
// /* forDel*/
// import "./state/todolistsReducer"
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";
// import {
//     addTodolistAC,
//     changeFilterAC, changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsActionType,
//     todolistsReducer
// } from "./state/todolistsReducer";
//
// export type FilterValuesType = "all" | "active" | "completed";
// export type TodolistType = {
//     todolistId: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
//
// function AppWithReducer() {
//     const todolistId1 = v1();
//     const todolistId2 = v1();
//
//     const [todolists, dispatchTodolists] = useReducer<Reducer<Array<TodolistType>, todolistsActionType>>(
//         todolistsReducer,
//         [
//             {todolistId: todolistId1, title: "What to learn", filter: "all"},
//             {todolistId: todolistId2, title: "What to buy", filter: "all"}
//         ]
//     )
//     const [tasks, dispatchTasks] = useReducer(
//         tasksReducer,
//         {
//             [todolistId1]: [
//                 {id: v1(), title: "HTML&CSS", isDone: true},
//                 {id: v1(), title: "JS", isDone: true}
//             ],
//             [todolistId2]: [
//                 {id: v1(), title: "Milk", isDone: true},
//                 {id: v1(), title: "React Book", isDone: true}
//             ]
//         }
//     )
//
//     const [isLightMode, setIsLightMode] = useState<"light" | "dark">("light")
//
//     function removeTask(id: string, todolistId: string) {
//         // let todolistTasks = tasks[todolistId];
//         // tasks[todolistId] = todolistTasks.filter(t => t.id != id);
//         // setTasks({...tasks});
//         dispatchTasks(removeTaskAC(id, todolistId))
//     }
//
//     function addTask(title: string, todolistId: string) {
//         // let task = {id: v1(), title: title, isDone: false};
//         // let todolistTasks = tasks[todolistId];
//         // tasks[todolistId] = [task, ...todolistTasks];
//         // setTasks({...tasks});
//         dispatchTasks( addTaskAC(title,todolistId))
//     }
//
//     function changeStatus(id: string, isDone: boolean, todolistId: string) {
//         // let todolistTasks = tasks[todolistId];
//         // let task = todolistTasks.find(t => t.id === id);
//         // if (task) {
//         //     task.isDone = isDone;
//         //     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         //     setTasks({...tasks});
//         // }
//         dispatchTasks(changeTaskStatusAC(id,isDone,todolistId))
//     }
//
//     function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
//         // let todolistTasks = tasks[todolistId];
//         // let task = todolistTasks.find(t => t.id === id);
//         // if (task) {
//         //     task.title = newTitle;
//         //     setTasks({...tasks});
//         // }
//         dispatchTasks(changeTaskTitleAC(id, newTitle,todolistId))
//     }
//
//     function changeFilter(value: FilterValuesType, todolistId: string) {
//         // let todolist = todolists.find(tl => tl.todolistId === todolistId);
//         // if (todolist) {
//         //     todolist.filter = value;
//         //     setTodolists([...todolists])
//         // }
//         dispatchTodolists(changeFilterAC(todolistId, value))
//     }
//
//     function removeTodolist(id: string) {
//         // setTodolists(todolists.filter(tl => tl.todolistId != id));
//         // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
//         // setTasks({...tasks});
//         const removeTodolistAction =  removeTodolistAC(id)
//         dispatchTodolists(removeTodolistAction)
//         dispatchTasks(removeTodolistAction)
//     }
//
//     const addTodolist = (title: string) => {
//         // let newTodolist: TodolistType = {todolistId: newTodolistId, title: title, filter: "all"}
//         // setTodolists([...todolists, newTodolist])
//         // setTasks({...tasks, [newTodolistId]: []})
//         const addTodolistAction = addTodolistAC(title, v1())
//         dispatchTodolists(addTodolistAction)
//         dispatchTasks(addTodolistAction)
//     }
//
//     const changeTodolistTitle = (todolistId: string, title: string) => { // title is a new title
//         // setTodolists(todolists.map(tl => tl.todolistId === todolistId ? {...tl, title} : tl))
//         dispatchTodolists(changeTodolistTitleAC(todolistId,title))
//     }
//
//     const changeModeHandler = () => {
//         isLightMode === "light"
//             ? setIsLightMode("dark")
//             : setIsLightMode("light")
//     }
//
//     const myTheme = createTheme({
//         palette: {
//             primary: {main: yellow.A400},
//             secondary: {main: grey["300"]},
//             success: {main: red.A700},
//             mode: isLightMode
//
//         }
//
//     })
//
//     return (
//         <ThemeProvider theme={myTheme}>
//             <AppBar position={"static"}>
//                 <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
//                     <IconButton color={"inherit"}>
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant={"h6"}>Todolists </Typography>
//                     <Button variant={"outlined"}
//                             color={"inherit"}
//                             onClick={changeModeHandler}
//                     >
//                         {isLightMode === "light" ? "Set Dark" : "Set Light"}
//                     </Button>
//                     <Button variant={"outlined"}
//                             color={"inherit"}
//                     >
//                         LogOut
//                     </Button>
//                 </Toolbar>
//             </AppBar>
//
//             <div className="App" style={{alignItems: "flex-start"}}>
//                 <Container>
//                     <Grid container
//                           sx={{
//                               p: "15px 0",
//                               m: "5px"
//                           }}
//                     >
//                         <AddItemForm addItem={addTodolist}/>
//                     </Grid>
//                     <Grid container spacing={"30px"}>
//                         {
//                             todolists.map(tl => {
//                                 let allTodolistTasks = tasks[tl.todolistId];
//                                 let tasksForTodolist = allTodolistTasks;
//
//                                 if (tl.filter === "active") {
//                                     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
//                                 }
//                                 if (tl.filter === "completed") {
//                                     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
//                                 }
//
//                                 return <Grid item>
//                                     <Paper sx={{p: "15px"}}
//                                            elevation={8}
//                                     >
//                                         <Todolist
//                                             key={tl.todolistId}
//                                             todolistId={tl.todolistId}
//                                             title={tl.title}
//                                             tasks={tasksForTodolist}
//                                             removeTask={removeTask}
//                                             changeFilter={changeFilter}
//                                             addTask={addTask}
//                                             changeTaskStatus={changeStatus}
//                                             filter={tl.filter}
//                                             removeTodolist={removeTodolist}
//                                             changeTaskTitle={changeTaskTitle}
//                                             changeTodolistTitle={changeTodolistTitle}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             })
//                         }
//                     </Grid>
//                 </Container>
//             </div>
//
//         </ThemeProvider>
//     );
// }
//
// export default AppWithReducer;
//
//
