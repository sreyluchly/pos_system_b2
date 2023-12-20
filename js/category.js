const tbody = document.querySelector("tbody");
const formContainer = document.getElementById("form");
let arrayProduct = [];
let categories = ["Khmer", "American", "Italian", "Japanese"];


function saveStorage() {
    localStorage.setItem("categories", JSON.stringify(categories))
}
function loadStorage() {
    if (JSON.parse(localStorage.getItem("categories")) != null) {
        categories = JSON.parse(localStorage.getItem("categories"));
    }
}

//show category
function showCategory() {
    for (const tr of document.querySelectorAll('tbody tr')) {
        tr.remove()
    }
    
    for (let i=0; i<categories.length; i++) {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdCate = document.createElement("td");
        const tdAction = document.createElement("td");
        const del = document.createElement("span");
        const edit = document.createElement("span");

        del.className = "material-symbols-outlined del";
        edit.className = "material-symbols-outlined edit";
        
        del.dataset.id = i;
        edit.dataset.id = i;

        del.textContent = "delete";
        edit.textContent = "edit";

        tdId.textContent = (i+1 < 10) ? `0${i + 1}` : i + 1
        tdCate.textContent = categories[i];

        tdAction.appendChild(del);
        tdAction.appendChild(edit);
        tr.appendChild(tdId);
        tr.appendChild(tdCate);
        tr.appendChild(tdAction);
        tbody.appendChild(tr);

        // delete category
        del.onclick = (event) => {
            if (window.confirm("Are you sure you want to delete this Category?")) {
                let id = event.target.dataset.id;
                categories.splice(id, 1);
                saveStorage();
                showCategory();
            }
        }
    
        // edit category
        edit.onclick = (event) => {
            let id = event.target.dataset.id
            formContainer.style.display = "flex";
            document.getElementById("addCategory").setAttribute("onclick", `editCate(${id})`)
        }
    }
}

function addCate() {
    formContainer.style.display = "flex";
}

// Close form
document.getElementById("close").onclick = () => {
    formContainer.style.display = "none"
}

function editCate(id) {
    if ((document.getElementById("catename").value != "")) {
        categories[id] = document.getElementById("catename").value;
        saveStorage();
        showCategory();
        formContainer.style.display = "none";
    }else {
        alert('Please enter a valid category name!')
    }
}

function createCate() {
    if (document.getElementById("catename").value != "") {
        categories.push(document.getElementById("catename").value)
        console.log(categories);
        saveStorage();
        showCategory();
        formContainer.style.display = "none"
    }else {
        alert("Please enter category name!")
    }
}

loadStorage()
showCategory();