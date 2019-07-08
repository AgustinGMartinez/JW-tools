const cleanText = require('./utils').cleanText;
const cleanTextAndVerseNumber = require('./utils').cleanTextAndVerseNumber;
const booksToNumbers = require('./utils').booksToNumbers;
const all = require('./all');
const bible = new Map();

// initialize the bible Map
Object.keys(all).forEach(function(bookNumber) {
	Object.keys(all[bookNumber]).forEach(function(chapterNumber) {
		let content = all[bookNumber][chapterNumber];

		const entries = Object.entries(content).map(entry => [
			Number(entry[0]),
			entry[1],
		]);

		content = new Map(entries);
		content.getRange = function(string) {
			const [from, to] = string.split('-');
			let result = '';
			for (let i = 0; i <= to - from; i++) {
				let verse = i + Number(from);
				if (verse > this.size) break;
				result += this.get(verse) || '';
			}
			return result;
		};

		if (!(bible.get(Number(bookNumber)) instanceof Map)) {
			bible.set(Number(bookNumber), new Map());
		}
		const book = bible.get(Number(bookNumber));

		book.set(Number(chapterNumber.replace(/.json/g, '')), content);

		bible.set(Number(bookNumber), book);
	});
});

bible.search = function(phrase, books = null, MAX_RESULTS = 10) {
	// console.time('search');
	if (phrase.trim() === '') return [];
	const found = [];
	const foundPriority2 = []; // if found with unmatched order in 1 verse
	const foundPriority3 = []; // if found with unmatched order in 2 verses
	const getFoundCount = () =>
		found.length + foundPriority2.length + foundPriority3.length;
	let breakAll = false;
	books = books && booksToNumbers(books, abbreviations);
	// iterate the books
	for (let i = 1; i <= this.size; i++) {
		let currentBook = this.get(i);
		//apply book filters
		if (books && !(books.indexOf(i) > -1)) continue;
		// iterate the chapthers of the book
		for (let j = 1; j <= currentBook.size; j++) {
			let currentChapter = currentBook.get(j);
			let previousVerse = {
				// we will look into 2 verses max at the same time
				clean: '',
				regular: '',
			};
			// iterate all verses
			for (let k = 1; k <= currentChapter.size; k++) {
				let content = currentChapter.get(k);

				// look match on this verse, with order
				let cleanContent = cleanTextAndVerseNumber(content);
				phrase = cleanText(phrase);
				let regex = new RegExp(phrase, 'gi');
				let matches = regex.test(cleanContent);

				if (matches) {
					found.push({
						value: content,
						readble: bookNames[i - 1] + ' ' + j + ':' + k,
						map: i + '-' + j + '-' + k,
					});
				} else {
					// look match on the previous verse and this one concatenated
					// with order
					let conc = cleanTextAndVerseNumber(
						previousVerse.clean + cleanContent
					);
					matches = regex.test(conc);
					if (matches) {
						found.push({
							value: previousVerse.regular + content,
							readble: bookNames[i - 1] + ' ' + j + ':' + (k - 1) + ', ' + k,
							map: i + '-' + j + '-' + (k - 1) + ':' + k,
						});
					} else {
						// check match without keeping order (in 1 verse)
						let regexs = phrase
							.trim()
							.split(' ')
							.map(w => new RegExp('\\b' + cleanText(w) + '\\b', 'gi'));
						matches = regexs.every(regex => regex.test(cleanContent));

						if (matches) {
							foundPriority2.push({
								value: content,
								readble: bookNames[i - 1] + ' ' + j + ':' + k,
								map: i + '-' + j + '-' + k,
							});
						} else {
							// look match on the previous verse and this one concatenated
							// without order
							let conc = cleanTextAndVerseNumber(
								previousVerse.clean + cleanContent
							);
							matches = regexs.every(regex => regex.test(conc));

							if (matches) {
								foundPriority3.push({
									value: previousVerse.regular + content,
									readble:
										bookNames[i - 1] + ' ' + j + ':' + (k - 1) + ', ' + k,
									map: i + '-' + j + '-' + (k - 1) + ':' + k,
								});
							}
						}
					}
				}

				// reset so we don't get duplicates
				if (matches) {
					previousVerse.clean = '';
					previousVerse.regular = '';
				} else {
					// else keep trying to find a concatenable match
					previousVerse.clean = cleanContent;
					previousVerse.regular = content;
				}
				// no sirve por el tema de las prioridades
				// if (getFoundCount() >= MAX_RESULTS) breakAll = true;
				// if (breakAll) break;
			}
			// if (breakAll) break;
		}
		// if (breakAll) break;
	}
	// console.timeEnd('search');
	return found
		.concat(foundPriority2)
		.concat(foundPriority3)
		.slice(0, MAX_RESULTS);
};

