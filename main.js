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
        
        const filter = document.createElement('select');
        filter.id = 'filterSelect';
        
        const options = [
            ['all', 'Toutes les tâches'],
            ['completed', 'Tâches terminées'],
            ['uncompleted', 'Tâches non terminées']
        ];
        
        options.forEach(([value, text]) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = text;
            filter.appendChild(option);
        });

        document.getElementById('buttonAdd').after(filter);

        filter.addEventListener('change', function() {
            const rows = document.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const checkbox = row.querySelector('input');
                if (this.value === 'all') {
                    row.style.display = '';
                } else if (this.value === 'completed') {
                    row.style.display = checkbox.checked ? '' : 'none';
                } else {
                    row.style.display = !checkbox.checked ? '' : 'none';
                }
            });
        });

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
        const thDelete = document.createElement('th'); // Nouvelle cellule pour le bouton

        thNumb.textContent = 'Numéro';
        thDone.textContent = 'Terminée';
        thLabel.textContent = 'Libellé';
        thDelete.textContent = 'Supprimer'; // Nouvelle cellule pour le bouton

        table.appendChild(trHead);
        trHead.appendChild(thNumb);
        trHead.appendChild(thDone);
        trHead.appendChild(thLabel);
        trHead.appendChild(thDelete); // Nouvelle cellule pour le bouton

    } else {
        console.log("table de base : ", table);

    };

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    const trTodo = document.createElement('tr');
    const tdNumb = document.createElement('td');
    const tdDone = document.createElement('td');
    const tdLabel = document.createElement('td');
    const tdDelete = document.createElement('td'); // Nouvelle cellule pour le bouton

    const inputDone = document.createElement('input');
    const deleteButton = document.createElement('button'); // Nouveau bouton
    deleteButton.textContent = '❌';
    deleteButton.onclick = function() {
        deleteTodo(this.closest('tr'));
    };

    tbody.appendChild(trTodo);
    trTodo.appendChild(tdNumb);
    trTodo.appendChild(tdDone);
    tdDone.appendChild(inputDone);
    trTodo.appendChild(tdLabel);
    trTodo.appendChild(tdDelete); // Ajout de la cellule du bouton
    tdDelete.appendChild(deleteButton); // Ajout du bouton dans sa cellule

    tdNumb.textContent = todoListe.length;
    inputDone.type = 'checkbox';
    inputDone.id = todoCompleted.length;
    inputDone.addEventListener('change', changeDone);
    tdLabel.textContent = newTache;

    console.log(todoCompleted);

};


function changeDone(event) {

    const checkbox = event.target;
    const idCheckbox = checkbox.id;

    todoCompleted[idCheckbox] = checkbox.checked;

    /* Meilleur maniere d'ajouter une ligne sur le texte si la checkbox est sur "true" :
    const tdLabel = checkbox.parentElement.nextElementSibling;
    if (checkbox.checked) {
        tdLabel.style.textDecoration = 'line-through';
    } else {
        tdLabel.style.textDecoration = 'none';
    }
    */

    
    const tousLesTD = document.getElementsByTagName('td');
    const identifiantCase = parseInt(idCheckbox) + 1;
    const texteBrut = tousLesTD[(identifiantCase-1) * 3 + 2].innerText;

    if (checkbox.checked) {
        tousLesTD[(identifiantCase-1) * 3 + 2].innerHTML = '<s>' + texteBrut + '</s>';
    } else {
        tousLesTD[(identifiantCase-1) * 3 + 2].innerHTML = texteBrut;
    }

    console.log("La checkbox ", checkbox.id, " est cochée : ", checkbox.checked);
    console.log(todoCompleted);

};

function filterTodo(filterType) {
    const rows = document.querySelectorAll('table tr:not(:first-child)');
    
    rows.forEach((row) => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        if (filterType === 'all') {
            row.style.display = '';
        } else if (filterType === 'completed') {
            row.style.display = checkbox.checked ? '' : 'none';
        } else if (filterType === 'uncompleted') {
            row.style.display = !checkbox.checked ? '' : 'none';
        }
    });
};

function deleteTodo(row) {
    if (!row) return; // Protection contre les valeurs null
    
    // Récupérer l'index de la ligne
    const index = Array.from(row.parentNode.children).indexOf(row);
    
    // Supprimer la tâche des tableaux
    todoListe.splice(index, 1);
    todoCompleted.splice(index, 1);
    
    // Supprimer la ligne du tableau HTML
    row.remove();
    
    // Mettre à jour les numéros des tâches restantes
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, idx) => {
        row.cells[0].textContent = idx + 1;
        row.querySelector('input[type="checkbox"]').id = idx;
    });
}

// Event listener pour ajouter une tache quand button click
document.getElementById('buttonAdd').addEventListener('click', addTodo);

//Event listener pour ajouter une tache quand touche entrée
document.getElementById('inputAdd').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

document.getElementById('filterSelect').addEventListener('change', function(e) {
    filterTodo(e.target.value);
});