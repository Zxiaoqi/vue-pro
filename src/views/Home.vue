<template>
  <div class="home">
    <div class="logo">
        <h1>NEW</h1>
    </div>
    <div class="path">
      <router-link class='tolink' to="/login">去登入页</router-link>
      <router-link class='tolink' to="/register">去注册页</router-link>
      <router-link class='tolink' to="/">首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout(){
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('user_id')
    }
  },
  created() {
    this.logout()
  },
}
</script>
<style lang="stylus">
.logo
    h1
      margin:11.111vw 0
      font-size:11.111vw
      text-align :center
      color:#ca0000
.path
  padding 2.778vw
  display flex
  justify-content center
  align-items center
  flex-wrap wrap
  .tolink
    margin 2.778vw
    padding 1.389vw 5.556vw
    height 5.556vw
    line-height 5.556vw
    color #fff
    background-color #ff3135
    border-radius 1.389vw
    text-align center
</style>
