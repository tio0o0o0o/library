const addButton = document.querySelector("#addButton");
const removeAllButton = document.querySelector("#removeAllButton");
const cardTemplate = document.querySelector("#cardTemplate");
const article = document.querySelector("article");
const newBookModal = document.querySelector("#newBookModal");
const newBookButton = document.querySelector("#newBookButton");
const newBookTitle = document.querySelector("#newBookTitle");
const newBookAuthor = document.querySelector("#newBookAuthor");
const newBookRead = document.querySelector("#newBookRead");
const newBookCover = document.querySelector("#newBookCover");
const closeModal = document.querySelector("#closeModal");


// Data logic 
function Book(title, author, cover, read, randomId) {
    this.title = title;
    this.author = author;
    this.cover = cover;
    this.read = read;
    this.randomId = randomId;
}

function Library(name) {
    this.name = name,
    this.books = []
}
Library.prototype.add = function (title, author, cover, read) {
    // Generate ID for associating data with DOM
    let randomId = this.generateRandomID(title);
    let newBook = new Book(title, author, cover, read, randomId);
    this.books.push(newBook);
    return newBook;
}
Library.prototype.remove = function (randomId) {
    this.books = this.books.filter((book) => {
        return book.randomId !== randomId;
    });
}
Library.prototype.removeAll = function () {
    this.books = [];
},
    Library.prototype.update = function (randomId, targetAttribute, newValue) {
        this.books.map((book) => {
            if (book.randomId === randomId) book[targetAttribute] = newValue;
        });
    }
Library.prototype.updateAll = function (randomId, title, author, cover, read) {
    this.books.map((book) => {
        if (book.randomId === randomId) {
            book.title = title;
            book.author = author;
            book.cover = cover;
            book.read = read;
        }
    });
}
Library.prototype.generateRandomID = function (title) {
    let randomInt = Math.floor(Math.random() * 9999);
    return title + randomInt.toString();
}

let myLibrary = new Library("My Library");

myLibrary.add("Steve Jobs", "Isaac Walterson", "assets/images/steve-jobs.webp", true);
myLibrary.add("The Hobbit", "J. R. R. Tolkien", "assets/images/hobbit.webp", false);
myLibrary.add("Zero To One", "Peter Thiel", "assets/images/zero-to-one.webp", false);
myLibrary.add("Atlas Shrugged", "Ayn Rand", "assets/images/atlas-shrugged.webp", false);

// DOM manipulation
function addToDOM(title, author, cover, read, randomId) {
    let cardClone = cardTemplate.content.cloneNode(true);
    let card = cardClone.querySelector(".card");
    let titleText = cardClone.querySelector(".title");
    let authorText = cardClone.querySelector(".author");
    let coverImage = cardClone.querySelector(".cover");
    let readStatus = cardClone.querySelector(".readStatus");

    titleText.textContent = title;
    authorText.textContent = author;
    coverImage.src = cover;
    if (read) readStatus.src = "assets/images/have-read.svg";
    else readStatus.src = "assets/images/not-read.svg";

    // Assigning randomId to card
    card.dataset.randomId = randomId;

    article.appendChild(cardClone);

    // removeButton.addEventListener("click", () => {
    //     myLibrary.remove(card.dataset.randomId);
    //     card.remove();
    // });

    // updateButton.addEventListener("click", () => {
    //     myLibrary.updateAll("The Among Us Guidebook", "Skibidi Sigma", 420, true);
    //     titleText.textContent = "The Among Us Guidebook";
    //     authorText.textContent = "Skibidi Sigma";
    //     pagesText.textContent = 420;
    // });

    // readToggle.addEventListener("input", () => {
    //     myLibrary.update(card.dataset.randomId, "read", readToggle.checked);
    // });
}

function removeAllFromDOM() {
    while (article.hasChildNodes()) {
        article.removeChild(article.lastChild);
    }
}


// Events
myLibrary.books.forEach((book) => {
    addToDOM(book.title, book.author, book.cover, book.read, book.randomId);
});

addButton.addEventListener("click", () => {
    newBookModal.showModal();
});

removeAllButton.addEventListener("click", () => {
    myLibrary.removeAll();
    removeAllFromDOM();
});

newBookButton.addEventListener("click", () => {
    let cover = "assets/images/book.webp";
    let newBook = myLibrary.add(newBookTitle.value, newBookAuthor.value, cover, newBookRead.checked);
    addToDOM(newBook.title, newBook.author, newBook.cover, newBook.read, newBook.randomId);
    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookRead.checked = false;
    // newBookModal.close();
});

closeModal.addEventListener("click", () => {
    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookRead.checked = false;
    newBookModal.close();
});