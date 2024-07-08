import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import s from './Todolist.module.css'

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus:(taskId: string, isDone: boolean)=>void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask,changeTaskStatus}: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string| null>(null)
    const [filter, setFilter] = useState("all")

    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError("Title is required")
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
        setFilter(filter)
    }

    const changeTaskStatusHandler = (taskId: string, isDone:boolean) =>  {
        changeTaskStatus(taskId,isDone)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error? s.error: ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
            </div>
            {error && <div className={s.errorMessage}>{error}</div>}
            {/*//    условный рендеринг (если ошибка есть то пиши <div className={s.errorMessage}>Title is required</div>}*/}
            {/*    //    если нет то ничего не пиши)*/}
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id)
                            }
                            // const changeTaskStatusHandler = (event:ChangeEvent<HTMLInputElement>) => {
                            //     changeTaskStatus(task.id,event.currentTarget.checked)
                            // }

                            return <li key={task.id} className={task.isDone? s.isDone : ""}>
                                <input type="checkbox" checked={task.isDone} onChange={(event) => changeTaskStatusHandler(task.id, event.currentTarget.checked)}
                                />
                                <span>{task.title}</span>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button className = {filter === "all" ? s.activeFilter: ""} title={'All'} onClick={() => changeFilterTasksHandler('all')}/>
                <Button className = {filter === "active"? s.activeFilter: ""} title={'Active'} onClick={() => changeFilterTasksHandler('active')}/>
                <Button className = {filter === "completed"? s.activeFilter: ""} title={'Completed'} onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}
