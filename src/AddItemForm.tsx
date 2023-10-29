import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {Button, TextField} from "@mui/material";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = memo((props:AddItemFormPropsType) => {

    const [title,
        setTitle] =
        useState("")
    const [error,
        setError] =
        useState<boolean>(false)

    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else if (!error){
            setError(true);
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error) {
            setError(false)
        }
        if (e.charCode === 13) {
            addItem();
        }
    }


    return (<div style={{display:"flex", alignItems: "center"}}
    >
        <TextField value={title}
                   variant={"outlined"}
                   size={"small"}
                   sx={{mr: "5px"}}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
                   error={error}
                   helperText={error?"Title is required":undefined}
        />
        <Button variant={"contained"}
                color={"primary"}
                size={"small"}
            // startIcon={<AddCircleOutline/>}
                onClick={addItem}
        >
            {/*add*/}
            <AddCircleOutline fontSize={"small"}/>
        </Button>
    </div>)
})