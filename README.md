# TodoList
Backend node.js et express permettant de gérer une liste de tâches.

## js, node.js, express, nodemon, mysql
Pour lancer le server : nodemon app.js

## Postman
Pour tester notre backend, rendez-vous sur Postman aux requetes suivantes :  

GET  
http://localhost:8080/ Afficher toutes nos tâches  
http://localhost:8080/undone Afficher nos tâches non faites  

POST  
http://localhost:8080/ Ajouter une tâche  

PUT  
http://localhost:8080/done/id Marquer une tâche à faite  
http://localhost:8080/id Modifier une tâche existante  

DELETE  
http://localhost:8080/id Supprimer une tâche  

## Token
Sur d'autres projets, le token ne doit pas être partagé mais voici la marche à suivre pour chaque requête :   
-Aller sur Postman,  
-Dans la partie Headers ajouter la key "token" avec la valeur "monToken" contenu dans le fichier env.js(qui par sécurité ne doit normalement pas être envoyé).  
