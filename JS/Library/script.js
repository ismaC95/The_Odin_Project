const myLibrary = [];
const app = document.getElementById("app-container");
const displayBook = document.getElementById("book-display");
const addBookBtn = document.getElementById("add-book");
const addBookModal = document.getElementById("add-book-modal");
const cancelAddBook = document.getElementById("cancel-book");
const addBookForm = document.getElementById("add-book-form");

function Book(id, title, author, read = false) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.read = read;
}

Book.prototype.readToggle = function () {
  this.read = !this.read;
  console.log(myLibrary);
};

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
    const removeButton = document.createElement("button");
    const readButton = document.createElement("button");

    removeButton.textContent = "Remove";
    removeButton.setAttribute("data-id", book.id);
    removeButton.setAttribute("id", "remove-btn");

    readButton.setAttribute("id", "read-button");
    readButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";

    bookCardDisplay.appendChild(titleDisplay);
    bookCardDisplay.appendChild(document.createElement("br"));
    bookCardDisplay.appendChild(authorDisplay);
    bookCardDisplay.appendChild(readButton);
    bookCardDisplay.appendChild(removeButton);

    displayBook.appendChild(bookCardDisplay);

    // REMOVE BUTTON FUNCTIONALITY
    removeButton.addEventListener("click", (e) => {
      const bookId = e.target.getAttribute("data-id");

      const index = myLibrary.findIndex((book) => book.id === bookId);
      if (index !== -1) {
        myLibrary.splice(index, 1);
      }
      displayBooks();
    });

    // READ BUTTON FUNCTIONALITY
    readButton.addEventListener("click", () => {
      book.readToggle();
      displayBooks();
    });
  });
}

addBookToLibrary("Hello Kitty", "Miau");
addBookToLibrary("Mi caballero", "Tania");

addBookBtn.onclick = () => {
  addBookModal.showModal();
};

cancelAddBook.onclick = () => {
  addBookModal.close();
  addBookForm.reset();
};

//add books through the modal
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = addBookForm.elements["title"].value;
  const author = addBookForm.elements["author"].value;

  addBookToLibrary(title, author);
  addBookModal.close();
  addBookForm.reset();
  console.log(myLibrary);
  displayBooks();
});

displayBooks();
console.log(myLibrary);
