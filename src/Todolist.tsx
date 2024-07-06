import React, {useRef, useState} from 'react';
import {Button} from "./Button";

export type TodolistPropsType = {
    title: string,
    tasks: ArrayTasksTypes[],
    removeTask: (id: string) => void,
    changeFilter?: (filterValue: FilterValueType) => void,
    addTask: (title: string) => void,
}
export type ArrayTasksTypes = {
    id: string,
    title: string,
    isDone: boolean,

}
export type FilterValueType = "All" | "Active" | "Completed"


export const Todolist = ({title, tasks, removeTask, addTask}: TodolistPropsType) => {
    const taskInputRef = useRef<HTMLInputElement>(null)

    let [valueFilter, setValueFilter] = useState<FilterValueType>("All")

    const changeFilter = (filterValue: FilterValueType) => {
        setValueFilter(filterValue)
    }
    const filteredFoo = () => {
        let filteredTasks: ArrayTasksTypes[] = tasks
        switch (valueFilter) {
            case "Active": {
                filteredTasks = tasks.filter(el => !el.isDone)
                break
            }
            case "Completed": {
                filteredTasks = tasks.filter(el => el.isDone)
                break
            }
            case "All":
            default:
                filteredTasks = tasks
                break
        }
        // let filteredTasks = tasks
        // if (valueFilter === "Active") {
        //     filteredTasks = tasks.filter(el => !el.isDone)
        // }
        // if (valueFilter === "Completed") {
        //     filteredTasks = tasks.filter(el => el.isDone)
        // }
        // return (
        //     filteredTasks
        // ) через if statement
        return (
            filteredTasks
        )
    }
    const filteredTasksForMap = filteredFoo()
    const addTaskHandler = () => {
        if (taskInputRef.current) {
            if (taskInputRef.current.value.length < 15) {
                addTask(taskInputRef.current.value)

            }
            taskInputRef.current.value = ""
        }
    }

    //мозги, логика, данные
    return (
        //отрисовка
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={taskInputRef}/>
                {/*Позволяет привязать элмент к ссылке для input*/}
                <Button title="+" onClickHandler={addTaskHandler}/>
            </div>
            {
                tasks.length === 0 ? <p>Тасок нет</p> :
                    <ul>
                        {filteredTasksForMap.map((tasks) => {
                            return (
                                <li key={tasks.id}>
                                    <Button title="x" onClickHandler={() => removeTask(tasks.id)}/>
                                    <input type="checkbox" checked={tasks.isDone}/>
                                    <span>{tasks.title}</span>
                                </li>
                            )
                        })}
                    </ul>
            }
            <div>
                <Button title={"All"} onClickHandler={() => {
                    changeFilter("All")
                }}/>
                <Button title={"Active"} onClickHandler={() => {
                    changeFilter("Active")
                }}/>
                <Button title={"Completed"} onClickHandler={() => {
                    changeFilter("Completed")
                }}/>
            </div>
        </div>
    )
}
