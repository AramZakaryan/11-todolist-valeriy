import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    oldTitle: string
    onChange: (newTitle: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const [editMode, setEditMode] = useState(false)
    // const activateEditMode = () => {
    //     setEditMode(true)
    // }
    // const activateViewMode = () => {
    //     setEditMode(false)
    //     props.onChange(newTitle)
    // }

    const editHandler = () => {
        setEditMode(!editMode)
        if(editMode) {props.onChange(newTitle)}
    }
    const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {

        setNewTitle(ev.currentTarget.value)
    }
    return (
                editMode
                    ? <TextField
                    variant={"standard"}
                        value={newTitle}
                        autoFocus
                        onBlur={editHandler}
                        onChange={onChangeHandler}
                    />
                    : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    )
}