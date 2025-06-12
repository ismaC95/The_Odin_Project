const myLibrary = [];
const app = document.getElementById("app-container");
const displayBook = document.getElementById("book-display");
const addBookBtn = document.getElementById("add-book");
const addBookModal = document.getElementById("add-book-modal");

function Book(id, title, author) {
  this.id = id;
  this.title = title;
  this.author = author;
}

function addBookToLibrary(inputTitle, inputAuthor) {
  const inputId = crypto.randomUUID();

  const bookAdded = new Book(inputId, inputTitle, inputAuthor);

  myLibrary.push(bookAdded);
}

function displayBooks() {
  //add a card with the book information into the div with class book-display
  displayBook.innerHTML = "";

  myLibrary.map((book) => {
    const bookCardDisplay = document.createElement("div");
    const titleDisplay = document.createTextNode(`${book.title}`);
    const authorDisplay = document.createTextNode(`${book.author}`);

    bookCardDisplay.appendChild(titleDisplay);
    bookCardDisplay.appendChild(document.createElement("br"));
    bookCardDisplay.appendChild(authorDisplay);

    displayBook.appendChild(bookCardDisplay);
  });
}

addBookToLibrary("Hello Kitty", "Miau");
addBookToLibrary("Mi caballero", "Tania");

addBookBtn.onclick = () => {
  //   addBookModal.m;
};

displayBooks();
