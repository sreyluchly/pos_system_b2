const mainContainer = document.querySelector(".main-container");
let arrayImage = [
    {img: "IMG/IMG_food/image1.jpg", name: "Apples", price: 50},
    {img: "IMG/IMG_food/image2.jpg", name: "Bananas", price: 50},
    {img: "IMG/IMG_food/image3.jpg", name: "Oranges", price: 50},
    {img: "IMG/IMG_food/image4.jpg", name: "Papayas", price: 50},
    {img: "IMG/IMG_food/image5.jpg", name: "Berries", price: 50},
    {img: "IMG/IMG_food/image6.jpg", name: "Mangoes", price: 50},
    {img: "IMG/IMG_food/image7.jpg", name: "Pineapples" , price: 50},
    {img: "IMG/IMG_food/image8.jpg", name: "Watermelons" , price: 50},
    {img: "IMG/IMG_food/image8.jpg", name: "Watermelons" , price: 50},
    {img: "IMG/IMG_food/image8.jpg", name: "Watermelons" , price: 50},
    {img: "IMG/IMG_food/image8.jpg", name: "Watermelons" , price: 50},
    {img: "IMG/IMG_food/image8.jpg", name: "Watermelons" , price: 50},
    {img: "IMG/IMG_food/image8.jpg", name: "Watermelons" , price: 50}
];

function saveStorage() {}
function loadStorage() {}
function showCard() {
    for (const images of arrayImage) {
        const card = document.createElement('div');
        const cardHeader = document.createElement('div');
        const cardFooter = document.createElement('div');
        const img = document.createElement('img');
        const foodName = document.createElement('span');
        const price = document.createElement('h2');

        card.className = "card";
        cardHeader.className = "card-header";
        cardFooter.className = "card-footer";
        foodName.className = "product-name";
    
        img.src = images.img;
        foodName.textContent = images.name;
        price.textContent = images.price + "$"; 
        
        cardHeader.appendChild(img);
        cardFooter.appendChild(foodName);
        cardFooter.appendChild(price);

        card.appendChild(cardHeader);
        card.appendChild(cardFooter);

        mainContainer.appendChild(card);
    }
}
showCard();

// Button on Navbar
let buttons = document.querySelectorAll('.nav-left button');
for (const btn of buttons) {
    btn.onclick = () => {
        for (const button of buttons) {
            button.setAttribute("class", "")
        }
        btn.setAttribute("class", "after");
    }
}

// Button Dark and Light mode
const btnTheme = document.querySelector(".nav-right button")
const themeMode = document.querySelector('.dark');
btnTheme.onclick = () => {
    themeMode.classList.toggle('dark');
    if (themeMode.className.includes("dark")) {
        document.body.style.background = "black";
        themeMode.textContent = "light_mode";
    }else {
        document.body.style.background = "white";
        themeMode.textContent = "dark_mode";
    }
}
