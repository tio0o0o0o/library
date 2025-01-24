const addButton = document.querySelector("#addButton");
const removeAllButton = document.querySelector("#removeAllButton");
const cardTemplate = document.querySelector("#cardTemplate");
const article = document.querySelector("article");

// Data logic 
function Book(title, author, pages, read, randomId) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.randomId = randomId;
}

function Library(name) {
    this.name = name,
    this.books = []
}
Library.prototype.add = function(title, author, pages, read) {
    // Generate ID for associating data with DOM
    let randomId = this.generateRandomID(title);
    let newBook = new Book(title, author, pages, read, randomId);
    this.books.push(newBook);
    return newBook;
}
Library.prototype.remove = function(title) {
    this.books = this.books.filter((book) => {
        return book.title !== title;
    }); 
}
Library.prototype.removeAll = function() {
    this.books = [];
},
Library.prototype.update = function(title, targetAttribute, newValue) {
    this.books.map((book) => {
        if (book.title === title) book[targetAttribute] = newValue;
    });
}
Library.prototype.generateRandomID = function(title) {
    let randomInt = Math.floor(Math.random() * 9999);
    return title + randomInt.toString();
}

let myLibrary = new Library("My Library");

myLibrary.add("Isaac Walterson", "Steve Jobs", "650", false);
myLibrary.add("George Orwell", "1984", "540", true);
myLibrary.add("Unknown", "Hitchhiker's Guide to the Universe", "850", false);
myLibrary.remove("1984");
myLibrary.update("Steve Jobs", "read", true);


// DOM manipulation
function addToDOM(title, author, pages, read, randomId) {
    let cardClone = cardTemplate.content.cloneNode(true);
    let card = cardClone.querySelector(".card");
    let titleText = cardClone.querySelector(".title");
    let authorText = cardClone.querySelector(".author");
    let pagesText = cardClone.querySelector(".pages");
    let readText = cardClone.querySelector(".read");

    titleText.textContent = title;
    authorText.textContent = author;
    pagesText.textContent = pages;
    readText.textContent = read;

    // Assigning randomId to card
    card.dataset.randomId = randomId;

    article.appendChild(cardClone);
}
function removeAllFromDOM() {
    while (article.hasChildNodes()) {
        article.removeChild(article.lastChild);
    }
}


// Events
myLibrary.books.forEach((book) => {
    addToDOM(book.title, book.author, book.pages, book.read, book.randomId);
});

addButton.addEventListener("click", () => {
    let newBook = myLibrary.add("1984", "George Orwell", 650, true);
    addToDOM(newBook.title, newBook.author, newBook.pages, newBook.read, newBook.randomId);
});

removeAllButton.addEventListener("click", () => {
    myLibrary.removeAll();
    removeAllFromDOM();
});

