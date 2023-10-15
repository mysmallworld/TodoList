const express = require('express');
const bodyParser = require('body-parser').json();
const app = express();
const mysql = require('mysql2');
const connexion = require('express-myconnection');
const port = 8080;

const bdd = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: "projettodolist",
};

app.use(connexion(mysql, bdd, 'pool'));

app.use(bodyParser);

// Variable globale pour notre liste de tâches
let listTask = [
    {
        id: 1,
        name: "task1",
        dueDate: "16/10/2023",
        isDone: true
    },
    {
        id: 2,
        name: "task2",
        dueDate: "20/10/2023",
        isDone: false
    },
    {
        id: 3,
        name: "task3",
        dueDate: "04/11/2023",
        isDone: true
    },
    {
        id: 4,
        name: "task4",
        dueDate: "11/11/2023",
        isDone: false
    }
];

// Afficher toutes les tâches
app.get('/', (req, res) => {
    res.json(listTask);
})

// Afficher uniquement les tâches non faites
app.get('/undone', (req, res) => {
    let tab = [];
    for (let i = 0; i < listTask.length; i++) {
        if (listTask[i].isDone === false) {
            tab.push(listTask[i]);
        }
    }
    console.log(`Il vous reste ${tab.length} tâches à terminer !`);
    return res.json(tab);
})

// Ajouter une tâche
app.post('/edit', (req, res) => {
    listTask.push(req.body);
    res.json(listTask);
})

// Marquer une tâche à done
app.put('/done/:id', (req, res) => {
    const task = listTask.find(todo => todo.id == req.params.id)
    if (task === undefined) {
        console.log(err);
    }
    task.isDone = true
    console.log(`Bravo, votre tâche ${task.name} est terminée !`);
    res.json(task);
})

// Modifier une tâche existante
app.put('/:id', (req, res) => {
    const task = listTask.find(todo => todo.id == req.params.id)
    if (task === undefined) {
        console.log(err);
    }
    task.name = req.body.name;
    task.dueDate = req.body.dueDate;
    task.isDone = req.body.isDone;
    console.log(`Votre tâche a bien été modifiée !`);
    res.json(task);
})

// Supprimer une tâche
app.delete('/:id', (req, res) => {
    const taskIndex = listTask.findIndex(t => t.id == req.params.id);
    listTask.splice(taskIndex, 1);
    console.log(`Votre tâche a bien été supprimée !`);
    return res.json(listTask);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})