<style lang="stylus">
@import '~@/theme/theme.styl'

ul, li
  list-style none
.c-contact-wrapper
  padding 20px 0
.c-contact
  background #ffffff
  box-shadow 1px 2px 6px rgba(0,0,0,.2)
  border-radius 5px
  .contact-header
    padding 10px
    text-align center
    font-size 16px
  .contact-item
    border-top 1px solid border-color-base
    border-bottom 1px solid border-color-base
    padding 5px 10px
    cursor pointer
    &.active
      background #f1f1f1
</style>

<template lang="pug">
  .c-contact
    .c-contact-wrapper
      .contact-header
        Avatar(:src="myInfo.avatar" size="large")
        .my-name {{myInfo.name}}
      ul.contact-list
        li.contact-item(v-for="(user, index) in userList" @click="contactClick(user)" :class="{active:user.id===currentUser.id}")
          Avatar(:src="user.avatar")
          span.name {{user.name}}
</template>

<script>
export default {
  name: 'contact',
  props: {
    userList: {
      type: Array
    },
    currentUser: {},
    myInfo: {}
  },
  data () {
    return {
      currentUserId: null
    }
  },
  methods: {
    contactClick (user) {
      this.$store.commit('updateCurrentUser', user)
    }
  }
}
</script>
