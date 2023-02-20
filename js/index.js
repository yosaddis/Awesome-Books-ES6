import Books from './modules/books.js';

// Get DOM elements
const dateDisplay = document.querySelector('.header__date');

// create a date-time function
const CurrentDateTime = () => {
	const dateObject = new Date();
	const yearNow = dateObject.getFullYear();
	const monthNow = dateObject.toLocaleString('default', { month: 'long' });
	const dayNow = dateObject.getDate();
	const timeNow = dateObject.toLocaleTimeString();

	// Append suffix to day
	if (dayNow > 3 && dayNow < 21) {
		const date = `${monthNow} ${dayNow}th ${yearNow}`;
		dateDisplay.innerHTML = `${date}, ${timeNow}`;
	} else {
		const d = dayNow % 10;
		let date = '';
		switch (d) {
			case 1:
				date = `${monthNow} ${dayNow}st ${yearNow}`;
				dateDisplay.innerHTML = `${date}, ${timeNow}`;
				break;
			case 2:
				date = `${monthNow} ${dayNow}nd ${yearNow}`;
				dateDisplay.innerHTML = `${date}, ${timeNow}`;
				break;
			case 3:
				date = `${monthNow} ${dayNow}rd ${yearNow}`;
				dateDisplay.innerHTML = `${date}, ${timeNow}`;
				break;
			default:
				date = `${monthNow} ${dayNow}th ${yearNow}`;
				dateDisplay.innerHTML = `${date}, ${timeNow}`;
				break;
		}
	}
};

setInterval(CurrentDateTime, 1000);

const showAndRemoveSuccessMessage = (target) => {
	const successMessage = document.createElement('p');
	successMessage.classList.add('books__addbook-success');
	successMessage.textContent = 'Book added successfully';
	target.insertAdjacentElement('afterend', successMessage);

	setTimeout(() => {
		successMessage.remove();
	}, 3000);
};


// create a form page display function
const displayForm = () => {
	const booksContainer = document.querySelector('.books');

	const addFormHtml = `
    <section class="books__addbook">
      <h2 class="books__addbook-title">Add a new book</h2>

      <form action="#" class="books__addbook-form">

        <label class="books__addbook-label" for='title'>
          <input type="text" name='title' id='title' placeholder='Title' required>
        </label>

        <label class="books__addbook-label">
          <input type="text" name='author' id='author' placeholder='Author' required>
        </label>

        <input type="submit" value="Add" data-input='submit'>
      </form>
    </section>
  `;

	booksContainer.innerHTML = '';
	booksContainer.insertAdjacentHTML('afterbegin', addFormHtml);
};

// create a contact page display function
const displayContact = () => {
	const booksContainer = document.querySelector('.books');

	const contactHtml = `
  <section class="books__contact">
    <h2 class="books__contact-title">Contact Information</h2>
    
    <div class="books__contact-details">
      <p>Do you have any question or you just want to say "Hello"? You can reach out to us!</p>
        <ul class="books__contact-details-info">
          <li>Our email: mail@mail.com</li>
          <li>Our phone number: 0043586534422</li>
          <li>Our address: Streetname 22, 84503 City, Country</li>
        </ul>
      </div>
  </section>
  `;

	booksContainer.innerHTML = '';
	booksContainer.insertAdjacentHTML('afterbegin', contactHtml);
};

// create a books page display function
const displayBooks = () => {
	const booksContainer = document.querySelector('.books');

	const booklistHtml = `
  <section class="books__collection">
    <h1 class="books__collection-title">All awesome books</h1>
    <div class="books__list"></div>
  </section>
  `;

	booksContainer.innerHTML = '';
	booksContainer.insertAdjacentHTML('afterbegin', booklistHtml);
};

// render  books on the page when page loads
window.addEventListener('DOMContentLoaded', () => {
	// create a new instance of the Books class
	const books = new Books();

	// call the renderBooks method from books class when the page loads
	books.renderBooks();
});

// add event listener to the page
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('header__nav-item')) {
		// Get DOM elements
		const navItems = document.querySelectorAll('.header__nav-item');

		// remove the active class from all nav items
		navItems.forEach((item) => {
			item.classList.remove('active');
		});

		// add the active class to the clicked nav item
		e.target.classList.add('active');

		// check which nav item was clicked
		if (e.target.dataset.nav === 'add') {
			displayForm();
		} else if (e.target.dataset.nav === 'contact') {
			displayContact();
		} else {
			displayBooks();

			// create a new instance of the Books class
			const books = new Books();

			// call the renderBooks method from books class when the page loads
			books.renderBooks();
		}
	} else if (e.target.dataset.input === 'submit') {
		// Get DOM elements
		const form = document.querySelector('.books__addbook-form');

		// check form validity
		if (form.checkValidity()) {
			// prevent the default behaviour
			e.preventDefault();

			// get the values from the form
			const formData = new FormData(form);
			const title = formData.get('title');
			const author = formData.get('author');
			const id = Math.random().toString(36).substring(2, 9);

			const newBook = { id, title, author };

			// create a new instance of the Books class
			const books = new Books();

			// call the addBook function
			books.addBook(newBook);

			// clear form
			form.reset();
		}
		// show success message
		showAndRemoveSuccessMessage(form);
	} else if (e.target.dataset.id) {
		// create a new instance of the Books class
		const books = new Books();

		// call the removeBook function
		books.removeBook(e.target.dataset.id);
	}
});