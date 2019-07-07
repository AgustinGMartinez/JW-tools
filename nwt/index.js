const fs = require('fs');
const path = require('path');

const booksPath = __dirname;

const bible = new Map();

const cleanText = text =>
	text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/([^\w\d])/g, '')
		.replace();

const cleanTextAndVerseNumber = text =>
	text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/(\d+\s{2}|\d\t)/g, '')
		.replace(/([^\w\d])/g, '')
		.replace();

fs.readdirSync(booksPath).forEach(function(bookFolderName, idx) {
	if (bookFolderName === 'index.js') return; // ignore this very file
	const bookPath = path.resolve(booksPath, bookFolderName);
	fs.readdirSync(bookPath).forEach(function(chapterFolderName, index) {
		let content = require(path.resolve(bookPath, chapterFolderName));

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

		if (!(bible.get(Number(bookFolderName)) instanceof Map)) {
			bible.set(Number(bookFolderName), new Map());
		}
		const book = bible.get(Number(bookFolderName));

		book.set(Number(chapterFolderName.replace(/.json/g, '')), content);

		bible.set(Number(bookFolderName), book);
	});
});

bible.search = function(phrase) {
	console.time('search');
	if (phrase.trim() === '') return [];
	const found = [];
	// iterate the books
	for (let i = 1; i <= this.size; i++) {
		let currentBook = this.get(i);
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

				// look match on this verse
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
				if (found.length >= 100) return found;
			}
		}
	}
	console.timeEnd('search');
	return found;
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

console.log(exports.search('jehova a mi señor'));
// console.log(
// 	exports
// 		.getBook(27)
// 		.get(2)
// 		.getRange('44-45')
// );
