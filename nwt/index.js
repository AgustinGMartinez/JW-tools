const cleanText = require('./utils').cleanText
const cleanTextAndVerseNumber = require('./utils').cleanTextAndVerseNumber
const booksToNumbers = require('./utils').booksToNumbers
const all = require('./all')
const bible = new Map()

// initialize the bible Map
Object.keys(all).forEach(function(bookNumber) {
	Object.keys(all[bookNumber]).forEach(function(chapterNumber) {
		let content = all[bookNumber][chapterNumber]

		const entries = Object.entries(content).map(entry => [
			Number(entry[0]),
			entry[1],
		])

		content = new Map(entries)
		content.getRange = function(string) {
			const [from, to] = string.split('-')
			let result = ''
			for (let i = 0; i <= to - from; i++) {
				let verse = i + Number(from)
				if (verse > this.size) break
				result += this.get(verse) || ''
			}
			return result
		}

		content.getRangeMap = function(string) {
			const [from, to] = string.split('-')
			let result = new Map()
			for (let i = 0; i <= to - from; i++) {
				let verse = i + Number(from)
				if (verse > this.size) break
				result.set(verse, this.get(verse))
			}
			return result
		}

		if (!(bible.get(Number(bookNumber)) instanceof Map)) {
			bible.set(Number(bookNumber), new Map())
		}
		const book = bible.get(Number(bookNumber))

		book.set(Number(chapterNumber.replace(/.json/g, '')), content)

		bible.set(Number(bookNumber), book)
	})
})

bible.search = function(phrase, books = null, MAX_RESULTS = 10) {
	// console.time('search');
	if (phrase.trim() === '') return { results: [], total: 0 }
	const found = []
	const foundPriority2 = [] // if found with unmatched order in 1 verse
	const foundPriority3 = [] // if found with unmatched order in 2 verses
	// const getFoundCount = () => found.length;
	// let breakAll = false;
	books = books && booksToNumbers(books, abbreviations)
	// iterate the books
	for (let i = 1; i <= this.size; i++) {
		let currentBook = this.get(i)
		//apply book filters
		if (books && !(books.indexOf(i) > -1)) continue
		// iterate the chapthers of the book
		for (let j = 1; j <= currentBook.size; j++) {
			let currentChapter = currentBook.get(j)
			let previousVerse = {
				// we will look into 2 verses max at the same time
				clean: '',
				regular: '',
				verseNumber: 0,
				typeOfMatch: '', // 1, 2 or 3. 1 should be used though
			}
			// iterate all verses
			for (let k = 1; k <= currentChapter.size; k++) {
				let content = currentChapter.get(k)

				// look match on this verse, with order
				let cleanContent = cleanTextAndVerseNumber(content)
				phrase = cleanText(phrase)
				let regex
				const phraseWords = phrase.trim().split(' ')
				if (phraseWords.length > 1) {
					regex = new RegExp(phrase, 'i')
				} else {
					regex = new RegExp('\\b' + phrase + '\\b', 'i')
				}
				let matchesWithPriority = regex.test(cleanContent)

				let matchesPriority2, matchesPriority3

				if (matchesWithPriority) {
					found.push({
						value: content,
						readble: bookNames[i - 1] + ' ' + j + ':' + k,
						map: i + '-' + j + '-' + k,
					})
					// if previous verse had a match and it was and priority 2 or 3 one, then pop it to, basically, replace it with this one
					if (previousVerse.typeOfMatch) {
						if (previousVerse.typeOfMatch === 'matchesPriority2') {
							foundPriority2.pop()
						} else if (previousVerse.typeOfMatch === 'matchesPriority3') {
							foundPriority3.pop()
						}
					}
				} else {
					// look match on the previous verse and this one concatenated
					// with order
					let conc = previousVerse.clean + cleanContent
					matchesWithPriority = regex.test(conc)
					if (matchesWithPriority) {
						found.push({
							value: previousVerse.regular + '  ' + content,
							readble: bookNames[i - 1] + ' ' + j + ':' + (k - 1) + ', ' + k,
							map: i + '-' + j + '-' + (k - 1) + ':' + k,
						})
						// if previous verse had a match and it was and priority 2 or 3 one, then pop it to, basically, replace it with this one
						if (previousVerse.typeOfMatch) {
							if (previousVerse.typeOfMatch === 'matchesPriority2') {
								foundPriority2.pop()
							} else if (previousVerse.typeOfMatch === 'matchesPriority3') {
								foundPriority3.pop()
							}
						}
					} else {
						// check match without keeping order (in 1 verse)
						let regexs = phrase
							.trim()
							.split(' ')
							.map(w => new RegExp('\\b' + cleanText(w) + '\\b', 'i'))
						matchesPriority2 = regexs.every(regex => regex.test(cleanContent))

						if (matchesPriority2) {
							foundPriority2.push({
								value: content,
								readble: bookNames[i - 1] + ' ' + j + ':' + k,
								map: i + '-' + j + '-' + k,
							})
						} else {
							// look match on the previous verse and this one concatenated
							// without order

							// if previous verse was a match without order, this will be a match too, let's prevent that
							if (previousVerse.typeOfMatch !== 'matchesPriority2') {
								matchesPriority3 = regexs.every(regex => regex.test(conc))
								if (matchesPriority3) {
									foundPriority3.push({
										value: previousVerse.regular + '  ' + content,
										readble:
											bookNames[i - 1] + ' ' + j + ':' + (k - 1) + ', ' + k,
										map: i + '-' + j + '-' + (k - 1) + ':' + k,
									})
								}
							}
						}
					}
				}

				// reset so we don't get duplicates for priorities
				if (matchesWithPriority) {
					previousVerse.clean = ''
					previousVerse.regular = ''
					previousVerse.verseNumber = 0
					previousVerse.typeOfMatch = ''
				} else {
					// else keep trying to find a concatenable match
					previousVerse.clean = cleanContent
					previousVerse.regular = content
					previousVerse.verseNumber = k
					previousVerse.typeOfMatch = matchesPriority2
						? 'matchesPriority2'
						: matchesPriority3
						? 'matchesPriority3'
						: ''
				}
				// ironicamente lo hace mas lento mayormente
				// if (getFoundCount() >= MAX_RESULTS) breakAll = true;
				// if (breakAll) break;
			}
			// if (breakAll) break;
		}
		// if (breakAll) break;
	}
	// console.timeEnd('search');
	const results = found
		.concat(foundPriority2)
		.concat(foundPriority3)
		.slice(0, MAX_RESULTS)
	return {
		results,
		total: results.length,
	}
}

