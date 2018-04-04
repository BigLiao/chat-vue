const app = require('http').createServer()
const io = require('socket.io')(app)
const robot = require('./robot')

const ROOM_NAME = 'lingoup'

// 将数据保存在内存
let userList = []

// 聊天机器人
const robotUser = {
  name: '人工智能',
  id: '$robot',
  avatar: randomAvatar()
}
userList.push(robotUser)

io.on('connection', socket => {
  console.log('connected')
  const newUser = new User(socket) // 生成新用户

  // 返回初始信息
  socket.emit('init data', {
    myInfo: newUser,
    userList: userList
  })

  // 加入房间
  socket.join(ROOM_NAME)
  addNewUser(newUser)
  socket.to(ROOM_NAME).emit('userList change', userList)

  // 传递消息
  socket.on('send message', (msg) => {
    console.log(msg)
    socket.emit('my message', msg)
    if (msg.to === '$robot') {
      sendMessageToRobot(msg, socket)
      return
    }
    socket.to(msg.to).emit('new message', msg)
  })

  // 离线
  socket.on('disconnect', (reason) => {
    removeUser(newUser)
    console.log(newUser.name + ' disconnect')
    console.log(userList)
    socket.to(ROOM_NAME).emit('user offline', newUser)
    socket.to(ROOM_NAME).emit('userList change', userList)
  })
})

app.listen(9000)
console.log('socket listening on 9000...')

// 构造用户
function User (socket) {
  this.name = randomName()
  this.id = socket.id
  this.avatar = randomAvatar()
}

function randomAvatar () {
  const base = 'https://img.wdstatic.cn/imdemo/'
  const index = Math.floor(Math.random() * 21)
  return base + index + '.png'
}

function randomName () {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const lettersAndNumbers = letters + '0123456789'
  const length = Math.floor(Math.random() * 6) + 4
  let result = randomLetter(letters).toUpperCase()
  function randomLetter (string) {
    return string[Math.floor(Math.random() * string.length)]
  }
  for (let i = 0; i < length; i++) {
    result += randomLetter(lettersAndNumbers)
  }
  return result
}

function addNewUser (user) {
  userList.unshift(user)
}
function removeUser (user) {
  let index = null
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id === user.id) {
      index = i
      break
    }
  }
  if (index !== null) {
    userList.splice(index, 1)
  }
}

// 发送消息给聊天机器人
function sendMessageToRobot (msg, socket) {
  robot(msg.from, msg.msg).then(data => {
    const returnText = data.text
    const returnMsg = {
      from: '$robot',
      to: msg.from,
      msg: returnText,
      time: (new Date()).getTime()
    }
    socket.emit('new message', returnMsg)
  })
}
