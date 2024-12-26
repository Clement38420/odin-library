const booksContainer = document.querySelector(".books-container")

const myLibrary = [];

function Book(author, title, pages) {
    this.author = author;
    this.title = title;
    this.pages = pages;
}

function addBookToLibrary(library, author, title, pages) {
    library.push(new Book(author, title, pages));
}

function createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    for (let bookProperty in book) {
        const span = document.createElement("span");
        span.innerText = book[bookProperty];
        bookCard.appendChild(span);
    }

    booksContainer.appendChild(bookCard);
}

function displayBooks() {
    for (let book of myLibrary) {
        createBookCard(book);
    }
}