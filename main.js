// Tableau des tâches
let todoListe = [];

// Fonction pour ajouter une tâche
function addTodo() {

    const newTache = document.getElementById('input').value;
    if (newTache !== "") {
        todoListe.push(newTache);
        document.getElementById('input').value = "";
    }
    else {
        alert("Veuillez saisir une tache");
    }

}

// Event listener pour ajouter une tache quand button click
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