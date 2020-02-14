<template>
    <div>
        <div class="profile">
            <van-image round width="27.5vw" height="19.444vw"
            :src="personData.head_img" fit="cover"/>
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
            is-link to="/person"/>
            <van-cell title="设置"
            is-link to="/person"/>
        </van-cell-group>
    </div>
</template>


<script>

export default {
    data(){
        return {
            personData:{
                head_img: "",
                username: "",
                password: "",
                nickname: "",
                gender: 1,
                create_date: ""
            }
        }
    },
    methods: {
        getPersonData(){
            const id =window.sessionStorage.getItem('user_id')
            this.$http.get(`/user/${id}`).then(res=>{
                // console.log(res);
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
    .van-image
        margin 2.778vw 0 2.778vw 8.333vw
.icon-xingbienan:before 
    color blue
    margin-right 1.389vw
</style>