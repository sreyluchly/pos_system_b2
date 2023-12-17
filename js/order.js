const mainContainer = document.querySelector(".main-container");
const tbody = document.querySelector("tbody");
let arrayProduct;
let proId;
let proCheckout = [];

function saveStorage() {
    localStorage.setItem("arrayProduct", JSON.stringify(arrayProduct));
    localStorage.setItem("proCheckout", JSON.stringify(proCheckout));
}
function loadStorage() {
    if (JSON.parse(localStorage.getItem("arrayProduct")) != null) {
        arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
        proCheckout = JSON.parse(localStorage.getItem("proCheckout"));
    }
}

function showProduct() {
    for (const card of document.querySelectorAll(".card")) {
        card.remove();
    }
    for (let i = 0; i < arrayProduct.length; i++) {
        const card = document.createElement("div");
        const cardHeader = document.createElement("div");
        const cardFooter = document.createElement("div");
        const img = document.createElement("img");
        const foodName = document.createElement("h4");
        const price = document.createElement("h2");

        card.className = "card";
        card.dataset.index = i;
        cardHeader.className = "card-header";
        cardFooter.className = "card-footer";
        foodName.className = "product-name";

        img.src = `${arrayProduct[i].img}`;
        foodName.textContent = arrayProduct[i].name;
        price.textContent = arrayProduct[i].price + "$";

        cardHeader.appendChild(img);
        cardFooter.appendChild(foodName);
        cardFooter.appendChild(price);

        card.appendChild(cardHeader);
        card.appendChild(cardFooter);

        mainContainer.appendChild(card);
        card.addEventListener("click", checkout);
    }   
}

function checkout(event) {
    // event.preventDefault();
    proId = event.target.closest(".card").dataset.index;
    let product = {
        id: proId,
        name: arrayProduct[proId].name,
        quantity: 1,
        price: arrayProduct[proId].price,
    };
    arrayProduct[proId].quantity -= 1;
    for (const pro of proCheckout) {
      if (pro.name == product.name) {
        pro.quantity = parseInt(pro.quantity) + 1;
        saveStorage();
        displayProCheckout();
        return;
      }
    }
    proCheckout.push(product);
    saveStorage();
    displayProCheckout();
}

function displayProCheckout() {
    let total = 0;
    for (const tr of document.querySelectorAll("tbody tr")) {
        tr.remove();
    }
    for (let i = 0; i < proCheckout.length; i++) {
        let tr = document.createElement("tr");
        let tdName = document.createElement("td");
        let tdQty = document.createElement("td");
        let tdPrice = document.createElement("td");
        let tdAction = document.createElement("td");
        let removeOrder = document.createElement("span");
        let qty = document.createElement("input");
        
        removeOrder.className = "material-symbols-outlined remove";
        removeOrder.textContent = "close";
        removeOrder.dataset.id = proCheckout[i].id;
        
        qty.setAttribute("type", "number");
        qty.setAttribute("min", "1");
        qty.value = proCheckout[i].quantity;
        qty.dataset.id = proCheckout[i].id;
        
        
        tdName.textContent = proCheckout[i].name;
        tdPrice.textContent = `${proCheckout[i].price}$`;
        
        total += proCheckout[i].price * proCheckout[i].quantity;
        
        tdQty.appendChild(qty);
        tdAction.appendChild(removeOrder);
        tr.appendChild(tdName);
        tr.appendChild(tdQty);
        tr.appendChild(tdPrice);
        tr.appendChild(tdAction);
        tbody.appendChild(tr);
        
        
        // Remove product checkout
        removeOrder.onclick = (event) => {
            arrayProduct[event.target.dataset.id].quantity += parseInt(proCheckout[i].quantity);
            proCheckout.splice(i, 1);
            saveStorage();
            displayProCheckout();
        };
        // Change quantity of product checkoout
        qty.onchange = (event) => {
            arrayProduct[proCheckout[i].id].quantity += proCheckout[i].quantity - event.target.value;
            proCheckout[i].quantity = event.target.value;
            saveStorage();
            displayProCheckout();
        };
    }
    document.getElementById('subTotal').textContent = total.toFixed(2) +"$";
    document.getElementById('total').textContent = Math.round(total).toFixed(2) +"$";
}
loadStorage();
showProduct();
displayProCheckout();
