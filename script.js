const addButton = document.querySelector("#addButton");
const removeAllButton = document.querySelector("#removeAllButton");
const newBookModal = document.querySelector("#newBookModal");
const newBookButton = document.querySelector("#newBookButton");

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


// DOM state
const domState = (function(doc) {
    const article = doc.querySelector("article");
    const cardTemplate = doc.querySelector("#cardTemplate");

    const removeBooks = function() {
        while (article.hasChildNodes()) {
            article.removeChild(article.lastChild);
        }
    }

    const addBook = function(book) {
        const cardClone = cardTemplate.content.cloneNode(true);

        // Assigning randomId to card
        cardClone.querySelector(".card").dataset.randomId = book.randomId;

        cardClone.querySelector(".title").textContent = book.title;
        cardClone.querySelector(".author").textContent = book.author;
        cardClone.querySelector(".cover").src = book.cover;
        cardClone.querySelector(".readStatus").src = book.read ? "assets/images/have-read.svg" : "assets/images/not-read.svg";

        article.appendChild(cardClone);
    }

    const updateBooks = function() {
        removeBooks();
        myLibrary.books.forEach((book) => {
            addBook(book);
        });
    }

    const newBookTitle = doc.querySelector("#newBookTitle");
    const newBookAuthor = doc.querySelector("#newBookAuthor");
    const newBookRead = doc.querySelector("#newBookRead");

    const formValid = function() {
        if (newBookTitle.value !== "" && newBookAuthor.value !== "") return true;
        else return false;
    }

    const clearForm = function() {
        newBookTitle.value = "";
        newBookAuthor.value = "";
        newBookRead.checked = false;
    }

    const getForm = function() {
        return { title: newBookTitle.value, author: newBookAuthor.value, read: newBookRead.checked };
    }

    return { updateBooks, formValid, getForm, clearForm };
})(document);


// Events
domState.updateBooks();

addButton.addEventListener("click", () => {
    newBookModal.showModal();
});

removeAllButton.addEventListener("click", () => {
    myLibrary.removeAll();
    domState.updateBooks();
});

newBookButton.addEventListener("click", () => {
    const cover = "assets/images/book.webp";

    if (domState.formValid()) {
        const {title, author, read} = domState.getForm;
        myLibrary.add(title, author, cover, read);
        domState.updateBooks();
        domState.clearForm();
        newBookModal.close();
    }
});

closeModal.addEventListener("click", () => {
    domState.clearForm();
    newBookModal.close();
});

