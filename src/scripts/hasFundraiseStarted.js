import moment from 'moment'
export default function (startDatetime) {
  let utc = moment.utc(startDatetime)
  let local = moment(utc).local()
  let answer = Date.now() >= moment(local).valueOf()
  // console.log('has fundraise started?', answer)
  return answer
}
