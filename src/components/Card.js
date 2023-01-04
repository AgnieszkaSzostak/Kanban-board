/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, {useContext} from "react";
import { ColumnsContext, TasksContext } from "./context";
import '../card.css';

function Card (props){
    const{id, name, col, user} = props
    const {taskState, taskDispatch} = useContext(TasksContext);
    const {colState} = useContext(ColumnsContext);
    
    const moveTask = (value) => {
        const newColumn = colState.find(element=> element.id === col + (value))
        if(newColumn){
            const tasksInColumn = taskState.filter(element => element.idColumn === newColumn.id)
            if(tasksInColumn.length < newColumn.limit){
                taskDispatch({
                    type: 'MOVE_TASK',
                    payload: {id, name, idColumn: col + (value), user}
                })
            }   
        }
    }
    const deleteTask = () => {
        taskDispatch({
            type: 'DELETE_TASK',
            payload: {id}
        })
    }
    return(
        <li id={id} className="card">
            <h1 className="card__title">{name}</h1>
            <p className="card__user">{user}</p>
            <div className="buttons">
                <button className="card__button card__button--left" type="button" onClick={()=> moveTask(-1)}/>
                <button className="card__button card__button--delete" type="button" onClick={()=>deleteTask()}/>
                <button className="card__button card__button--right" type="button" onClick={()=>moveTask(1)}/>
            </div>
        </li>
    )
}
export default Card