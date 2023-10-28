import React from "react";
// import React, {ChangeEvent} from 'react';
// // import {FilterValuesType} from './App';
// // import {FilterValuesType} from './AppWithReducer';
// import {FilterValuesType} from './AppWithRedux';
// import {AddItemForm} from "./AddItemForm";
// import {EditableSpan} from "./EditableSpan";
// import {
//     Button,
//     Checkbox,
//     createTheme,
//     CssBaseline,
//     Icon,
//     IconButton,
//     List,
//     ListItem,
//     ThemeProvider, Typography
// } from "@mui/material";
// // import DeleteIcon from '@mui/icons-material/Delete';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import {green, lightGreen} from "@mui/material/colors";
//
//
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     todolistId: string
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (taskId: string, todolistId: string) => void
//     changeFilter: (value: FilterValuesType, todolistId: string) => void
//     addTask: (title: string, todolistId: string) => void
//     changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
//     changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
//     removeTodolist: (id: string) => void
//     changeTodolistTitle: (id: string, newTitle: string) => void
//     filter: FilterValuesType
// }
//
// export function Todolist(props: PropsType) {
//
//     const removeTodolist = () => props.removeTodolist(props.todolistId)
//
//     const onAllClickHandler = () => props.changeFilter("all", props.todolistId);
//     const onActiveClickHandler = () => props.changeFilter("active", props.todolistId);
//     const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistId);
//
//     const addTask = (title: string) => {
//         props.addTask(title, props.todolistId)
//     }
//
//     const todolistTitleChangeHandler = (newTitle: string) => {
//         props.changeTodolistTitle(props.todolistId, newTitle)
//     }
//
//     const taskTitleChangeHandler = (taskId: string, newTitle: string) => {
//         props.changeTaskTitle(taskId, newTitle, props.todolistId)
//
//     }
//
//
//     return <div>
//         <Typography variant={"h5"}
//                     sx={{fontWeight:"bold"}}
//             align={"center"}
//         >
//             <EditableSpan oldTitle={props.title}
//                           onChange={todolistTitleChangeHandler}
//             />
//             <IconButton onClick={removeTodolist}
//                         size={"small"}
//             >
//
//                 <DeleteForeverIcon
//                     fontSize={"small"}
//                 />
//             </IconButton>
//
//         </Typography>
//         <AddItemForm addItem={addTask}/>
//         <List>
//             {
//                 props.tasks.map(t => {
//                     const onClickHandler = () => props.removeTask(t.id, props.todolistId)
//                     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//                         let newIsDoneValue = e.currentTarget.checked;
//                         props.changeTaskStatus(t.id, newIsDoneValue, props.todolistId);
//                     }
//
//                     // const taskTitleChangeHandler = (newTitle: string) => {
//                     //     props.changeTaskTitle(t.id, newTitle, props.id)
//                     //
//                     // }
//
//                     return <ListItem
//                         sx={{p:"0 2px"}}
//                         key={t.id}
//                         className={t.isDone ? "is-done" : ""}
//                     >
//                         <Checkbox
//                             size={"small"}
//                             color={"success"}
//                             onChange={onChangeHandler}
//                             checked={t.isDone}
//                         />
//                         <EditableSpan oldTitle={t.title}
//                                       onChange={(newTitle) => taskTitleChangeHandler(t.id, newTitle)}/>
//                         <IconButton onClick={onClickHandler}
//                                     size={"small"}
//                         >
//                             <DeleteForeverIcon fontSize={"small"}/>
//                             {/*x*/}
//                         </IconButton>
//                     </ListItem>
//                 })
//             }
//         </List>
//         <div style={{display: "flex", justifyContent: "space-around"}}>
//             <Button sx={{mr: "2px"}}
//
//                     variant={"contained"}
//                     size={"small"}
//                     color={props.filter === "all" ? "primary" : "secondary"}
//                     disableElevation
//                 // className={props.filter === 'all' ? "active-filter" : ""}
//                     onClick={onAllClickHandler}>All
//             </Button>
//             <Button sx={{mr: "2px"}}
//                     variant={"contained"}
//                     size={"small"}
//                     color={props.filter === "active" ? "primary" : "secondary"}
//                     disableElevation
//                     onClick={onActiveClickHandler}>Active
//             </Button>
//             <Button sx={{mr: "2px"}}
//                     variant={"contained"}
//                     size={"small"}
//                     color={props.filter === "completed" ? "primary" : "secondary"}
//                     disableElevation
//                 // className={props.filter === 'completed' ? "active-filter" : ""}
//                     onClick={onCompletedClickHandler}>Completed
//             </Button>
//         </div>
//
//     </div>
// }
//
//
