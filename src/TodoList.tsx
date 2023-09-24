
import { type } from "os";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "./App";

import { error } from "console";
import EditableSpan from "./EditableSpan";
import AddItemForm from "./AddItemForm"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string,
    title: string,
    tasks: TaskType[],
    removeTask: (id: string, TodoListId: string) => void,


    changeFilter: (value: FilterValueType, TodoListId: string) => void
    addTasks: (title: string, TodoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, TodoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, TodoListId: string) => void
    filter: FilterValueType
    removeTodoList: (TodoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void,
}



function TodoList(props: PropsType) {
    // сортировка заявки "все"
    const onAllClickHAndler = () => {
        props.changeFilter("all", props.id)
    }
    // сортировка заявки "активные"
    const onActiveHandler = () => {
        props.changeFilter("active", props.id)
    }

    // сортировка заявки "законченнные"
    const onComplitedHandler = () => {
        props.changeFilter("complited", props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle);
    }

    const addTask = (title: string) => {
        props.addTasks(title, props.id)
    }
    return (
        <div className="what">

            <h3> <EditableSpan title={props.title}
                onChange={changeTodoListTitle}

            />
                <button onClick={removeTodoList}> x </button></h3>
            <AddItemForm addItem={addTask}
            />
            <ul>
                {
                    props.tasks.map(t => {
                        // функция для удаления таски
                        const OnRemoveHendler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        //управление чекбоксами 
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        const onChangeTaskTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeStatusHandler}
                            />
                            <EditableSpan title={t.title}
                                onChange={onChangeTaskTitleHandler} />
                            <button onClick={OnRemoveHendler} >X</button>
                        </li>

                    })
                }

            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHAndler}>все задачи</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveHandler}>активные</button>
                <button className={props.filter === "complited" ? "active-filter" : ""} onClick={onComplitedHandler}>законченные</button>
            </div>
        </div>
    )

}
export default TodoList;
