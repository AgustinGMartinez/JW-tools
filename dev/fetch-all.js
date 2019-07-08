const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

function ensureDirectoryExistence(filePath) {
	var dirname = path.dirname(filePath);
	if (fs.existsSync(dirname)) {
		return true;
	}
	ensureDirectoryExistence(dirname);
	fs.mkdirSync(dirname);
}

async function main() {
	try {
		let currentBook = 1,
			currentChapter = 1,
			maxChapters = null,
			maxBooks = 66;

		let generalData = await fetch(
			'https://www.jw.org/es/publicaciones/biblia/bi12/libros/json/data/'
		);
		let parsedGeneralData = await generalData.json();

		maxChapters = parsedGeneralData.editionData.books;

		for (; currentBook <= maxBooks; currentBook++) {
			for (
				;
				currentChapter <= maxChapters[currentBook.toString()].chapterCount;
				currentChapter++
			) {
				console.log(
					'Fetching book ' +
						currentBook +
						', chapter ' +
						currentChapter +
						'/' +
						maxChapters[currentBook.toString()].chapterCount +
						'...'
				);
				const parsedVerseRange =
					currentBook.toString() +
					currentChapter.toString().padStart(3, '0') +
					'001' +
					'-' +
					currentBook.toString() +
					currentChapter.toString().padStart(3, '0') +
					'999'; //1001001 - 1001999 : desde el libro 1, capitulo 1, versiculo 1 a mismo cap verse 999
				let response = await fetch(
					'https://www.jw.org/es/publicaciones/biblia/bi12/libros/json/data/' +
						parsedVerseRange
				);
				let jsonRes = await response.json();
				let verses = jsonRes.ranges[parsedVerseRange].verses.map(verse => {
					return verse.content.replace(/<[^>]*>?/gm, '');
				});
				const formattedVerses = {};
				verses.forEach((verse, index) => {
					formattedVerses[(index + 1).toString()] = verse;
				});
				const filePath =
					'../nwt/' + currentBook + '/' + currentChapter + '.json';
				ensureDirectoryExistence(filePath);
				const currBookNewMemoryAddress = currentBook;
				const currChapNewMemoryAddress = currentChapter;
				fs.writeFile(
					filePath,
					JSON.stringify(formattedVerses, null, 2),
					err => {
						if (err) {
							fs.writeFile('./logs.txt', err + '/n', err => {
								console.log(err);
							});
							console.log(
								'Error while trying to save ' +
									currBookNewMemoryAddress +
									'-' +
									currChapNewMemoryAddress +
									' to a file: ' +
									err
							);
						} else {
							console.log(
								'Successfully saved book ' +
									currBookNewMemoryAddress +
									', chapter ' +
									currChapNewMemoryAddress
							);
						}
					}
				);
			}
			//reset the chapter count before starting next book
			currentChapter = 1;
		}
	} catch (error) {
		console.log(error);
	}
}

main();
