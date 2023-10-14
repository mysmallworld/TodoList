const express = require('express');
const bodyParser = require('body-parser').json();
const app = express();
const port = 8080;

app.use(bodyParser);

let listTask = [
    {
        name: "task1",
        dueDate: "16/10/2023",
        isDone: true
    },
    {
        name: "task2",
        dueDate: "20/10/2023",
        isDone: true
    },
    {
        name: "task3",
        dueDate: "04/11/2023",
        isDone: false
    },
    {
        name: "task4",
        dueDate: "11/11/2023",
        isDone: false
    }
];

app.get('/', (req, res)=>{
    res.json(listTask)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})