<style lang="stylus">
.p-index, .p-index-wrapper
  position relative
  width 100%
  height 100%
.p-index-wrapper
  display flex
  padding 20px
  background #f7f7f7
  .aside
    flex 0 0 auto
    width 20%
  .content
    flex 1
    padding-left 20px
</style>

<template lang="pug">
  .p-index
    .p-index-wrapper
      .aside
        contact(:userList="userList" :currentUser="currentUser" :myInfo="myInfo")
      .content
        message-room(:messageList="currentMessageList" :currentUser="currentUser" :myInfo="myInfo")
</template>

<script>
import Contact from '@/components/contact/contact'
import MessageRoom from '@/components/messageRoom/messageRoom'
import { mapState, mapGetters } from 'vuex'
import chat from '@/lib/chat.js'

export default {
  name: 'index',
  computed: {
    ...mapState({
      userList: 'userList',
      currentUser: 'currentUser',
      myInfo: 'myInfo'
    }),
    ...mapGetters({
      currentMessageList: 'currentMessageList'
    })
  },
  components: {
    Contact, MessageRoom
  },
  mounted () {
    chat.init()
  }
}
</script>
