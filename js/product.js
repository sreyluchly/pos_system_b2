const mainContainer = document.querySelector(".main-container");
const tbody = document.querySelector('tbody');
const main = document.querySelector('main');
const aside = document.querySelector('aside');
const formAdd = document.querySelector('.form-container');
const imgDetail = document.getElementById("imgDetail");
const allCate = document.getElementById('allCate');
const add = document.getElementById("add");
const inputSearch = document.getElementById('search');
const inputsInForm = document.querySelectorAll('form input');
const cate = document.getElementById("cate");

let proId;

let arrayProduct = [
    {id: 1, img: "../IMG/image1.jpg", name: "Ash", quantity: 10, price: 10, category: "American"},
    {id: 2, img: "../IMG/image2.jpg", name: "Spaghetti", quantity: 15, price: 10, category: "Italian"},
    {id: 3, img: "../IMG/image3.jpg", name: "Raman Noodles", quantity: 20, price: 5, category: "Japanese"},
    {id: 4, img: "../IMG/image4.jpg", name: "Sushi", quantity: 5, price: 100, category: "Japanese"},
    {id: 5, img: "../IMG/image6.jpg", name: "Samon Fried", quantity: 15, price: 15, category: "American"},
    {id: 6, img: "../IMG/image9.jpg", name: "Khmer Noodles", quantity: 100, price: 5, category: "Khmer"}
];

let categories = [];

let arrayDetail = [];
// Show and hide Elements
function hide(element) {
    element.style.display = "none";
}
function show(element) {
    element.style.display = "flex";
}

function saveStorage() {
    localStorage.setItem("arrayProduct", JSON.stringify(arrayProduct));
}

function loadStorage() {
    if (JSON.parse(localStorage.getItem("arrayProduct")) != null) {
        arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
        categories = JSON.parse(localStorage.getItem("categories"))
    }
}

function addNewProduct() {
    arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    let newProduct = {
        id : arrayProduct[arrayProduct.length - 1].id + 1 ,
        img: `${document.getElementById('urlPro').value}`,
        name: `${document.getElementById("namePro").value}`,
        quantity: `${document.getElementById("qtyPro").value}`,
        price: `${document.getElementById("pricePro").value}`,
        category: `${document.getElementById("cate").value}`
    }
    arrayProduct.push(newProduct);
    saveStorage();
    showProduct();
    hide(formAdd);
}
function deletPro(index) {
    arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    arrayProduct.splice(index, 1);
    saveStorage();
    showProduct();
}

// Edit product
function editProduct() {
    arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    arrayProduct[proId].img = document.getElementById("urlPro").value;
    arrayProduct[proId].name = document.getElementById("namePro").value;
    arrayProduct[proId].price = document.getElementById("pricePro").value;
    arrayProduct[proId].quantity = document.getElementById("qtyPro").value;
    arrayProduct[proId].category = document.getElementById("cate").value;
    saveStorage();
    showProduct();
    productDetail();
    hide(formAdd);
}

function productDetail(event = 0) {
    if (event == 0) {
        proId = 0;
    }else {
        proId = event.target.parentElement.parentElement.dataset.index;
    }
    imgDetail.src = arrayProduct[proId].img;
    document.getElementById("proName").textContent = ":  " + arrayProduct[proId].name;
    document.getElementById("proCate").textContent = ":  " + arrayProduct[proId].category;
    document.getElementById("proQty").textContent = ":  " + arrayProduct[proId].quantity;
    document.getElementById("proPrice").textContent = ":  " + arrayProduct[proId].price + "$";
    document.getElementById("proTotal").textContent = ":  " + (arrayProduct[proId].price * arrayProduct[proId].quantity).toFixed(2) + "$";
    document.getElementById("delete").onclick = () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            document.getElementById("delete").setAttribute("onclick", `${deletPro(proId)}`);
            productDetail();
        }
    }
}

// Show Card
function showProduct() {
    for (const card of document.querySelectorAll(".card")) {
        card.remove();
    }
    for (let i=0; i<arrayProduct.length; i++) {
        const card = document.createElement('div');
        const cardHeader = document.createElement('div');
        const cardFooter = document.createElement('div');
        const img = document.createElement('img');
        const foodName = document.createElement('h4');
        const price = document.createElement('h2');

        card.className = "card";
        card.dataset.index = i;
        cardHeader.className = "card-header";
        cardFooter.className = "card-footer";
        foodName.className = "product-name";
        img.src = arrayProduct[i].img;
    
        foodName.textContent = arrayProduct[i].name;
        price.textContent = arrayProduct[i].price + "$"; 
        
        cardHeader.appendChild(img);
        cardFooter.appendChild(foodName);
        cardFooter.appendChild(price);

        card.appendChild(cardHeader);
        card.appendChild(cardFooter);

        mainContainer.appendChild(card);

        card.addEventListener("click", productDetail);
    }
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

// Edit product
function editPro() {
    show(formAdd);
    add.setAttribute("onclick", "editProduct()");
    document.getElementById("urlPro").value = arrayProduct[proId].img;
    document.getElementById("namePro").value = arrayProduct[proId].name;
    document.getElementById("pricePro").value = arrayProduct[proId].price;
    document.getElementById("qtyPro").value = arrayProduct[proId].quantity;
    add.textContent = "Edit";
}

function newPro() {
    show(formAdd);
    add.setAttribute("onclick", "addNewProduct()");
    add.textContent = "Add";
}

function cateOption() {
    let all = document.createElement("option");
    all.value = "All";
    all.textContent = "All Category";
    cate.appendChild(all);

    for (const cateName of categories) {
        let option = document.createElement("option");
        option.value = cateName;
        option.textContent = cateName
        cate.appendChild(option);
    }
}

// Hide form
function cancel() {
    hide(formAdd);
}
// Invoke Function
loadStorage();
filter()
cateOption();
productDetail();
showProduct();