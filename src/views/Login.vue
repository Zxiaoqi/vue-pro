<template>
    <div>
        <div class="closeBtn">
            <span class="iconfont icon-shanchu"></span>
        </div>
        <div class="logo">
            <h1>NEW</h1>
        </div>
        <AuthInput placeholder="用户名/手机" v-model="username"
        rules='^.{3,10}$'></AuthInput>
        <AuthInput placeholder="密码" v-model="password" type="password"
        rules="^.{3,8}$"></AuthInput>
        <AuthBtn class="btn" rounded color="#ca0000"
        @click="onLogin">登入</AuthBtn>
    </div>
</template>


<script>
import AuthInput from '../components/AuthInput'
import AuthBtn from '../components/AuthButton'
export default {
    components:{
        AuthInput,
        AuthBtn
    },
    data(){
        return {
            username:'',
            password:'',
        }
    },
    methods: {
       async onLogin(){
          const {data:res} = await  this.$http.post('/login',
            {username:this.username,
            password:this.password})
            // console.log(res);
            if(res.message!=="登录成功"){
                this.$notify({
                    message:'登入失败',
                    type:'danger',
                    duration:1000
                });
                return false
            }
            window.sessionStorage.setItem('token',res.data.token)
            this.$router.push('/person')
        }
    },
}

</script>
    
<style lang="stylus">
.closeBtn
    margin:2.778vw
    span
        font-size: 8.333vw
.logo
    h1
        margin:11.111vw 0
        font-size:11.111vw
        text-align :center
        color:#ca0000
.btn
    color #fff
</style>