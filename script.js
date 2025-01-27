// 1. Book class
class Book {
    constructor(title, author, cover, read) {
        this.title = title;
        this.author = author;
        this.cover = cover;
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

    static add(title, author, cover, read) {
        Library.books.push(new Book(title, author, cover, read));
    }

    static remove(uniqueId) {
        Library.books = Library.books.filter((book) => {
            return book.uniqueId !== uniqueId;
        });
    }

    static get(uniqueId) {
        return Library.books.find((book) => {
            return book.uniqueId === uniqueId;
        });
    }

    static update(uniqueId, title, author, cover, read) {
        Library.books.forEach((book) => {
            if (book.uniqueId === uniqueId) {
                book.title = title;
                book.author = author;
                book.cover = cover;
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

Library.add("Steve Jobs", "Isaac Walterson", "url", false);
Library.add("Atomic Habits", "James Clear", "url", true);
Library.updateProperty(Library.books[0].uniqueId, "author", "Walter Isaacson");
Library.remove(Library.books[1].uniqueId);
console.log(Library.books);

// 2. domController class