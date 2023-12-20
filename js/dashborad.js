const tbody = document.querySelector('tbody');
let arrayProduct = [];
let productOrderd = [];
let categories = [];

function saveStorage() {
    localStorage.setItem("categories", JSON.stringify(categories))
}
function loadStorage() {
    if (JSON.parse(localStorage.getItem("arrayProduct")) != null) {
        arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    }
    categories = JSON.parse(localStorage.getItem("categories"));
    productOrderd = JSON.parse(localStorage.getItem("productOrderd"));
}

function showProduct() {
    let stock = 0;
    let soldOut = 0;
    let income = 0;
    for (const pro of arrayProduct) {
        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        const tdName = document.createElement('td');
        const tdCate = document.createElement('td');
        const tdPrice = document.createElement('td');
        const tdAmount = document.createElement('td');
        const tdProgress = document.createElement('td');
        const progress = document.createElement('span');

        progress.className = "material-symbols-outlined"

        tdId.textContent = pro.id;
        tdName.textContent = pro.name;
        tdCate.textContent = pro.category;
        tdPrice.textContent = `$ ${pro.price}`;

        tdAmount.textContent = (pro.price * 3).toFixed(2);
    
        tdProgress.appendChild(progress);
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdCate);
        tr.appendChild(tdPrice);
        tr.appendChild(tdAmount);
        tr.appendChild(tdProgress);
        tbody.appendChild(tr);
        if (pro.price * 2 > 10) {
            progress.textContent = "north";
            progress.style.color = "teal";
            progress.parentElement.parentElement.style.background = "#fff";
        }else {
            progress.textContent = "south";
            progress.style.color = "tomato"
            progress.parentElement.parentElement.style.background = "#fff5f5";
        }
        stock += parseInt(pro.quantity);
    }
    for (const pros of productOrderd) {
        for (const pro of pros.product) {
            soldOut += parseInt(pro.quantity);
            income += parseFloat(pro.price);
        }
    }
    document.getElementById("pro-stock").textContent = stock;
    document.getElementById("pro-cate").textContent = categories.length;
    document.getElementById("pro-sold").textContent = soldOut;
    document.getElementById("pro-icome").textContent = `${income}$`;
}

loadStorage();
showProduct();