const abbreviations = [
	'gene',
	'exod',
	'levi',
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
]

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
]

const displayAbbreviations = [
	'Gé',
	'Éx',
	'Le',
	'Nú',
	'Dt',
	'Jos',
	'Jue',
	'Rut',
	'1Sa',
	'2Sa',
	'1Re',
	'2Re',
	'1Cr',
	'2Cr',
	'Esd',
	'Ne',
	'Est',
	'Job',
	'Sl',
	'Pr',
	'Ec',
	'Can',
	'Isa',
	'Jer',
	'Lam',
	'Eze',
	'Da',
	'Os',
	'Joe',
	'Am',
	'Abd',
	'Jon',
	'Miq',
	'Na',
	'Hab',
	'Sof',
	'Ag',
	'Zac',
	'Mal',
	'Mt',
	'Mr',
	'Lu',
	'Jn',
	'Hch',
	'Ro',
	'1Co',
	'2Co',
	'Gál',
	'Ef',
	'Flp',
	'Col',
	'1Te',
	'2Te',
	'1Ti',
	'2Ti',
	'Tit',
	'Flm',
	'Heb',
	'Snt',
	'1Pe',
	'2Pe',
	'1Jn',
	'2Jn',
	'3Jn',
	'Ju',
	'Rev',
]

exports.getBook = function(numberOrAbbr) {
	if (!isNaN(Number(numberOrAbbr))) {
		// is number
		return bible.get(Number(numberOrAbbr))
	} else {
		// is abbreviation
		return bible.get(abbreviations.indexOf(numberOrAbbr) + 1)
	}
}

exports.search = bible.search.bind(bible)

exports.getDisplayAbbr = function(numberOrAbbr) {
	if (!isNaN(Number(numberOrAbbr))) {
		// is number
		return displayAbbreviations[Number(numberOrAbbr) - 1]
	} else {
		// is abbreviation
		return displayAbbreviations[abbreviations.indexOf(numberOrAbbr)]
	}
}

exports.getBookDisplayName = function(numberOrAbbr) {
	if (!isNaN(Number(numberOrAbbr))) {
		// is number
		return bookNames[Number(numberOrAbbr) - 1]
	} else {
		// is abbreviation
		return bookNames[abbreviations.indexOf(numberOrAbbr)]
	}
}

exports.getPrettyName = function(abbr) {
	const [book, chapter, verses] = abbr.split('-')
	let prettyBook = exports.getBookDisplayName(book)
	let prettyChapter = chapter
	let prettyVerses = verses.split(':').join('-')
	return prettyBook + ' ' + prettyChapter + ':' + prettyVerses
}

// console.log(exports.getPrettyName('2tim-3-1:5'))
// console.log(exports.getPrettyName('65-1-3'))

// console.log(exports.getDisplayAbbr(5));
// console.log(exports.getDisplayAbbr('file'));

// console.log(exports.search('jah', undefined, 3));
// console.log(
// 	exports
// 		.getBook('salm')
// 		.get(48)
// 		.get(14)
// );
