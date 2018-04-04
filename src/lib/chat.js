import io from 'socket.io-client'
import store from '@/store'
import util from './util'

const chat = {}
let socket = null
chat.init = function () {
  socket = io.connect('localhost:9000')

  // 初始化数据
  socket.on('init data', ({userList, myInfo}) => {
    store.commit('updateMyInfo', myInfo)
    store.commit('updateUserList', userList)
  })

  // 新成员上线
  socket.on('userList change', (userList) => {
    store.commit('updateUserList', userList)
  })

  // 收到新消息
  socket.on('new message', (msg) => {
    util.receiveMessage(msg)
  })

  // 收到我发送的消息
  socket.on('my message', (msg) => {
    util.returnMyMessage(msg)
  })
}

chat.sendMessage = function (msg) {
  socket.emit('send message', msg)
}

export default chat
