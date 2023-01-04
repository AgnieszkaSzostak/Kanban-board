/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {useContext} from "react";
import '../style.css';
import Card from "./Card";
import { TasksContext } from "./context";

function Column(props) {
    const {id, name, limit} = props.data;
    const {taskState} = useContext(TasksContext);
    const columnTasks = taskState.map(task => {
        if(task.idColumn === id){
            return <Card key={task.id} id={task.id} name={task.name} col={task.idColumn} user={task.user}/>
        }
        return null
    })
    return (
        <div id={id} className="column">
            <h1 className="column__title">{name}</h1>
            <p className="column__limit">{limit}</p>
            <ul className="column__list">
                {columnTasks}
            </ul>
        </div>
    )
}

export default Column