// const colors = require('colors');
import colors from 'colors';
// console.log(process.argv);
// const [ name1, name2 ] = process.argv.slice(2);

// const args = process.argv.slice(2);
// console.log(args);
// const [ name1, name2 ] = args;

// const name1 = args[0];
// const name2 = args[1];
// console.log('Hello Node.js to ' + name1 + ' and ' + name2);

//console.log(colors.green('Hello World!'));



let mainCount = 0
let [startMain, endMain] = process.argv.slice(2)
const colorsPallete = [colors.green, colors.yellow, colors.red]

if (!startMain || !endMain) {
	console.log(colors.red('Простых чисел в диапазоне нет...Введите числа вида от 0 до 100'))
} else {
	if (startMain < 2) {
		startMain = 2
	}
for (let i = startMain; i <= endMain; i++) {
	let isMain = true

	for (let j = 2; j < i; j++) {
		if (i % j === 0) {
			isMain  = false
		}
	}

		if (isMain) {
			console.log(colorsPallete[mainCount % 3](i))
			mainCount++
		}
	}

	  if (!mainCount) {
		console.log(colors.red('Простых чисел в диапазоне не было найдено'))
	  }
}
