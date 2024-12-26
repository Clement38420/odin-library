const booksContainer = document.querySelector(".books-container");
const addBookDialog = document.querySelector("#add-book-dialog");
const addBookForm = document.querySelector("form");

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
    booksContainer.innerHTML = "";
    for (let book of myLibrary) {
        createBookCard(book);
    }
}

document.querySelector(".add-book").addEventListener("click", showAddBookDialog);
document.querySelector("#cancel").addEventListener("click", closeAddBookDialog);
document.querySelector("#submit-book").addEventListener("click", confirmAddBookDialog);

function showAddBookDialog() {
    addBookDialog.showModal();
}

function closeAddBookDialog() {
    addBookDialog.close();
}

function confirmAddBookDialog(e) {
    const formData = Object.fromEntries(new FormData(addBookForm));
    addBookToLibrary(myLibrary, formData.author, formData.title, formData.pages);
    displayBooks();
    addBookForm.reset();
    addBookDialog.close();
    e.preventDefault();
}