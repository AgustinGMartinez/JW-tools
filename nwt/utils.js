exports.cleanText = text =>
	text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/([^\w\d\s])/g, '')
		.replace();

exports.cleanTextAndVerseNumber = text =>
	text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/(\d+\s{2}|\d+\t)/g, ' ')
		.replace(/([^\w\d\s])/g, '')
		.replace();

exports.booksToNumbers = (books, abbreviations) => {
	return books
		.map(book => {
			if (typeof book === 'number') {
				return book;
			} else {
				const toNumber = abbreviations.indexOf(book) + 1;
				if (toNumber) return toNumber;
				else return null;
			}
		})
		.filter(Boolean);
};
