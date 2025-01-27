// 1. Book class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.uniqueId = this.#generateUniqueId(title, author);
    }

    #generateUniqueId(title, author) {
        const randomInt = Math.floor(Math.random() * 9999);
        return title + author + randomInt;
    }
}

// 2. Library class
class Library {
    static books = [];

    static add(title, author, pages, read) {
        Library.books.push(new Book(title, author, pages, read));
    }

    static remove(uniqueId) {
        Library.books = Library.books.filter((book) => {
            return book.uniqueId !== uniqueId;
        });
    }

    static removeAll() {
        Library.books = [];
    }

    static get(uniqueId) {
        return Library.books.find((book) => {
            return book.uniqueId === uniqueId;
        });
    }

    static update(uniqueId, title, author, pages, read) {
        Library.books.forEach((book) => {
            if (book.uniqueId === uniqueId) {
                book.title = title;
                book.author = author;
                book.pages = pages;
                book.read = read;
            }
        });
    }

    static updateProperty(uniqueId, property, value) {
        Library.books.forEach((book) => {
            if (book.uniqueId === uniqueId) {
                book[property] = value;
            }
        });
    }
}

Library.add("Steve Jobs", "Isaac Walterson", 650, false);
Library.add("Atomic Habits", "James Clear", 420, true);
Library.updateProperty(Library.books[0].uniqueId, "author", "Walter Isaacson");
console.log(Library.books);

// 3. DisplayController class
class DisplayController {
    cardTemplate = document.querySelector("#cardTemplate");
    article = document.querySelector("article");

    #addBook(book) {
        const cardFragment = this.cardTemplate.content.cloneNode(true);

        cardFragment.querySelector(".title").textContent = book.title;
        cardFragment.querySelector(".author").textContent = book.author;
        cardFragment.querySelector(".pages").textContent = book.pages;
        const readText = cardFragment.querySelector(".read");
        readText.textContent = book.read ? "read" : "not read";

        const newCard = cardFragment.querySelector(".card");
        newCard.dataset.uniqueId = book.uniqueId;

        this.article.appendChild(cardFragment);
    }

    #removeBooks() {
        while (this.article.hasChildNodes()) {
            this.article.removeChild(this.article.lastChild);
        }
    }

    updateBooks() {
        this.#removeBooks();
        Library.books.forEach((book) => {
            this.#addBook(book);
        });
        addInput();
    }
}

const displayController = new DisplayController();
displayController.updateBooks();

// 4. Input handling logic
const addButton = document.querySelector("#addButton");
const removeAllButton = document.querySelector("#removeAllButton");
const addBookModal = document.querySelector("#newBookModal");
const createBookButton = document.querySelector("#newBookButton");
const titleInput = document.querySelector("#newBookTitle");
const authorInput = document.querySelector("#newBookAuthor");
const pagesInput = document.querySelector("#newBookPages");
const readInput = document.querySelector("#newBookRead");
const closeButton = document.querySelector("#closeModal");

function clearInput() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
}

function inputIsValid() {
    return titleInput.value !== "" 
        && authorInput.value !== "" 
        && pagesInput.value !== "" 
}

function addInput() {
    const books = document.querySelectorAll(".card");
    books.forEach((book) => {
        book.querySelector(".read").addEventListener("click", (e) => {
            const bookData = Library.get(book.dataset.uniqueId);
            const currentReadStatus = bookData.read;
            Library.updateProperty(book.dataset.uniqueId, "read", !currentReadStatus);
            displayController.updateBooks();
        });

        book.querySelector(".remove").addEventListener("click", (e) => {
            Library.remove(book.dataset.uniqueId);
            displayController.updateBooks();
        });
    });
}

addButton.addEventListener("click", (e) => {
    addBookModal.showModal();
});
removeAllButton.addEventListener("click", (e) => {
    Library.removeAll();
    displayController.updateBooks();
});
createBookButton.addEventListener("click", (e) => {
    if (!inputIsValid()) return;
    Library.add(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    displayController.updateBooks();
    clearInput();
    addBookModal.close();
});
closeButton.addEventListener("click", (e) => {
    clearInput();
    addBookModal.close();
});





