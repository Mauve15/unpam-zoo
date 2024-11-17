const STORAGE_KEY = 'BOOKSHELF_APPS';
let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert('Browser Anda tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  if (serializedData !== null) {
    books = JSON.parse(serializedData);
  }
  document.dispatchEvent(new Event('ondataloaded'));
}

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function findBook(bookId) {
  return books.find(book => book.id === bookId);
}

function findBookIndex(bookId) {
  return books.findIndex(book => book.id === bookId);
}

function makeBook(bookObject) {
    const { id, title, author, year, isComplete } = bookObject;
  
    const bookTitle = document.createElement('h3');
    bookTitle.setAttribute('data-testid', 'bookItemTitle');
    bookTitle.innerText = title;
  
    const bookAuthor = document.createElement('p');
    bookAuthor.setAttribute('data-testid', 'bookItemAuthor');
    bookAuthor.innerText = `Penulis: ${author}`;
  
    const bookYear = document.createElement('p');
    bookYear.setAttribute('data-testid', 'bookItemYear');
    bookYear.innerText = `Tahun: ${year}`;
  
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('action');
  
    const toggleButton = document.createElement('button');
    toggleButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    toggleButton.innerText = isComplete ? 'Belum Selesai' : 'Selesai ';
    toggleButton.addEventListener('click', function () {
      toggleBookStatus(id);
    });
  
    // const editButton = document.createElement('button');
    // editButton.setAttribute('data-testid', 'bookItemEditButton');
    // editButton.innerText = 'Edit';
    // editButton.addEventListener('click', function () {
    //   editBook(id);
    // });
  
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
    deleteButton.innerText = 'Hapus';
    deleteButton.addEventListener('click', function () {
      removeBook(id);
    });
  
    bookContainer.append(toggleButton, deleteButton);
  
    const article = document.createElement('div');
    article.setAttribute('data-bookid', id);
    article.setAttribute('data-testid', 'bookItem');
    article.classList.add('book_item');
    article.append(bookTitle, bookAuthor, bookYear, bookContainer);
  
    return article;
  }  

  function addBook() {
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = parseInt(document.getElementById('bookFormYear').value);
    const isComplete = document.getElementById('bookFormIsComplete').checked;
  
    if (isNaN(year)) {
      alert("Tahun harus berupa angka yang valid!");
      return;
    }
  
    const bookId = generateId();
    const bookObject = generateBookObject(bookId, title, author, year, isComplete);
    books.push(bookObject);
  
    document.dispatchEvent(new Event('ondatasaved'));
  }
  

function toggleBookStatus(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = !bookTarget.isComplete;
  document.dispatchEvent(new Event('ondatasaved'));
}

function removeBook(bookId) {
  const bookTargetIndex = findBookIndex(bookId);

  if (bookTargetIndex === -1) return;

  books.splice(bookTargetIndex, 1);
  document.dispatchEvent(new Event('ondatasaved'));
}

function renderBooks() {
  const incompleteBookshelfList = document.getElementById('incompleteBookList');
  const completeBookshelfList = document.getElementById('completeBookList');

  incompleteBookshelfList.innerHTML = '';
  completeBookshelfList.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isComplete) {
      incompleteBookshelfList.append(bookElement);
    } else {
      completeBookshelfList.append(bookElement);
    }
  }
}

document.getElementById('bookForm').addEventListener('submit', function (event) {
  event.preventDefault();
  addBook();
  renderBooks();
  saveData();
});

document.getElementById('searchBook').addEventListener('submit', function (event) {
  event.preventDefault();
  const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();

  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTitle));

  const incompleteBookshelfList = document.getElementById('incompleteBookList');
  const completeBookshelfList = document.getElementById('completeBookList');

  incompleteBookshelfList.innerHTML = '';
  completeBookshelfList.innerHTML = '';

  for (const bookItem of filteredBooks) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isComplete) {
      incompleteBookshelfList.append(bookElement);
    } else {
      completeBookshelfList.append(bookElement);
    }
  }
});

document.addEventListener('ondataloaded', function () {
  renderBooks();
});

document.addEventListener('ondatasaved', function () {
  saveData();
  renderBooks();
});

if (isStorageExist()) {
  loadDataFromStorage();
}