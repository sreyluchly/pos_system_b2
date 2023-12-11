const mainContainer = document.querySelector(".main-container");
let arrayImage = [
    {img: "IMG/image1.jpg", name: "Apples", price: 50},
    {img: "IMG/image2.jpg", name: "Bananas", price: 50},
    {img: "IMG/image3.jpg", name: "Oranges", price: 50},
    {img: "IMG/image4.jpg", name: "Papayas", price: 50},
    {img: "IMG/image5.jpg", name: "Berries", price: 50},
    {img: "IMG/image6.jpg", name: "Mangoes", price: 50},
    {img: "IMG/image7.jpg", name: "Pineapples" , price: 50},
    {img: "IMG/image8.jpg", name: "Watermelons" , price: 50},
    {img: "IMG/image8.jpg", name: "Watermelons" , price: 50},
    {img: "IMG/image8.jpg", name: "Watermelons" , price: 50},
    {img: "IMG/image8.jpg", name: "Watermelons" , price: 50},
    {img: "IMG/image8.jpg", name: "Watermelons" , price: 50},
    {img: "IMG/image8.jpg", name: "Watermelons" , price: 50}
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
// showCard();