// create a class for book collection
export default class Books {
  constructor() {
    this.list = ' ';
  }

  // get books from local storage

  get list() {
    this.foo = 'linter use this for now';
    return localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
  }

  set list(value) {
    this.list.push(value);
  }

  // render books
  renderBooks() {
    // Get DOM elements'
    const bookList = document.querySelector('.books__list');

    // get the books from the books array from localStorage
    const booksCollection = this.list;

    // check the length of the books array
    if (booksCollection.length === 0) {
      // clear the list
      bookList.innerHTML = '';

      // update the DOM with no books message
      bookList.innerHTML = '<p class="books__list-item">No books to show</p>';
    } else {
      // loop through the books array
      const bookshtml = booksCollection.map((book) => `

      <div class="books__list-item">
        <p class="books__list-book">"${book.title}" by ${book.author}</p>
        <button class="books__list-item-delete" data-id="${book.id}">Delete</button>
      </div>
    `).join('');

      // clear the list
      bookList.innerHTML = '';

      // update the DOM with the new list
      bookList.insertAdjacentHTML('afterbegin', bookshtml);
    }
  }

  // add a book function

  addBook(book) {
    // get the books from the books array from localStorage
    const booksCollection = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
    booksCollection.push(book);
    this.foo = 'linter use this for now';
    // update the books array in localStorage
    localStorage.setItem('books', JSON.stringify(booksCollection));
  }

  // remove a book function
  removeBook(id) {
    // get the books from the books array from localStorage
    const booksCollection = JSON.parse(localStorage.getItem('books'));
    const updatedBooksCollection = booksCollection.filter((book) => book.id !== id);

    // update the books array in localStorage
    localStorage.setItem('books', JSON.stringify(updatedBooksCollection));

    // call the renderBooks function
    this.renderBooks();
  }
}
