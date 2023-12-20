const mainContainer = document.querySelector(".main-container");
const tbody = document.querySelector("tbody");
const formContainer = document.querySelector(".form-container");
const inputSubmit = document.querySelectorAll('form input');
const inputSearch = document.getElementById('search');
const allCate = document.getElementById("allCate");
let arrayProduct = [];
let proId;
let proCheckout = [];
let productOrderd = [];
let categories = [];

function saveStorage() {
    localStorage.setItem("arrayProduct", JSON.stringify(arrayProduct));
    localStorage.setItem("proCheckout", JSON.stringify(proCheckout));
    localStorage.setItem("productOrderd", JSON.stringify(productOrderd));
}
function loadStorage() {
    if (JSON.parse(localStorage.getItem("arrayProduct")) != null) {
        arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    }
    if (JSON.parse(localStorage.getItem("proCheckout")) != null) {
        proCheckout = JSON.parse(localStorage.getItem("proCheckout"));
    }
    if (JSON.parse(localStorage.getItem("productOrderd")) != null) {
        productOrderd = JSON.parse(localStorage.getItem("productOrderd"));
    }
    categories = JSON.parse(localStorage.getItem("categories"));
}

function show(element) {
    element.style.display = "flex";
}
function hide(element) {
    element.style.display = "none";
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
        card.onclick = (event) => {
            if (arrayProduct[i].quantity > 0) {
                checkout(event)
            }else {
                alert("Out of stock");
            }
        };
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
        category: arrayProduct[proId].category
    };
    arrayProduct[proId].quantity -= 1;
    for (const pro of proCheckout) {
      if (pro.name == product.name) {
        pro.quantity = parseInt(pro.quantity) + 1;
        displayProCheckout();
        saveStorage();
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
        tdPrice.textContent = `${proCheckout[i].price * proCheckout[i].quantity}$`;
        
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

document.getElementById("close").onclick = () => {
    hide(formContainer);
}
document.getElementById("submit").onclick = (event) => {
    event.preventDefault();
    for (const input of inputSubmit) {
        if (input.value == "") {
            return window.alert("Please Enter the field!")
        }
    }
    let userInfo = {
        id: productOrderd.length + 1,
        name: document.getElementById("f-name").value + " " + document.getElementById("l-name").value,
        email: document.getElementById("email").value,
        product: proCheckout
    };
    productOrderd.push(userInfo);
    proCheckout = [];
    console.log(productOrderd);
    saveStorage();
    displayProCheckout();
    hide(formContainer);
}
document.getElementById("checkout").onclick = () => {
    if (proCheckout.length == 0) {
        return window.alert("You didn't order any product!")
    }
    show(formContainer);
}

// Create filter options
function filter() {
    let all = document.createElement("option");
    all.value = "All";
    all.textContent = "All Category";
    allCate.appendChild(all);
    for (const cateName of categories) {
        let option = document.createElement("option");
        option.value = cateName;
        option.textContent = cateName
        allCate.appendChild(option);
    }
}

// Filter product
allCate.onclick = (event) => {
    arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    if (event.target.value != "All") {
        arrayProduct = arrayProduct.filter((product) => product.category == event.target.value);
    }
    showProduct();
}

// Search products
inputSearch.oninput = (event) => {
    arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    arrayProduct = arrayProduct.filter((product) => product.name.toLowerCase().includes(event.target.value.toLowerCase()));
    showProduct();
}
loadStorage();
saveStorage();
showProduct();
displayProCheckout();
filter();