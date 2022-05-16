import EventEmitter from 'events'
const emitter = new EventEmitter()
import 'moment-precise-range-plugin'
import moment from 'moment'


const [userPastDate] = process.argv.slice(2)
const format = 'YYYY-MM-DD HH'

const getDateFromDateString = dateLine => {
	const newLocal =  dateLine.split('-')
	const [hour, day, month, year] = newLocal
	return new Date(Date.UTC(year, month - 1, day, hour))
}

const futureDate = getDateFromDateString(userPastDate)
const showRemainingTime = futureDate => {
	const nowDate = new Date()
	if (nowDate >= futureDate) {
		emitter.emit('timerDone')
	} else {
		const futureDateFormatted = moment(futureDate, format)
		const currentDateFormatted = moment(nowDate, format)
		
		const odds = preciseDiff(futureDateFormatted, currentDateFormatted)

		console.log(odds)
	}
}

const idTimer = setInterval(() => {
	emitter.emit('timerTick', futureDate)
}, 1009)

const showTimerDone = idTimer => {
	clearInterval(idTimer)
	console.log('End')
}


emitter.on('timerTick', showRemainingTime)
emitter.on('timerDone', () => {
	showTimerDone(idTimer)
})