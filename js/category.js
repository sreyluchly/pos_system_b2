const tbody = document.querySelector("tbody");
let arrayProduct = [];
let categories = []
function loadStorage() {
    arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    arrayProduct.forEach(product => {
        categories.push(product.category)
    });
    categories = [...new Set(categories)]
}

function showCategory() {
    for (const tr of document.querySelectorAll('tbody tr')) {
        tr.remove()
    }
    
    for (let i=0; i<categories.length; i++) {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdCate = document.createElement("td");
        const tdAction = document.createElement("td");

        tdId.textContent = i + 1    
        tdCate.textContent = categories[i]
        tbody.appendChild(tr);
        tr.appendChild(tdId);
        tr.appendChild(tdCate);
        tr.appendChild(tdAction);
    }
}


loadStorage()
showCategory();