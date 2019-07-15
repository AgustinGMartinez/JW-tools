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
					'mismo subsistirá hasta tiempos indefinidos;  45  puesto que contemplaste ' +
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
					'sigue viviendo aun hasta tiempos indefinidos.  22  Mi propio Dios ' +
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
		expect(search('asi y dios', undefined, 5)).toEqual([
			{
				value:
					'7  Entonces Dios procedió a hacer la expansión y a hacer una ' +
					'división entre las aguas que deberían estar debajo de la ' +
					'expansión y las aguas que deberían estar sobre la expansión. Y ' +
					'llegó a ser así.  8  Y Dios empezó a llamar a la expansión ' +
					'Cielo. Y llegó a haber tarde y llegó a haber mañana, un día ' +
					'segundo.\r' +
					'\n',
				readble: 'Génesis 1:7, 8',
				map: '1-1-7:8',
			},
			{
				value:
					'9  Y Dios pasó a decir: “Que las aguas [que están] debajo de los ' +
					'cielos se reúnan en un mismo lugar y aparezca lo seco”. Y llegó a ' +
					'ser así.  10  Y Dios empezó a llamar a lo seco Tierra, pero a la ' +
					'reunión de aguas llamó Mares. Además, vio Dios que [era] bueno.',
				readble: 'Génesis 1:9, 10',
				map: '1-1-9:10',
			},
			{
				value:
					'15  Y tienen que servir de lumbreras en la expansión de los cielos ' +
					'para brillar sobre la tierra”. Y llegó a ser así.  16  Y Dios procedió ' +
					'a hacer las dos grandes lumbreras, la lumbrera mayor para dominar el ' +
					'día y la lumbrera menor para dominar la noche, y también las ' +
					'estrellas.',
				readble: 'Génesis 1:15, 16',
				map: '1-1-15:16',
			},
			{
				value:
					'24  Y Dios pasó a decir: “Produzca la tierra almas vivientes ' +
					'según sus géneros, animal doméstico y animal moviente y bestia ' +
					'salvaje de la tierra según su género”. Y llegó a ser así.  25  Y ' +
					'Dios procedió a hacer la bestia salvaje de la tierra según su ' +
					'género y el animal doméstico según su género y todo animal ' +
					'moviente del suelo según su género. Y Dios llegó a ver que [era] ' +
					'bueno.\r' +
					'\n',
				readble: 'Génesis 1:24, 25',
				map: '1-1-24:25',
			},
			{
				value:
					'11  Y pasó Dios a decir: “Haga brotar la tierra hierba, vegetación ' +
					'que dé semilla, árboles frutales que lleven fruto según sus ' +
					'géneros, cuya semilla esté en él, sobre la tierra”. Y llegó a ser ' +
					'así.',
				readble: 'Génesis 1:11',
				map: '1-1-11',
			},
		]);
	});

	it('correctly searches only one word', function() {
		expect(search('jah', undefined, 3)).toEqual([
			{
				value:
					' 2  Mi fuerza y [mi] poderío es Jah, puesto que él ' +
					'sirve para mi salvación.Este es mi Dios, y yo lo ' +
					'elogiaré; el Dios de mi padre, y lo enalteceré.\r' +
					'\n',
				readble: 'Éxodo 15:2',
				map: '2-15-2',
			},
			{
				value:
					'16  diciendo: “Por estar una mano contra el trono de Jah, ' +
					'Jehová tendrá guerra con Amaleq de generación en ' +
					'generación”.',
				readble: 'Éxodo 17:16',
				map: '2-17-16',
			},
			{
				value:
					' 4  Canten ustedes a Dios, celebren con melodía su ' +
					'nombre;levanten [una canción] a Aquel que cabalga por las ' +
					'llanuras del desiertocomo Jah, que es su nombre; y estén ' +
					'jubilosos delante de él;',
				readble: 'Salmos 68:4',
				map: '19-68-4',
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

	it('correctly gets a range map', function() {
		expect(
			getBook(27)
				.get(2)
				.getRangeMap('44-45')
		).toEqual(
			new Map([
				[
					44,
					'44  ”Y en los días de aquellos reyes el Dios del cielo ' +
						'establecerá un reino que nunca será reducido a ruinas. Y el reino ' +
						'mismo no será pasado a ningún otro pueblo. Triturará y pondrá fin ' +
						'a todos estos reinos, y él mismo subsistirá hasta tiempos ' +
						'indefinidos;',
				],
				[
					45,
					'45  puesto que contemplaste que de la montaña una piedra fue ' +
						'cortada, no por manos, y [que] trituró el hierro, el cobre, el ' +
						'barro moldeado, la plata y el oro. El magnífico Dios mismo ha ' +
						'hecho saber al rey lo que ha de ocurrir después de esto. Y el ' +
						'sueño es confiable, y la interpretación de él es digna de ' +
						'confianza”.\r' +
						'\n',
				],
			])
		);
	});
});
