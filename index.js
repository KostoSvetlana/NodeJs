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
	const dateNow = new Date()
	if (dateNow >= futureDate) {
		emitter.emit('timerDone')
	} else {
		const futureDateFormatted = moment(futureDate, format)
		const currentDateFormatted = moment(dateNow, format)
		const diff = preciseDiff(futureDateFormatted, currentDateFormatted)

		console.log(diff)
	}
}

const timerId = setInterval(() => {
	emitter.emit('timerTick', futureDate)
}, 1009)

const showTimerDone = timerId => {
	clearInterval(timerId)
	console.log('End')
}

emitter.on('timerTick', showRemainingTime)
emitter.on('timerDone', () => {
	showTimerDone(timerId)
})