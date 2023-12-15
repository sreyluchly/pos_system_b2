const mainContainer = document.querySelector(".main-container");
const tbody = document.querySelector('tbody');
const main = document.querySelector('main');
const aside = document.querySelector('aside');
const formAdd = document.querySelector('.form-container');
const btnAdd = document.getElementById('btnAdd');
let arrayImage = [
    {id: 1, img: "IMG/image1.jpg", name: "Ash", price: 10, category: "american"},
    {id: 2, img: "IMG/image2.jpg", name: "Spaghetti", price: 10, category: "italy"},
    {id: 3, img: "IMG/image3.jpg", name: "Chinese Noodles", price: 5, category: "other"},
    {id: 4, img: "IMG/image4.jpg", name: "Sushi", price: 100, category: "other"},
    {id: 5, img: "IMG/image5.jpg", name: "Fish Fried", price: 35, category: "american"},
    {id: 6, img: "IMG/image6.jpg", name: "Samon Fried", price: 15, category: "american"},
    {id: 7, img: "IMG/image7.jpg", name: "Burger", price: 5, category: "american"},
    {id: 8, img: "IMG/image8.jpg", name: "Prawns", price: 50, category: "american"},
    {id: 9, img: "IMG/image9.jpg", name: "Khmer Noodles", price: 5, category: "khmer"}
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
    localStorage.setItem("arrayImage", JSON.stringify(arrayImage));
}
function loadStorage() {
    if (localStorage.getItem("arrayImage") != null) {
        arrayImage = JSON.parse(localStorage.getItem("arrayImage"));
    }
}

function productDetail(event) {
    let object = {};
    let index = event.target.closest('.card').dataset.index;
    let totalResult = 0;
    object.name = arrayImage[index].name;
    object.price = arrayImage[index].price;
    arrayDetail.push(object);

    for (const tr of document.querySelectorAll('tbody tr')) {
        tr.remove()
    }
    for (const pro of arrayDetail) {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdPrice = document.createElement('td');
    
        tdPrice.textContent = pro.price + "$";
        tdName.textContent = pro.name;
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tbody.appendChild(tr);
        totalResult += pro.price;
    }
    document.getElementById('total').textContent = totalResult.toFixed(2) + "$";
    document.getElementById('subtotal').textContent = (Math.round(totalResult)).toFixed(2) + "$";
}
// Show Card
function showCard() {
    for (const card of document.querySelectorAll(".card")) {
        card.remove();
    }
    for (let i=0; i<arrayImage.length; i++) {
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
    
        img.src = arrayImage[i].img;
        foodName.textContent = arrayImage[i].name;
        price.textContent = arrayImage[i].price + "$"; 
        
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

// Menu proccess
for (const li of document.querySelectorAll('ul li')) {
    li.onclick = () => {
        for (const li of document.querySelectorAll('ul li')) {
            li.className = ""
        }
        li.className = "after";
    }
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
showCard();