const abbreviations = [
	'gene',
	'exod',
	'leve',
	'nume',
	'deut',
	'josu',
	'juec',
	'rut',
	'1sam',
	'2sam',
	'1rey',
	'2rey',
	'1cro',
	'2cro',
	'esdr',
	'nehe',
	'este',
	'job',
	'salm',
	'prov',
	'ecle',
	'cant',
	'isai',
	'jere',
	'lame',
	'ezeq',
	'dani',
	'osea',
	'joel',
	'amos',
	'abdi',
	'jona',
	'miqu',
	'nahu',
	'haba',
	'sofi',
	'ageo',
	'zaca',
	'mala',
	'mate',
	'marc',
	'luca',
	'juan',
	'hech',
	'roma',
	'1cor',
	'2cor',
	'gala',
	'efes',
	'fili',
	'colo',
	'1tes',
	'2tes',
	'1tim',
	'2tim',
	'tito',
	'file',
	'hebr',
	'sant',
	'1ped',
	'2ped',
	'1jua',
	'2jua',
	'3jua',
	'juda',
	'reve',
];

const bookNames = [
	'Génesis',
	'Éxodo',
	'Levítico',
	'Números',
	'Deuteronomio',
	'Josué',
	'Jueces',
	'Rut',
	'1 Samuel',
	'2 Samuel',
	'1 Reyes',
	'2 Reyes',
	'1 Crónicas',
	'2 Crónicas',
	'Esdras',
	'Nehemías',
	'Ester',
	'Job',
	'Salmos',
	'Proverbios',
	'Eclesiastés',
	'El Cantar de los Cantares',
	'Isaías',
	'Jeremías',
	'Lamentaciones',
	'Ezequiel',
	'Daniel',
	'Oseas',
	'Joel',
	'Amós',
	'Abdías',
	'Jonás',
	'Miqueas',
	'Nahúm',
	'Habacuc',
	'Sofonías',
	'Ageo',
	'Zacarías',
	'Malaquías',
	'Mateo',
	'Marcos',
	'Lucas',
	'Juan',
	'Hechos',
	'Romanos',
	'1 Corintios',
	'2 Corintios',
	'Gálatas',
	'Efesios',
	'Filipenses',
	'Colosenses',
	'1 Tesalonicenses',
	'2 Tesalonicenses',
	'1 Timoteo',
	'2 Timoteo',
	'Tito',
	'Filemón',
	'Hebreos',
	'Santiago',
	'1 Pedro',
	'2 Pedro',
	'1 Juan',
	'2 Juan',
	'3 Juan',
	'Judas',
	'Revelación',
];

exports.getBook = function(numberOrAbbr) {
	if (typeof numberOrAbbr === 'number') {
		return bible.get(numberOrAbbr);
	} else {
		return bible.get(abbreviations.indexOf(numberOrAbbr) + 1);
	}
};

exports.search = bible.search.bind(bible);

// console.log(exports.search('jehova dijo a mi señor', undefined, 5));
// console.log(
// 	exports
// 		.getBook(27)
// 		.get(2)
// 		.getRange('44-45')
// );
