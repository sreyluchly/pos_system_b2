const mainContainer = document.querySelector(".main-container");
const tbody = document.querySelector('tbody');
const main = document.querySelector('main');
const aside = document.querySelector('aside');
const formAdd = document.querySelector('.form-container');
const btnAdd = document.getElementById('btnAdd');
const imgDetail = document.getElementById("imgDetail");
let proId = 0;

let arrayProduct = [
    {id: 1, img: "IMG/image1.jpg", name: "Ash", quantity: 10, price: 10, category: "american"},
    {id: 2, img: "IMG/image2.jpg", name: "Spaghetti", quantity: 15, price: 10, category: "italy"},
    {id: 3, img: "IMG/image3.jpg", name: "Chinese Noodles", quantity: 20, price: 5, category: "other"},
    {id: 4, img: "IMG/image4.jpg", name: "Sushi", quantity: 5, price: 100, category: "other"},
    {id: 5, img: "IMG/image6.jpg", name: "Samon Fried", quantity: 15, price: 15, category: "american"},
    {id: 6, img: "IMG/image9.jpg", name: "Khmer Noodles", quantity: 100, price: 5, category: "khmer"}
];
let arrayDetail = [];
// Show and hide Elements
function hide(element) {
    element.style.display = "none";
}
function show(element) {
    element.style.display = "flex"
}

function saveStorage() {
    localStorage.setItem("arrayProduct", JSON.stringify(arrayProduct));
}
function loadStorage() {
    if (localStorage.getItem("arrayProduct") != null) {
        arrayProduct = JSON.parse(localStorage.getItem("arrayProduct"));
    }
}

function deletPro(index) {
    arrayProduct.splice(index, 1);
    saveStorage();
    showProduct();
}

function addNewProduct() {
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
    productDetail();
    hide(formAdd);
}
function productDetail(event) {
    proId = event != 0 ? event.target.parentElement.parentElement.dataset.index : 0;
    imgDetail.src = arrayProduct[proId].img;
    document.getElementById("proName").textContent = arrayProduct[proId].name;
    document.getElementById("proCate").textContent = arrayProduct[proId].category;
    document.getElementById("proPrice").textContent = arrayProduct[proId].price;
    document.getElementById("delete").onclick = () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            document.getElementById("delete").setAttribute("onclick", `${deletPro(proId)}`)
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

// Add to Cart
btnAdd.onclick = () => {
    show(formAdd);
}

function cancel() {
    hide(formAdd);
}

// Button Dark and Light mode
const btnTheme = document.querySelector(".nav-right button");
const themeMode = document.querySelector('.dark');
btnTheme.onclick = () => {
    themeMode.classList.toggle('dark');
    if (themeMode.className.includes("dark")) {
        document.body.style.background = "#373D46";
        themeMode.textContent = "light_mode";
    }else {
        document.body.style.background = "white";
        themeMode.textContent = "dark_mode";
    }
}

loadStorage();
showProduct();
productDetail();
// localStorage.clear();