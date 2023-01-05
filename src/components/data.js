const initialColumns = [
    {id:1, name: 'Pending', limit: 5},
    {id:2, name: 'Analysis - doing', limit: 3},
    {id:3, name: 'Analysis - done', limit: 2},
    {id:4, name: 'Development - doing', limit: 3},
    {id:5, name: 'Development - done', limit: 2},
    {id:6, name: 'Test', limit: 2},
    {id:7, name: 'Deploy', limit: 5},
];

const initialTasks = [
    {id:1, name:'Task1', idColumn: 1, user: 'Ana'},
    {id:2, name:'Task2', idColumn: 1, user: 'Ana'},
    {id:3, name:'Task3', idColumn: 2, user: 'Ana'},
    {id:4, name:'Task4', idColumn: 3, user: 'Ana'},
    {id:5, name:'Task5', idColumn: 3, user: 'Ana'},
]

export {initialColumns, initialTasks}