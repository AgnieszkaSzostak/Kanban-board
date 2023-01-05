/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useReducer, useEffect } from 'react';
import Board from './Board';
import '../style.css';
import { ColumnsContext, TasksContext } from './context';
import Form from './Form';
import useStorage from './hook';
import { initialColumns, initialTasks } from './data';

function App () {
    
    const {Provider: ColumnProvider} = ColumnsContext;
    const {Provider: TasksProvider} = TasksContext;

    const reducer = (state, action) => {
        const newState = [...state]
        switch(action.type){
        case 'ADD_TASK':
            return[
                ...newState, 
                action.payload
            ]
        case 'MOVE_TASK':
            return [
                ...newState.filter(element => element.id !== action.payload.id),
                action.payload
            ];
        case 'DELETE_TASK':
            return [...newState.filter(element => element.id !== action.payload.id)]
        default: 
            return state    
        }
    }
    const [colState, colDispatch] = useReducer(reducer, initialColumns);
    const [taskState, taskDispatch] = useReducer(reducer, initialTasks);
    
    const[getColumns, setColumns] = useStorage('columns');
    const[getTasks, setTasks] = useStorage('tasks');

    useEffect(()=> {
        setColumns(colState);
    },[colState])

    useEffect(()=> {
        setTasks(taskState);
    },[taskState])
    
    return (
        <ColumnProvider  value={{colState, colDispatch}}>
            <TasksProvider value={{taskState, taskDispatch}}>
                <Board/>
                <Form/>
            </TasksProvider>
        </ColumnProvider>
    ) 
};

export default App
