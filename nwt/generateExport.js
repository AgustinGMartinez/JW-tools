const fs = require('fs');
const path = require('path');
let res = 'module.exports = {\n';
for (i = 1; i < 67; i++) {
	const files = fs.readdirSync(
		path.resolve(__dirname, 'content', i.toString())
	);
	const ex =
		'{\n' +
		files
			.map(x => `\t\t"${x.split('.json')[0]}": require("./content/${i}/${x}"),`)
			.join('\n') +
		'\n\t},\n';
	res += "\t'" + i + "' : " + ex;
}
res += '}';
fs.writeFileSync('./all.js', res);
