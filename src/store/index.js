import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userList: [],
    messageObj: {},
    currentUser: {},
    myInfo: {}
  },
  getters: {
    currentMessageList: (state) => {
      return state.messageObj[state.currentUser.id]
    }
  },
  mutations: {
    updateCurrentUser (state, user) {
      state.currentUser = user
    },
    receiveMessage (state, {userId, msg}) {
      if (state.messageObj[userId]) {
        state.messageObj[userId].push(msg)
      } else {
        Vue.set(state.messageObj, userId, [])
        state.messageObj[userId].push(msg)
      }
    },
    updateMyInfo (state, user) {
      state.myInfo = user
    },
    updateUserList (state, userList) {
      state.userList = userList.filter(user => {
        return user.id !== state.myInfo.id
      })
    }
  },
  actions: {}
})

export default store
