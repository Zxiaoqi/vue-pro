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
        <AuthBtn class="btn" rounded @click='toRegister'>去注册</AuthBtn>
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
        onLogin(){
            if(!this.username||!this.password){
                this.$toast('请输入完整信息')
                return false
            }
            this.$http.post('/login',
            {username:this.username,
            password:this.password}).then(res=>{
                const {data,message}=res.data
                // console.log(res);
                if(message!=="登录成功"){
                    this.$notify({
                        message:'登入失败',
                        type:'danger',
                        duration:1000
                    });
                    return false
                }
                this.$toast.success('登录成功')
                setTimeout(() => {
                    window.sessionStorage.setItem('token',data.token)
                    window.sessionStorage.setItem('user_id',data.user.id)
                    this.$router.push('/person')
                }, 1000);
            }).catch(err=>{
                this.$toast.fail(err.response.data.message)
            })
        },
        toRegister(){
            this.$router.push('/register')
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
    button::first-child
        box-shadow  0px 0px 3px 1px red

</style>