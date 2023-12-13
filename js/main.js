const mainContainer = document.querySelector(".main-container");
const tbody = document.querySelector('tbody');
const list = document.querySelectorAll('ul li');
let arrayImage = [
    {img: "IMG/image1.jpg", name: "Ash", price: 50},
    {img: "IMG/image2.jpg", name: "Spaghetti", price: 50},
    {img: "IMG/image3.jpg", name: "Chinese Noodles", price: 50},
    {img: "IMG/image4.jpg", name: "Sushi", price: 50},
    {img: "IMG/image5.jpg", name: "Sushi", price: 50},
    {img: "IMG/image6.jpg", name: "Sushi", price: 50},
    {img: "IMG/image7.jpg", name: "Sushi", price: 50},
    {img: "IMG/image8.jpg", name: "Sushi", price: 50},
    {img: "IMG/image9.jpg", name: "Sushi", price: 50}
];
let arrayDetail = [];

function saveStorage() {
    localStorage.setItem("arrayImage", JSON.stringify(arrayImage));
}
function loadStorage() {
    if (localStorage.getItem("arrayImage") != null) {
        arrayImage = JSON.parse(localStorage.getItem("arrayImage"));
    }
}

function productDetail(event) {
    let index = event.target.closest('.card').dataset.index;
    console.log(arrayImage[index]);
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdPrice = document.createElement('td');

    tdPrice.textContent = arrayImage[index].price + "$";
    tdName.textContent = arrayImage[index].name;
    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    tbody.appendChild(tr);
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

// Menu proccess
for (const li of list) {
    li.onclick = () => {
        for (const li of list) {
            li.className = "";
            li.firstElementChild.nextElementSibling.style.color = "black";
            li.firstElementChild.style.color = "black";
        }
        li.className = "after";
        li.firstElementChild.style.color = "white";
        li.firstElementChild.nextElementSibling.style.color = "white";
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