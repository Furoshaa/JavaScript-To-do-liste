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
        //Creation du champ filtre
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
        const thDelete = document.createElement('th');

        // Ajout des titres dans le tableau
        thNumb.textContent = 'Numéro';
        thDone.textContent = 'Terminée';
        thLabel.textContent = 'Libellé';
        thDelete.textContent = 'Supprimer';

        // Ajout des elements dans l'html
        table.appendChild(trHead);
        trHead.appendChild(thNumb);
        trHead.appendChild(thDone);
        trHead.appendChild(thLabel);
        trHead.appendChild(thDelete);

    } else {
        //Affiche le tebleau deja existantn dans la console
        console.log("table de base : ", table);
    };

    //Creation d'une nouvelle todo
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    const trTodo = document.createElement('tr');
    const tdNumb = document.createElement('td');
    const tdDone = document.createElement('td');
    const tdLabel = document.createElement('td');
    const tdDelete = document.createElement('td');

    const inputDone = document.createElement('input');

    // Ajout du bouton deleteTodo
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.onclick = function() {
        deleteTodo(this.closest('tr'));
    };

    tbody.appendChild(trTodo);
    trTodo.appendChild(tdNumb);
    trTodo.appendChild(tdDone);
    tdDone.appendChild(inputDone);
    trTodo.appendChild(tdLabel);
    trTodo.appendChild(tdDelete);
    tdDelete.appendChild(deleteButton);

    tdNumb.textContent = todoListe.length;

    //Ajout de la checkbox
    inputDone.type = 'checkbox';
    inputDone.id = todoCompleted.length;
    inputDone.addEventListener('change', changeDone);

    // Ajout de l'event listener sur le tdDone pour cocher la checkbox
    tdDone.addEventListener('click', function(e) {
        // Prevent multiple triggers if checkbox itself is clicked
        if (e.target !== inputDone) {
            inputDone.click();
        }
    });

    tdLabel.textContent = newTache;

    console.log(todoCompleted);

};

// Fonction pour changer le statut de la tache
function changeDone(event) {

    const checkbox = event.target;
    const idCheckbox = checkbox.id;

    todoCompleted[idCheckbox] = checkbox.checked;

    //line-through si checkbox checked
    const tdLabel = checkbox.parentElement.nextElementSibling;
    if (checkbox.checked) {
        tdLabel.style.textDecoration = 'line-through';
    } else {
        tdLabel.style.textDecoration = 'none';
    }
    

    /* Methode du prof
    const tousLesTD = document.getElementsByTagName('td');
    const identifiantCase = parseInt(idCheckbox) + 1;
    const texteBrut = tousLesTD[(identifiantCase-1) * 3 + 2].innerText;

    if (checkbox.checked) {
        tousLesTD[(identifiantCase-1) * 3 + 2].innerHTML = '<s>' + texteBrut + '</s>';
    } else {
        tousLesTD[(identifiantCase-1) * 3 + 2].innerHTML = texteBrut;
    }

    */
    console.log("La checkbox ", checkbox.id, " est cochée : ", checkbox.checked);
    console.log(todoCompleted);
    

};

// Fonction pour supprimer une tache
function deleteTodo(row) {
    if (!row) return;
    
    const index = Array.from(row.parentNode.children).indexOf(row);

    todoListe.splice(index, 1);
    todoCompleted.splice(index, 1);
    
    row.remove();
    
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, idx) => {
        row.cells[0].textContent = idx + 1;
        row.querySelector('input[type="checkbox"]').id = idx;
    });
};

// Fonction de filtrage
function filterTodo(value) {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const checkbox = row.querySelector('input');
        if (value === 'all') {
            row.style.display = '';
        } else if (value === 'completed') {
            row.style.display = checkbox.checked ? '' : 'none';
        } else {
            row.style.display = !checkbox.checked ? '' : 'none';
        }
    });
};

// Event listeners
document.getElementById('buttonAdd').addEventListener('click', addTodo);

document.getElementById('inputAdd').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Event listener pour le filtre
document.addEventListener('change', function(e) {
    if (e.target && e.target.id === 'filterSelect') {
        filterTodo(e.target.value);
    }
});
