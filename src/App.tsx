import React, {useState} from 'react';
import './App.css';
import {ArrayTasksTypes, Todolist} from "./Todolist";
import {v1} from "uuid";

function App() {
    let [tasks, setTasks] = useState<Array<ArrayTasksTypes>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'TS', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const removeTask = (id: string) => {
        //иммутабельная работа
        const nextState = (tasks.filter(t => t.id !== id))
        setTasks(nextState)
        //засетали новый массив tasks который прошёл после фильтра
    }
    const addTask = (title:string) => {
        const newTask: ArrayTasksTypes = {
            id: v1(),
            title: title,
            isDone: false,
        }
        //иммутабельная работа
       const copyState = [...tasks]
        copyState.push(newTask)
        setTasks(copyState)
    //    setTasks([...tasks, newTask]) краткая форма записи 29-31
    }
    // function addTask(title: string) {
    //     let newTask = {
    //         id: v1(),
    //         title: title,
    //         isDone: false
    //     };
    //     let newTasks = [newTask, ...tasks];
    //     setTasks(newTasks);
    // }
    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
                // changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
