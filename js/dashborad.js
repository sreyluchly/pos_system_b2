const tbody = document.querySelector('tbody');
let arrayProduct = [];
let productOrderd = [];

function loadStorage() {
    if (JSON.parse(localStorage.getItem("arrayProduct")) != null) {
        arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    }
}

function displayTable() {
    let total = 0;
    for (const tr of document.querySelectorAll("tbody tr")) {
        tr.remove();
    }
    for (const pro of arrayProduct) {
        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        const tdNameproduct = document.createElement('td');
        const tdCategory = document.createElement('td');
        const tdQty = document.createElement("td");
        const tdPrice = document.createElement("td");





        tdId.textContent= pro.id;
        tdNameproduct.textContent = pro.name;
        tdCategory.textContent= pro.category;
        tdQty.textContent=pro.quantity;
        tdPrice.textContent = pro.price +"$";

        


        tr.appendChild(tdId);
        tr.appendChild(tdNameproduct);
        tr.appendChild(tdCategory);
        tr.appendChild(tdQty);
        tr.appendChild(tdPrice);
        tbody.appendChild(tr);

        total += parseInt(pro.quantity);


    }
    document.getElementById("allQty").textContent = total;
}


loadStorage();
displayTable();
