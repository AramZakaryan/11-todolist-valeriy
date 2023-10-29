import React, {ChangeEvent, memo, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    oldTitle: string
    onChange: (newTitle: string) => void
}
export const EditableSpan = memo(
    (props:EditableSpanPropsType) => {

    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const [editMode, setEditMode] = useState(false)

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
})