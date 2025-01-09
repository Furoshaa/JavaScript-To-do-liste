// Tableau des tâches
let todoListe = [];
let todoCompleted = [];


// Fonction pour ajouter une tâche
function addTodo() {

    const newTache = document.getElementById('inputAdd').value;
    if (newTache !== "") {
        todoListe.push(newTache);
        addTodoToTable(newTache);
        todoCompleted.push(false);
        document.getElementById('inputAdd').value = "";
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
        const trHead = document.createElement('tr');
        const thNumb = document.createElement('th');
        const thDone = document.createElement('th');
        const thLabel = document.createElement('th');

        thNumb.textContent = 'Numéro';
        thDone.textContent = 'Terminée';
        thLabel.textContent = 'Libellé';

        table.appendChild(trHead);
        trHead.appendChild(thNumb);
        trHead.appendChild(thDone);
        trHead.appendChild(thLabel);

    } else {
        console.log("table de base : ", table);

    };

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    const trTodo = document.createElement('tr');
    const tdNumb = document.createElement('td');
    const tdDone = document.createElement('td');
    const tdLabel = document.createElement('td');

    const inputDone = document.createElement('input');

    tbody.appendChild(trTodo);
    trTodo.appendChild(tdNumb);
    trTodo.appendChild(tdDone);
    tdDone.appendChild(inputDone);
    trTodo.appendChild(tdLabel);

    tdNumb.textContent = todoListe.length;
    inputDone.type = 'checkbox';
    inputDone.id = todoCompleted.length;
    tdLabel.textContent = newTache;

    console.log(todoCompleted);

};


function changeDone() {

    

};


// Event listener pour ajouter une tache quand button click
document.getElementById('buttonAdd').addEventListener('click', addTodo);

//Event listener pour ajouter une tache quand touche entrée
document.getElementById('inputAdd').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

var checkbox = document.getElementsByTagName('input').type == 'checkbox'
checkbox.addEventListener('change', changeDone);