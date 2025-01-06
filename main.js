// Tableau des tâches
let todo = [];

// Fonction pour ajouter une tâche
function addTodo(buttonAdd) {

};

// Event listener pour ajouter une tâche quand button click
document.getElementById('buttonAdd').addEventListener('click', addTodo);

// Création du tableau
const table = document.createElement('table');
const tr = document.createElement('tr');
const td = document.createElement('td');

// Appliquer la largeur à la cellule
table.style.border = '1px solid black';
td.style.width = '10px';

// Ajouter les elements les uns aux autres
tr.appendChild(td);
table.appendChild(tr);
document.body.appendChild(table);