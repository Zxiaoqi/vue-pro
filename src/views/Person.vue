<template>
    <div>
        <div class="profile">
            <img v-if="personData.head_img"
                :src="'http://liangwei.tech:3000'+personData.head_img" alt="">
            <img v-else src="@/assets/logo.png">
            <van-cell :class="'iconfont'+' '+filterGender"
            :title="personData.nickname"
            :label=personData.create_date|formatDate
            is-link @click="toEditUser"></van-cell>
        </div>
        <van-cell-group>
            <van-cell title="我的关注" value="关注的用户"
            is-link to="/myfocus"/>
            <van-cell title="我的跟帖" value="跟帖/回复"
            is-link to="/person"/>
            <van-cell title="我的收藏" value="文章/视频"
            is-link to="/collection"/>
            <van-cell title="设置"
            is-link to="/person"/>
        </van-cell-group>
        <Button class="btn" color="red" @click="quit">退出</Button>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" to="/index">标签</van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar>
    </div>
</template>


<script>
import Button from '../components/AuthButton'
export default {
    components:{
        Button
    },
    data(){
        return {
            personData:{
                head_img: "",
                username: "",
                password: "",
                nickname: "",
                gender: 1,
                create_date: ""
            },
            active:3
        }
    },
    methods: {
        getPersonData(){
            const id =window.sessionStorage.getItem('user_id')
            this.$http.get(`/user/${id}`).then(res=>{
                console.log(res);
                const {data}=res.data
                if(!res.statusCode){
                    this.personData=data
                }
            }).catch(()=>{
                this.$toast.fail('系统错误')
            })
        },
        toEditUser(){
            this.$router.push({path:'/edituser',
            query:{id:this.personData.id}})
        },
        quit(){
            window.sessionStorage.clear()
            this.$router.replace('/login')
        }
    },
    computed:{
        filterGender(){
            if(this.personData.gender===1){
                return 'icon-xingbienan'
            }else{
                return 'icon-xingbienv'
            }
        }
    },
    filters:{
        formatDate(create_date){
            return create_date.split('T')[0]
        },
    },
    created() {
        this.getPersonData()
    },
}

</script>
    
<style lang="stylus">
.profile
    padding 5.556vw 0 
    display flex
    align-items center
    border-bottom 1.389vw solid #cecece
    .van-cell__right-icon 
        height: 12.5vw
        line-height: 12.5vw
    img
        display block
        margin 2.778vw 0 2.778vw 8.333vw
        border-radius 50%
        width 19.444vw
        height 19.444vw
.icon-xingbienan:before 
    color blue
    margin-right 1.389vw
</style>