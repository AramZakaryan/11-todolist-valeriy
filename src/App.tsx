import React from "react";
// import './App.css';
// import React, {useState} from 'react';
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
// /* forDel*/ import "./state/todolistsReducer"
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
// function App() {
//     const todolistId1 = v1();
//     const todolistId2 = v1();
//
//     const [todolists, setTodolists] = useState<Array<TodolistType>>([
//         {todolistId: todolistId1, title: "What to learn", filter: "all"},
//         {todolistId: todolistId2, title: "What to buy", filter: "all"}
//     ])
//     const [tasks, setTasks] = useState<TasksStateType>({
//         [todolistId1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "React Book", isDone: true}
//         ]
//     });
//
//     const [isLightMode, setIsLightMode] = useState<"light" | "dark">("light")
//
//     function removeTask(id: string, todolistId: string) {
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
//         tasks[todolistId] = todolistTasks.filter(t => t.id != id);
//         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         setTasks({...tasks});
//     }
//
//     function addTask(title: string, todolistId: string) {
//         let task = {id: v1(), title: title, isDone: false};
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
//         tasks[todolistId] = [task, ...todolistTasks];
//         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         setTasks({...tasks});
//     }
//
//     function changeStatus(id: string, isDone: boolean, todolistId: string) {
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         // найдём нужную таску:
//         let task = todolistTasks.find(t => t.id === id);
//         //изменим таску, если она нашлась
//         if (task) {
//             task.isDone = isDone;
//             // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//             setTasks({...tasks});
//         }
//
//     }
//
//     function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         // найдём нужную таску:
//         let task = todolistTasks.find(t => t.id === id);
//         //изменим таску, если она нашлась
//         if (task) {
//             task.title = newTitle;
//             // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//             setTasks({...tasks});
//         }
//     }
//
//     function changeFilter(value: FilterValuesType, todolistId: string) {
//         let todolist = todolists.find(tl => tl.todolistId === todolistId);
//         if (todolist) {
//             todolist.filter = value;
//             setTodolists([...todolists])
//         }
//     }
//
//     function removeTodolist(id: string) {
//         // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
//         setTodolists(todolists.filter(tl => tl.todolistId != id));
//         // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
//         delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
//         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         setTasks({...tasks});
//     }
//
//     const addTodolist = (title: string) => {
//         let newTodolistId: string = v1()
//         let newTodolist: TodolistType = {todolistId: newTodolistId, title: title, filter: "all"}
//         setTodolists([...todolists, newTodolist])
//         setTasks({...tasks, [newTodolistId]: []})
//     }
//
//     const changeTodolistTitle = (todolistId: string, title: string) => { // title is a new title
//         // let todolistToBeChanged= todolists.find(tl => tl.id === todolistId)
//         //  if (todolistToBeChanged){
//         //      todolistToBeChanged.title=title
//         //      setTodolists([...todolists])
//         //  }
//         setTodolists(todolists.map(tl => tl.todolistId === todolistId ? {...tl, title} : tl))
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
//                         {isLightMode==="light"?"Set Dark":"Set Light"}
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
// export default App;
//
//
