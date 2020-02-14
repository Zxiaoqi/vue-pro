<template>
    <div class="edituser">
        <van-nav-bar
        title="编辑资料"
        right-text="编辑"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickEdit"
        />
        <van-image
        round
        width="19.444vw"
        height="19.444vw"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <van-cell title="昵称" is-link :value="userData.nickname" />
        <van-cell title="密码" is-link value="******" />
        <van-cell title="性别" is-link :value="gender" />
    </div>
</template>


<script>

export default {
    data(){
        return {
            userData:{
                nickname:'',
                gender:1
            },
            id:''
        }
    },
    methods: {
        onClickLeft(){
            this.$router.push('/person')
        },
        onClickEdit(){
            this.$router.push({path:'/edit',query:{id:this.id}})
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
    },
    computed:{
        gender(){
            if(this.userData.gender===1){
                return '男'
            }else{
                return '女'
            }
        }
    },
    created() {
        this.getUserData()
        // console.log(this.$route); 
    },
}

</script>
    
<style lang="stylus">
.edituser .van-nav-bar__title 
    font-size 3.611vw
    font-weight 600
.edituser .van-image
        position relative
        left 50%
        padding 5.556vw 0
        transform translate(-50%)
</style>