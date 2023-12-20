const tbody = document.querySelector('tbody');
let productOrderd = [];

function loadStorage() {
    if (JSON.parse(localStorage.getItem("productOrderd")) != null) {
        productOrderd = JSON.parse(localStorage.getItem("productOrderd"));
    }
}

function displayCustomer() {
    let totalCost = 0;
    let totalQty = 0;
    for (const tr of document.querySelectorAll("tbody tr")) {
        tr.remove();
    }
    for (const products of productOrderd) {
        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        const tdName = document.createElement('td');
        const tdEmail = document.createElement('td');
        const tdQty = document.createElement('td');
        const tdCost = document.createElement('td');
        if (products.id < 10) {
            tdId.textContent = `0${products.id}`;
        }else {
            tdId.textContent = products.id;
        }

        tdName.textContent = products.name;
        tdEmail.textContent = products.email;

        for (const pro of products.product) {
            totalCost += parseInt(pro.price);
            totalQty += parseInt(pro.quantity);
        }
        tdCost.textContent = totalCost * totalQty +"$";
        tdQty.textContent = totalQty

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdQty);
        tr.appendChild(tdCost);
        tbody.appendChild(tr);
    }
}

loadStorage();
displayCustomer();