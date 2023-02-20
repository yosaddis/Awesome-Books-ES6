import { DateTime } from "./luxon/luxon.js";

// create a date-time function
export const CurrentDateTime = () => {

	const dateDisplay = document.querySelector('.header__date');
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