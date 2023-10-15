const express = require('express');
const bodyParser = require('body-parser').json();
const app = express();
const port = 8080;

// Appel du token
const token = require('./token');

// Partie connection à la BDD avec mysql
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: "projettodolist",
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Vous êtes connecté à la BDD !");
})

// Permet d'interpréter le body JSON de notre réponse HTTP
app.use(bodyParser);

// Variable de nos requêtes 
let sql = '';

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
app.get('/', token, (req, res) => {
    connection.query('SELECT * FROM tasks', (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    });
})

// Afficher uniquement les tâches non faites
app.get('/undone', token, (req, res) => {
    sql = 'SELECT * FROM tasks';

    connection.query(sql, (err, rows, fields) => {
        let tab = [];
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].isDone === 0) {
                tab.push(rows[i]);
            }
        }

        if (err) throw err;

        tab.length < 2 ? console.log(`Il vous reste ${tab.length} tâche à faire !`) : console.log(`Il vous reste ${tab.length} tâches à faire !`);
        
        return res.json(tab);
    });
})

// Ajouter une tâche
app.post('/', token, (req, res) => {
    sql = "INSERT INTO tasks(id, name, dueDate, isDone) VALUES(?,?,?,?)";
    let values = [req.body.id, req.body.name, req.body.dueDate, req.body.isDone];

    connection.query(sql, values, (err, rows, fields) => {
        let tab = [];
        if (err) throw err;
        tab.push(req.body);
        res.json(tab);
    });
})

// Marquer une tâche à faite
app.put('/done/:id', token, (req, res) => {
    sql = "UPDATE tasks SET id = ?, name = ?, dueDate = ?, isDone = ? WHERE id = ?";
    let values = [req.body.id, req.body.name, req.body.dueDate, req.body.isDone, req.params.id];

    connection.query(sql, values, (err, rows, fields) => {
        if (err) throw err;

        const task = listTask.find(todo => todo.id == req.params.id)
        if (task === undefined) {
            console.log(err);
        }

        task.isDone = true
        console.log(`Bravo, votre tâche ${task.name} est terminée !`);
        res.json(task);
    });
})

// Modifier une tâche existante
app.put('/:id', token, (req, res) => {
    sql = "UPDATE tasks SET id = ?, name = ?, dueDate = ?, isDone = ? WHERE id = ?";
    let values = [req.body.id, req.body.name, req.body.dueDate, req.body.isDone, req.params.id];

    connection.query(sql, values, (err, rows, fields) => {
        if (err) throw err;

        const task = listTask.find(todo => todo.id == req.params.id);

        if (task === undefined) {
            console.log(err);
        }

        task.name = req.body.name;
        task.dueDate = req.body.dueDate;
        task.isDone = req.body.isDone;
        console.log('Votre tâche a bien été modifiée !');
        res.json(task);
    })
})

// Supprimer une tâche
app.delete('/:id', token, (req, res) => {
    sql = "DELETE FROM tasks WHERE id = ?";
    let values = [req.params.id];

    connection.query(sql, values, (err, rows, fields) => {
        if (err) throw err;

        const taskIndex = listTask.findIndex(t => t.id == req.params.id);
        listTask.splice(taskIndex, 1);

        console.log('Votre tâche a bien été supprimée !');
        res.json(listTask);
    })
})

// Port que l'on veut écouter
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})