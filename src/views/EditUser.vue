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
        :src="'http://liangwei.tech:3000'+userData.head_img"
        @click='onClickEdit'/>
        <van-cell title="昵称" @click='onClickEdit' is-link :value="userData.nickname" />
        <van-cell title="密码" @click='onClickEdit' is-link value="******" />
        <van-cell title="性别" @click='onClickEdit' is-link :value="gender" />
    </div>
</template>


<script>

export default {
    data(){
        return {
            userData:{
                head_img:'/uploads/image/IMG1568705287936.jpeg',
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
       async getUserData(){
            this.id =this.$route.query.id
            const {data:res} = await this.$http.get(`/user/${this.id}`)
                // console.log(res);
            const {data}=res
            if(!data.head_img){
                data.head_img='/uploads/image/IMG1568705287936.jpeg'
            }
            if(!res.data.statusCode){
                this.userData=data
            }
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
    }
}

</script>
    
<style lang="stylus">
.edituser
    .van-nav-bar__title 
        font-size 3.611vw
        font-weight 600
.edituser .van-image
        position relative
        left 50%
        margin 5.556vw 0
        transform translate(-50%)
</style>