let addButton = document.querySelector("#addButton");
let removeAllButton = document.querySelector("#removeAllButton");
let cardTemplate = document.querySelector("#cardTemplate");
let article = document.querySelector("article");

// Data logic 
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function Library(name) {
    this.name = name,
    this.books = []
}
Library.prototype.add = function(title, author, pages, read) {
    this.books.push(new Book(title, author, pages, read));
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

let myLibrary = new Library("My Library");

myLibrary.add("Isaac Walterson", "Steve Jobs", "650", false);
myLibrary.add("George Orwell", "1984", "540", true);
myLibrary.add("Unknown", "Hitchhiker's Guide to the Universe", "850", false);
myLibrary.remove("1984");
myLibrary.update("Steve Jobs", "read", true);


// DOM manipulation
function addToDOM(title, author, pages, read) {
    let cardClone = cardTemplate.content.cloneNode(true);
    let titleText = cardClone.querySelector(".title");
    let authorText = cardClone.querySelector(".author");
    let pagesText = cardClone.querySelector(".pages");
    let readText = cardClone.querySelector(".read");

    titleText.textContent = title;
    authorText.textContent = author;
    pagesText.textContent = pages;
    readText.textContent = read;

    article.appendChild(cardClone);
}
function removeAllFromDOM() {
    while (article.hasChildNodes()) {
        article.removeChild(article.lastChild);
    }
}


// Events
addButton.addEventListener("click", () => {
    myLibrary.add("1984", "George Orwell", 650, true);
    addToDOM("1984", "George Orwell", "650", "true");
});

removeAllButton.addEventListener("click", () => {
    myLibrary.removeAll();
    removeAllFromDOM();
});
