import store from '../store'
import chat from './chat'

let util = {}

export default util

util.sendMessage = function (msgText) {
  const msg = new Message(store.state.myInfo.id, store.state.currentUser.id, msgText)
  chat.sendMessage(msg)
}

util.receiveMessage = function (msg) {
  const userId = msg.from
  store.commit('receiveMessage', {userId, msg})
}

util.returnMyMessage = function (msg) {
  const userId = msg.to
  store.commit('receiveMessage', {userId, msg})
}

util.formatTime = function (time) {
  const date = new Date(time)
  let obj = {}
  obj.MM = date.getMonth() + 1
  obj.dd = date.getDate()
  obj.HH = twoDigitString(date.getHours())
  obj.mm = twoDigitString(date.getMinutes())
  obj.ss = twoDigitString(date.getSeconds())
  return `${obj.MM}月${obj.dd}日 ${obj.HH}:${obj.mm}:${obj.ss}`
}

function twoDigitString (num) {
  let string = String(num)
  if (string.length < 2) {
    string = '0' + string
  }
  return string
}

function Message (from, to, text) {
  this.from = from
  this.to = to
  this.time = new Date().getTime()
  this.msg = text
}
