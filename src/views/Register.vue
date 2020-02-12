<template>
    <div>
         <div class="closeBtn">
            <span class="iconfont icon-shanchu"></span>
        </div>
        <div class="logo">
            <h1>NEW</h1>
        </div>
        <AuthInput placeholder="昵称" v-model="nickname"></AuthInput>
        <AuthInput placeholder="用户名/手机" v-model="username"></AuthInput>
        <AuthInput placeholder="密码" v-model="password" type="password"></AuthInput>
        <div class="btn">
            <button @click='onRegister'>注册</button>
        </div>
    </div>
</template>


<script>
import AuthInput from '../components/AuthInput'

export default {
    components:{
        AuthInput
    },
    data(){
        return {
            username:'',
            password:'',
            nickname:''
        }
    },
    methods: {
        onRegister(){
            this.$http.post('/register',
            {
                username:this.username,
                password:this.password,
                nickname:this.nickname
            })
        }
    },
}

</script>
    
<style lang="stylus">
.closeBtn
    margin:2.778vw
    span
        font-size: 30px
.logo
    h1
        margin:11.111vw 0
        font-size:11.111vw
        text-align :center
        color:#ca0000
.btn
    margin-top 5.556vw
    padding 5.556vw
    text-align center
    button 
        height 11.111vw
        width 80%
        background-color #ca0000
        color #fff
        font-size 5vw
        border 0
        border-radius 5.556vw
</style>