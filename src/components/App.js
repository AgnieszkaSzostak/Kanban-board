/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useReducer, useEffect } from 'react';
import Board from './Board';
import '../style.css';
import { ColumnsContext, TasksContext } from './context';
import Form from './Form';
import useStorage from './hook';

function App () {
    const initialColumns = [
        {id:1, name: 'Pending', limit: 5},
        {id:2, name: 'Analysis - doing', limit: 3},
        {id:3, name: 'Analysis - done', limit: 2},
        {id:4, name: 'Development - doing', limit: 3},
        {id:5, name: 'Development - done', limit: 2},
        {id:6, name: 'Test', limit: 2},
        {id:7, name: 'Deploy', limit: 5},
    ];

    const {Provider: ColumnProvider} = ColumnsContext;
    const {Provider: TasksProvider} = TasksContext;

    const initialTasks = [
        {id:1, name:'Task1', idColumn: 1, user: 'Ana'},
        {id:2, name:'Task2', idColumn: 1, user: 'Ana'},
        {id:3, name:'Task3', idColumn: 2, user: 'Ana'},
        {id:4, name:'Task4', idColumn: 3, user: 'Ana'},
        {id:5, name:'Task5', idColumn: 3, user: 'Ana'},
    ]

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
