const getBook = require('./index').getBook;
const search = require('./index').search;

describe('bible search', function() {
	it('searches a single word', function() {
		expect(search('desleales')).toEqual([
			{
				map: '55-3-2',
				readble: '2 Timoteo 3:2',
				value:
					'2  Porque los hombres serán amadores de sí mismos, amadores del dinero, presumidos, altivos, blasfemos, desobedientes a los padres, desagradecidos, desleales,',
			},
		]);
	});

	it('searches without accents', function() {
		expect(search('jehova', undefined, 1)).toEqual([
			{
				value:
					'4  Esta es una historia de los cielos y la tierra en el tiempo en ' +
					'que fueron creados, en el día que Jehová Dios hizo tierra y cielo.\r' +
					'\n',
				readble: 'Génesis 2:4',
				map: '1-2-4',
			},
		]);
	});

	it('searches through at least 2 verses', function() {
		expect(search('indefinidos puesto que')).toEqual([
			{
				value:
					'44  ”Y en los días de aquellos reyes el Dios del cielo establecerá un ' +
					'reino que nunca será reducido a ruinas. Y el reino mismo no será pasado ' +
					'a ningún otro pueblo. Triturará y pondrá fin a todos estos reinos, y él ' +
					'mismo subsistirá hasta tiempos indefinidos;45  puesto que contemplaste ' +
					'que de la montaña una piedra fue cortada, no por manos, y [que] trituró ' +
					'el hierro, el cobre, el barro moldeado, la plata y el oro. El magnífico ' +
					'Dios mismo ha hecho saber al rey lo que ha de ocurrir después de esto. Y ' +
					'el sueño es confiable, y la interpretación de él es digna de confianza”.\r' +
					'\n',
				readble: 'Daniel 2:44, 45',
				map: '27-2-44:45',
			},
			{
				value:
					'21  Inmediatamente Daniel mismo habló hasta con el rey: “Oh rey, ' +
					'sigue viviendo aun hasta tiempos indefinidos.22  Mi propio Dios ' +
					'envió a su ángel y cerró la boca de los leones, y no me han ' +
					'arruinado, puesto que delante de él se halló inocencia misma en ' +
					'mí; y también delante de ti, oh rey, ningún acto nocivo he ' +
					'hecho”.\r' +
					'\n',
				readble: 'Daniel 6:21, 22',
				map: '27-6-21:22',
			},
		]);
	});

	it('searches ignoring double spaces, commas and other non-word characters', function() {
		expect(search('amadores  del dinero presumidos')).toEqual([
			{
				value:
					'2  Porque los hombres serán amadores de sí mismos, ' +
					'amadores del dinero, presumidos, altivos, blasfemos, ' +
					'desobedientes a los padres, desagradecidos, ' +
					'desleales,',
				readble: '2 Timoteo 3:2',
				map: '55-3-2',
			},
		]);
	});

	it('searches with filters', function() {
		expect(search('dios', ['juda', 64])).toEqual([
			{
				value:
					'6  que han dado testimonio de tu amor delante de la congregación. A ' +
					'estos tendrás la bondad de poner en camino de una manera digna de ' +
					'Dios.',
				readble: '3 Juan 1:6',
				map: '64-1-6',
			},
			{
				value:
					'11  Amado, no seas imitador de lo que es malo, ' +
					'sino de lo que es bueno. El que hace el bien se ' +
					'origina de Dios. El que hace el mal no ha visto a ' +
					'Dios.',
				readble: '3 Juan 1:11',
				map: '64-1-11',
			},
			{
				value:
					'1  Judas, esclavo de Jesucristo, pero hermano de ' +
					'Santiago, a los llamados que son amados en relación ' +
					'con Dios [el] Padre y conservados para Jesucristo:',
				readble: 'Judas 1:1',
				map: '65-1-1',
			},
			{
				value:
					'4  Mi razón es que se han metido disimuladamente ciertos ' +
					'hombres que desde hace mucho han estado señalados por las ' +
					'Escrituras a este juicio, hombres impíos, que tornan la bondad ' +
					'inmerecida de nuestro Dios en una excusa para conducta ' +
					'relajada, y que demuestran ser falsos a nuestro único Dueño y ' +
					'Señor, Jesucristo.\r' +
					'\n',
				readble: 'Judas 1:4',
				map: '65-1-4',
			},
			{
				value:
					'21  manténganse en el amor de Dios, mientras esperan la ' +
					'misericordia de nuestro Señor Jesucristo con vida eterna en ' +
					'mira.',
				readble: 'Judas 1:21',
				map: '65-1-21',
			},
			{
				value:
					'25  a[l] único Dios nuestro Salvador mediante Jesucristo ' +
					'nuestro Señor, sea gloria, majestad, potencia y autoridad por ' +
					'toda la eternidad pasada y ahora y para toda la eternidad. ' +
					'Amén.',
				readble: 'Judas 1:25',
				map: '65-1-25',
			},
		]);
	});

	it('searches with exact order and no order in priorities', function() {
		expect(search('jehova dijo a mi señor', undefined, 5)).toEqual([
			{
				value:
					'44  ‘Jehová dijo a mi Señor: “Siéntate a mi diestra ' +
					'hasta que ponga a tus enemigos debajo de tus pies”’?',
				readble: 'Mateo 22:44',
				map: '40-22-44',
			},
			{
				value:
					'36  Por el espíritu santo David mismo dijo: ‘Jehová dijo a mi Señor: ' +
					'“Siéntate a mi diestra hasta que ponga a tus enemigos debajo de tus ' +
					'pies”’.',
				readble: 'Marcos 12:36',
				map: '41-12-36',
			},
			{
				value:
					'42  Porque David mismo dice en el libro de los ' +
					'Salmos: ‘Jehová dijo a mi Señor: “Siéntate a mi ' +
					'diestra',
				readble: 'Lucas 20:42',
				map: '42-20-42',
			},
			{
				value:
					'34  De hecho, David no ascendió a los cielos, sino que él ' +
					'mismo dice: ‘Jehová dijo a mi Señor: “Siéntate a mi ' +
					'diestra,',
				readble: 'Hechos 2:34',
				map: '44-2-34',
			},
			{
				value:
					'2  A lo que dijo Abrán: “Señor Soberano Jehová, ¿qué ' +
					'me darás, cuando voy quedándome sin hijo y el que ' +
					'poseerá mi casa es un hombre de Damasco, Eliezer?”.',
				readble: 'Génesis 15:2',
				map: '1-15-2',
			},
		]);
	});
});

