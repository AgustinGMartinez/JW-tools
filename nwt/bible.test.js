const getBook = require('./index').getBook
const search = require('./index').search
const getDisplayAbbr = require('./index').getDisplayAbbr
const getPrettyName = require('./index').getPrettyName

describe('bible search', function() {
	it('searches a single word', function() {
		expect(search('desleales').results).toMatchSnapshot()
	})

	it('searches without accents', function() {
		expect(search('jehova', undefined, 1).results).toMatchSnapshot()
	})

	it('searches through at least 2 verses', function() {
		expect(search('indefinidos puesto que').results).toMatchSnapshot()
	})

	it('searches ignoring double spaces, commas and other non-word characters', function() {
		expect(search('amadores  del dinero presumidos').results).toMatchSnapshot()
	})

	it('searches with filters', function() {
		expect(search('dios', ['juda', 64]).results).toMatchSnapshot()
	})

	it('searches with exact order and no order in priorities', function() {
		expect(search('asi y dios', undefined, 5).results).toMatchSnapshot()
	})

	it('correctly searches only one word', function() {
		expect(search('jah', undefined, 3).results).toMatchSnapshot()
	})
})

describe('getter', function() {
	it('gets books correctly with abbreviation', function() {
		expect(
			getBook('dani')
				.get(2)
				.getRange('44-45')
				.trim()
		).toMatchSnapshot()
	})

	it('gets books correctly with number', function() {
		expect(
			getBook(27)
				.get(2)
				.getRange('44-45')
				.trim()
		).toMatchSnapshot()
	})

	it('correctly gets a range map', function() {
		expect(
			getBook(27)
				.get(2)
				.getRangeMap('44-45')
		).toMatchSnapshot()
	})

	it('correctly gets display abbreviation by number', function() {
		expect(getDisplayAbbr(5)).toEqual('Dt')
	})

	it('correctly gets display abbreviation by id abbreviation', function() {
		expect(getDisplayAbbr('file')).toEqual('Flm')
	})

	it('correctly gets pretty name from abbreviations', function() {
		expect(getPrettyName('2tim-3-1:5')).toEqual('2 Timoteo 3:1-5')
		expect(getPrettyName('65-1-3')).toEqual('Judas 1:3')
	})
})
