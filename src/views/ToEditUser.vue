<template>
    <div class="edit">
        <van-nav-bar
        title="编辑资料"
        right-text="保存"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickEdit"
        />
        <van-uploader
        multiple
        v-model="fileList"
        :max-count="1"
        :after-read="afterRead"
        />
        <van-cell-group>
            <van-field v-model="userData.nickname"
            placeholder="请输入昵称" label="昵称"/>
            <van-field v-model="userData.username"
            placeholder="请输入用户名" label="用户名"/>
            <van-field v-model="userData.password" type="password"
            label="密码" placeholder="请输入密码"/>
        </van-cell-group>
        <van-radio-group v-model="userData.gender" class="sexRadio">
            <van-radio :name=1>男</van-radio>
            <van-radio :name=0>女</van-radio>
        </van-radio-group>
    </div>
</template>


<script>
export default {
    data(){
        return {
            userData:{
                head_img: "",
                username: "",
                password: "",
                nickname: "",
                gender: 1
            },
            id:'',
            fileList:[
                { 
                    url: 'https://img.yzcdn.cn/vant/leaf.jpg'
                }
            ]
        }
    },
    methods: {
        onClickLeft(){
            this.$router.push({path:'/edituser',query:{id:this.id}})
        },
        onClickEdit(){
            //本地无法修改
            // console.log(this.userData);
            this.$http.post(`/user_update/${this.id}`,
            {params:this.userData}).then(res=>{
                // console.log(res);
                const {statusCode,message}=res.data
                if(!statusCode){
                    this.$toast.success({
                        message:message,
                        duration:500
                    })
                    setTimeout(() => {
                        this.onClickLeft()
                    }, 500);
                }else{
                    this.$toast.success({
                        message:message,
                        duration:500
                    })
                }
            })
        },
        getUserData(){
            this.id =this.$route.query.id
            this.$http.get(`/user/${this.id}`).then(res=>{
                // console.log(res);
                const {data}=res.data
                if(!res.statusCode){
                    this.userData=data
                }
            }).catch(()=>{
                this.$toast.fail('系统错误')
            })
        },
        afterRead(file) {
            // console.log(file);
            this.userData.head_img = file.file
            // this.$http.post('/upload',{file:file}).then(res=>{
            //     // console.log(res);
            // })
        }
    },
    created() {
        this.getUserData()
        // console.log(this.$route);
    },
}

</script>
    
<style lang="stylus">
.edit .van-nav-bar__title 
    font-size 3.611vw
    font-weight 600
.edit .van-uploader
    padding 5.556vw
    left 50%
    transform translate(-50%)
.sexRadio
    padding 2.778vw 0
    display flex
    justify-content space-around
</style>