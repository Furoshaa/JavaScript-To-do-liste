// Tableau des tâches
let todoListe = [];

// Fonction pour ajouter une tâche
function addTodo() {

    const newTache = document.getElementById('inputAdd').value;
    if (newTache !== "") {
        todoListe.push(newTache);
        addTodoToTable(newTache);
    }
    else {
        alert("Veuillez saisir une tache");
    }

}

// Fonction pour ajouter la tache au tableau HTML
function addTodoToTable(newTache) {

    let table = document.querySelector('table');

    if (!table) {
        //Creation du tableau HTML
        table = document.createElement('table');
        document.body.appendChild(table);

        //Creation de la caption du tableau
        const caption = document.createElement('caption');
        caption.textContent = 'Liste des tâches';
        table.appendChild(caption);

        // Ajout des taches dans le tableau
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const th2 = document.createElement('th');

        th.textContent = 'Numéro';
        th2.textContent = 'Libellé';

        th.style.width = '10px';

        table.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(th2);

    } else {
        console.log("table de base : ", table);
    };

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    const tr2 = document.createElement('tr');
    const td = document.createElement('td');
    const td2 = document.createElement('td');
    tbody.appendChild(tr2);
    tr2.appendChild(td);
    tr2.appendChild(td2);

    td.textContent = todoListe.length;

    td2.textContent = newTache;

};

// Event listener pour ajouter une tache quand button click
document.getElementById('buttonAdd').addEventListener('click', addTodo);
