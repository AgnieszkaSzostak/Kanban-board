/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ColumnsContext, TasksContext } from "./context";
import validateForm from "./validator";
import '../form.css';

function Form (){
    const {colState} = useContext(ColumnsContext)
    const {taskState, taskDispatch} = useContext(TasksContext);
    const isColumnFull = (limit, id) => {
        const tasksInColumn = taskState.filter(task => task.idColumn === id)
        if(limit === tasksInColumn.length){
            return true
        }
        return false
    }
    const selectOptions = colState.map(col => <option key={col.id} value={col.id} disabled={isColumnFull(col.limit, col.id)}>{col.name}</option>)
    const formRef = React.createRef();
    const [form, setForm] = useState(null);
    const [errors, setErrors] = useState(0);
    useEffect(() => {
        if(errors === null){
            const {taskName, projectStage, user} = formRef.current.elements
            setForm({
                name: taskName.value,
                user: user.value,
                idColumn: Number(projectStage.value)
            })
        }
    },[errors]);

    useEffect(() => {
        if(form !== null){
            taskDispatch({
                type: 'ADD_TASK',
                payload: {
                    ...form,
                    id: uuidv4(),
                }
            });
            formRef.current.reset();
        }
    },[form])

    return (
        <form className="form" ref={formRef}  onSubmit={(e) =>setErrors(validateForm(e, formRef.current))}>
            <label className="form__label" htmlFor="taskName"> Task name
                <input className="form__input" type="text" name="taskName"/>
                {errors !==null && errors.taskName ? <span className="form__error" >{errors.taskName}</span> : null}
            </label>
            <label className="form__label" htmlFor="projectStage"> Project stage
                <select className="form__select" name="projectStage" type="select">
                    <option value=''>Select stage</option>
                    {selectOptions}
                </select>
                {errors !==null && errors.projectStage ? <span className="form__error">{errors.projectStage}</span> : null}
            </label>
            <label className="form__label" htmlFor="user"> User 
                <input className="form__input" type="text" name="user"/>
                {errors !==null  && errors.user ? <span className="form__error">{errors.user}</span> : null}
            </label>
            <input className="form__input--submit" type="submit"/>
        </form>
    )
}
export default Form