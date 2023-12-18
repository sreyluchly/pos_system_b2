const containerForm = document.querySelector(".container-form");
const inputName = document.querySelector(".input-name");
const tbody = document.querySelector("tbody");

let arrayProduct = [];

function saveStorage() {
    localStorage.setItem("arrayProduct", JSON.stringify(arrayProduct));
}

function getStorage() {
    if (JSON.parse(localStorage.getItem("arrayProduct")) != null) {
        arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    }
}

function show(element) {
    element.style.display = "flex";
}
function hide(element) {
    element.style.display = "none";
}
function addRow() {
    for (const pro of arrayProduct) {
        let tRow = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdId = document.createElement('td');
        let action = document.createElement('td');
        let del = document.createElement('span');
        let edit = document.createElement('span');

        del.className = "material-symbols-outlined del";
        del.textContent = "delete";

        edit.className = "material-symbols-outlined edit";
        edit.textContent = "edit";

        tdId.textContent = pro.id;
        tdName.textContent = pro.category;

        action.appendChild(del);
        action.appendChild(edit);

        tRow.appendChild(tdId);
        tRow.appendChild(tdName);
        tRow.appendChild(action);

        tbody.appendChild(tRow)
    }
}


document.getElementById("addCate").onclick = () => {
    show(containerForm);
}
document.querySelector(".cancel").onclick = () => {
    hide(containerForm);
}
document.querySelector(".add").onclick = () => {
    addRow();
}

getStorage();
addRow();


