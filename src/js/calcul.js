function createUpdate(matiere, examensList) {
    for (var i = 0; i < examensList.length; i++)
        createUpdateControle(matiere, examensList[i], examensList);
}

function createUpdateControle(matiere, controle, examensList) {
    var input = document.getElementById(matiere + '_' + controle);

    var td_5 = document.getElementById(matiere + '_' + controle + '_5');
    var td_10 = document.getElementById(matiere + '_' + controle + '_10');
    var td_15 = document.getElementById(matiere + '_' + controle + '_15');

    var refresh = function(event) {
        if (!isNaN(input.value) && input.value != "") {
            td_5.innerText = input.value;
            td_10.innerText = input.value;
            td_15.innerText = input.value;
        } else {
            td_5.innerText = '5';
            td_10.innerText = '10';
            td_15.innerText = '15';
        }
        updateMoyenne(matiere, examensList);
        if (ue && ueList)
            updateMoyenneUE();
    }
    input.addEventListener('keyup', refresh);
    refresh();
}

function updateMoyenne(matiere, examensList) {
    var td_moyenne = document.getElementById(matiere + '_moyenne');
    var td_moyenne_5 = document.getElementById(matiere + '_moyenne_5');
    var td_moyenne_10 = document.getElementById(matiere + '_moyenne_10');
    var td_moyenne_15 = document.getElementById(matiere + '_moyenne_15');

    td_moyenne.innerText = moyenne(matiere, '', examensList);
    td_moyenne_5.innerText = moyenne(matiere, '_5', examensList);
    td_moyenne_10.innerText = moyenne(matiere, '_10', examensList);
    td_moyenne_15.innerText = moyenne(matiere, '_15', examensList);
}

function updateMoyenneUE() {
    var td_moyenne_ue = document.getElementById(ue + '_moyenne');
    var td_moyenne_ue_5 = document.getElementById(ue + '_moyenne_5');
    var td_moyenne_ue_10 = document.getElementById(ue + '_moyenne_10');
    var td_moyenne_ue_15 = document.getElementById(ue + '_moyenne_15');
    td_moyenne_ue.innerText = moyenneUE('', ueList)
    td_moyenne_ue_5.innerText = moyenneUE('_5', ueList)
    td_moyenne_ue_10.innerText = moyenneUE('_10', ueList)
    td_moyenne_ue_15.innerText = moyenneUE('_15', ueList)
}

function moyenne(matiere, suffix, examensList) {
    var moyenne = 0;
    for (var i = 0; i < examensList.length; i++) {
        var current = document.getElementById(matiere + '_' + examensList[i] + suffix);
        var current_coef = document.getElementById(matiere + '_' + examensList[i] + '_coef');
        if (current && current_coef) {
            if (current.localName === 'input') {
                if (!isNaN(current.value) && !isNaN(current_coef.innerText))
                    moyenne = moyenne + (parseFloat(current.value) * parseFloat(current_coef.innerText));
            } else {
                if (!isNaN(current.innerText) && !isNaN(current_coef.innerText))
                    moyenne = moyenne + (parseFloat(current.innerText) * parseFloat(current_coef.innerText));
            }
        }
    }
    var result = moyenne.toFixed(2)
    if (isNaN(result))
        return 'X';
    else
        return result;
}

function moyenneUE(suffix, matieresList) {
    var moyenne = 0;
    var nb_notes = 0;
    for (var i = 0; i < matieresList.length; i++) {
        var current = document.getElementById(matieresList[i] + '_moyenne' + suffix);
        var current_coef = document.getElementById(matieresList[i] + '_moyenne_coef');
        if (current && current_coef) {
            if (!isNaN(current.innerText) && !isNaN(current_coef.innerText)) {
                moyenne = moyenne + (parseFloat(current.innerText) * parseFloat(current_coef.innerText));
                nb_notes = nb_notes + parseFloat(current_coef.innerText);
            }
        }
    }
    var result = (moyenne / nb_notes).toFixed(2);
    if (isNaN(result))
        return 'X';
    else
        return result;
}