exports.cleanText = text =>
	text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // quitar acentos
		.replace(/ +/g, ' ') // cambia mas de 1 espacio por uno solo
		.replace(/([^\w\d\s])/g, ''); //  limpia cualquier otra cosa

exports.cleanTextAndVerseNumber = text =>
	text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // quitar acentos
		.replace(/(\d+\s{2}|\d+\t)/g, ' ') // quita el numero de versiculo
		.replace(/([^\w\d\s])/g, ''); //  limpia cualquier otra cosa

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
