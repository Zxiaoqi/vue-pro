<template>
    <div>
         <div class="closeBtn">
            <span class="iconfont icon-shanchu"></span>
        </div>
        <div class="logo">
            <h1>NEW</h1>
        </div>
        <AuthInput placeholder="昵称" v-model="nickname"></AuthInput>
        <AuthInput placeholder="用户名/手机" v-model="username"
        rules='^.{3,10}$'></AuthInput>
        <AuthInput placeholder="密码" v-model="password" type="password"
        rules="^.{6,8}$"></AuthInput>
        <AuthBtn class="btn" rounded  color="#ca0000"
        @click="onRegister">注册</AuthBtn>
        <AuthBtn class="btn" rounded @click='toLogin'>去登入</AuthBtn>
    </div>
</template>


<script>
import AuthInput from '../components/AuthInput'
import AuthBtn from '../components/AuthButton'

export default {
    components:{
        AuthInput,
        AuthBtn,
    },
    data(){
        return {
            username:'',
            password:'',
            nickname:''
        }
    },
    methods: {
       async onRegister(){
        if(!this.username||!this.password||!this.nickname){
            this.$toast('请输入完整信息')
            return false
        }
        const {data:res} = await this.$http.post('/register',
            {
                username:this.username,
                password:this.password,
                nickname:this.nickname
            })
            // console.log(res);
            if(!res.statusCode){
                this.$toast.success('注册成功')
                setTimeout(() => {
                    this.$router.push('/person',{
                        params:{
                            username:this.username,
                            password:this.password,
                            nickname:this.nickname
                        }
                    })
                }, 1000);
            }else{
                this.$toast('用户已存在');
            }
        },
        toLogin(){
            this.$router.push('/login')
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
    color #fff
</style>