describe('getter', function() {
	it('gets books correctly with abbreviation', function() {
		expect(
			getBook('dani')
				.get(2)
				.getRange('44-45')
				.trim()
		).toBe(
			'44  ”Y en los días de aquellos reyes el Dios del cielo establecerá un reino que nunca será reducido a ruinas. Y el reino mismo no será pasado a ningún otro pueblo. Triturará y pondrá fin a todos estos reinos, y él mismo subsistirá hasta tiempos indefinidos;45  puesto que contemplaste que de la montaña una piedra fue cortada, no por manos, y [que] trituró el hierro, el cobre, el barro moldeado, la plata y el oro. El magnífico Dios mismo ha hecho saber al rey lo que ha de ocurrir después de esto. Y el sueño es confiable, y la interpretación de él es digna de confianza”.'
		);
	});

	it('gets books correctly with number', function() {
		expect(
			getBook(27)
				.get(2)
				.getRange('44-45')
				.trim()
		).toBe(
			'44  ”Y en los días de aquellos reyes el Dios del cielo establecerá un reino que nunca será reducido a ruinas. Y el reino mismo no será pasado a ningún otro pueblo. Triturará y pondrá fin a todos estos reinos, y él mismo subsistirá hasta tiempos indefinidos;45  puesto que contemplaste que de la montaña una piedra fue cortada, no por manos, y [que] trituró el hierro, el cobre, el barro moldeado, la plata y el oro. El magnífico Dios mismo ha hecho saber al rey lo que ha de ocurrir después de esto. Y el sueño es confiable, y la interpretación de él es digna de confianza”.'
		);
	});
});
