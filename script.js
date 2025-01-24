// Data logic 
function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function Library(name) {
    this.name = name;
    this.books = []
}
Library.prototype.add = function(author, title, pages, read) {
    books.push(new Book(author, title, pages, read));
}
Library.prototype.remove = function(title) {
    library.filter((book) => {
        return book.title !== title;
    }); 
}
Library.prototype.removeAll = function() {
    books = [];
},
Library.prototype.update = function(title, targetAttribute, newValue) {
    books.map((book) => {
        if (book.title === title) book[targetAttribute] = newValue;
    });
}


// DOM manipulation
// 1. Create function to add new book to DOM
 
// 2. Create functions edit a specific book in the DOM

// 3. Create function to add all books to DOM