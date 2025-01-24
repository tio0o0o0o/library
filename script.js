// Data logic 
function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function Library(name) {
    this.name = name,
    this.books = []
}
Library.prototype.add = function(author, title, pages, read) {
    this.books.push(new Book(author, title, pages, read));
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
console.table(myLibrary.books);

// DOM manipulation
// 1. Create function to add new book to DOM
 
// 2. Create functions edit a specific book in the DOM

// 3. Create function to add all books to DOM