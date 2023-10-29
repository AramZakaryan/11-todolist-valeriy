import React, {ChangeEvent, memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {TaskType} from "./TodolistWithRedux";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {

    console.log("Task render.")

    const dispatch = useDispatch()

    const onClickHandler = () =>
        dispatch(removeTaskAC(task.id, todolistId))

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId))

    const taskTitleChangeHandler = useCallback((newTitle: string) =>
        dispatch(changeTaskTitleAC(task.id, newTitle, todolistId))
    ,[dispatch,task.id,todolistId])


    return <ListItem
        sx={{p: "0 2px"}}
        key={task.id}
        className={task.isDone ? "is-done" : ""}
    >
        <Checkbox
            size={"small"}
            color={"success"}
            onChange={onChangeHandler}
            checked={task.isDone}
        />
        <EditableSpan oldTitle={task.title}
                      onChange={taskTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}
                    size={"small"}
        >
            <DeleteForeverIcon fontSize={"small"}/>
        </IconButton>
    </ListItem>
})