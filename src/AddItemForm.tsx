import React, { ChangeEvent, KeyboardEvent, useState } from "react";
// import { Button } from '@material-ui/core';
// import { Omit } from '@material-ui/types';
import Button from '@mui/material/Button';








type AddItemFormPropstype = {
    addItem: (title: string) => void
}
function AddItemForm(props: AddItemFormPropstype) {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);


    const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("");
        } else {
            setError("Пустая Задача")
        }

    }

    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    return <div>
        <input value={newTaskTitle}
            onChange={onChangeHandlerTitle}
            onKeyPress={onKeyPressEnter}
            className={error ? "error" : ""}
        />
        <Button>+</Button>

        <button onClick={addTask}>+</button>

        {error && <div className="error-message">{error}</div>}
    </div>

}
export default AddItemForm;