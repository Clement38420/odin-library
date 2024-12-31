const booksContainer = document.querySelector(".books-container");
const addBookDialog = document.querySelector("#add-book-dialog");
const addBookForm = document.querySelector("form");

const myLibrary = [];

class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(library, author, title, pages, read) {
    library.push(new Book(author, title, pages, read));
}

function readBook(e) {
    myLibrary[parseInt(e.target.parentElement.parentElement.dataset.id)].toggleRead();
    displayBooks();
}

function createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = myLibrary.indexOf(book).toString();

    for (let bookProperty in book) {
        if (typeof book[bookProperty] !== "function") {
            if (bookProperty === "read") {
                const span = document.createElement("span");
                span.innerText = book.read ? "Already read" : "Not read yet";
                bookCard.appendChild(span);
            } else {
                const span = document.createElement("span");
                span.innerText = book[bookProperty];
                bookCard.appendChild(span);
            }
        }
    }

    const buttonsContainer = document.createElement("div");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "cancel", "delete-book-btn");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", deleteBook);
    buttonsContainer.appendChild(deleteBtn)

    const readBtn = document.createElement("button");
    readBtn.classList.add("btn", "read-book-btn");
    readBtn.innerText = "Read";
    readBtn.addEventListener("click", readBook);
    buttonsContainer.appendChild(readBtn)

    bookCard.appendChild(buttonsContainer)

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
    console.log(formData.read);
    addBookToLibrary(myLibrary, formData.author, formData.title, formData.pages, (formData.read === "on") );
    displayBooks();
    addBookForm.reset();
    addBookDialog.close();
    e.preventDefault();
}

function deleteBook(e) {
    myLibrary.splice(parseInt(e.target.parentElement.parentElement.dataset.id), 1);
    displayBooks();
}