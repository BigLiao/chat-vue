<style lang="stylus">
@import '~@/theme/theme.styl'

.c-messageRoom
  position relative
  .messageRoom-message
    background #f7f7f7
    padding 10px
    box-shadow 0 0 4px rgba(0,0,0,.4) inset
    height 500px
    overflow-y auto
    // .message-list
//
    .message-item
      margin-bottom 20px
    .message-box
      position relative
      max-width 260px
      padding 10px
      background #ffffff
      border-radius 5px
      border 1px solid border-color-base
      box-shadow 2px 2px 4px rgba(0,0,0,0.1)
    .message-item-wrapper
      display flex
      .message-box
        &:before
          content: ''
          display block
          position absolute
          width 12px
          height 12px
          top 10px
          transform-origin center
          border-bottom 1px solid border-color-base
          border-left 1px solid border-color-base
          background #ffffff
    &.left
      flex-direction row
      .message-box
        margin-left 20px
        &:before
          left -7px
          transform rotate(45deg)
    &.right
      flex-direction row-reverse
      .message-box
        margin-right 20px
        &:before
          right -7px
          transform rotate(225deg)
          box-shadow -3px 1px 3px 0px rgba(0,0,0,.1)
    .message-time
      font-size 12px
      color #a8a8a8
    .message-user
      margin-top 5px
  .messageRoom-input
    margin 40px 0 0
    .button-wrapper
      margin-top 20px
      text-align right
</style>

<template lang="pug">
  .c-messageRoom
    .c-messageRoom-wrapper
      Card
        .messageRoom-header
          |
        .messageRoom-message
          .message-list
            .message-item(v-for="message in messageList")
              //-如果是对方的消息
              .message-item-wrapper(:class="message.from === myInfo.id ? 'right':'left'")
                .message-user
                  Avatar(shape="square" :src="message.from === myInfo.id ? myInfo.avatar : currentUser.avatar")
                .message-box
                  .message-text {{message.msg}}
                  .message-time {{message.time | timeFormat}}
        .messageRoom-input
          Input(type="textarea" placeholder="请输入文字" v-model="inputText" @on-enter="sendMessage")
          .button-wrapper
            Button(type="primary" @click="sendMessage") 发送
</template>

<script>
import util from '@/lib/util'
export default {
  name: 'messageRoom',
  props: {
    currentUser: {
      type: Object
    },
    messageList: {
      type: Array
    },
    myInfo: {
      type: Object
    }
  },
  data () {
    return {
      inputText: ''
    }
  },
  computed: {
    // formatMessageList () {
    //   return messageList.map(message => {
    //     me
    //   })
    // }
  },
  filters: {
    timeFormat (val) {
      if (!val) return ''
      return util.formatTime(val)
    }
  },
  methods: {
    sendMessage () {
      if (this.inputText.length > 0) {
        util.sendMessage(this.inputText)
        this.inputText = ''
      }
    },
    enter () {
      console.log('click enter')
    }
  }
}
</script>
