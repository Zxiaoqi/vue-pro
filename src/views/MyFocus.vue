<template>
    <div class="myfocus">
        <van-nav-bar
        title="我的关注"
        left-arrow
        @click-left="onClickLeft"
        />
        <div v-if="User_follwsList.length!==0">
            <div class="watchlist"
            v-for="(item,i) of User_follwsList" :key="i">
                <van-image
                round
                width="13.611vw"
                height="11.111vw"
                :src="'http://liangwei.tech:3000'+item.head_img"/>
                <van-cell center :title="item.nickname"
                :label=item.create_date|formatDate>
                    <van-button round size="small" @click='unfollow(item.id)'>
                        取消关注</van-button>
                </van-cell>
            </div>
        </div>
        <div v-else class="notCollect">
            还没有关注
        </div>
        
    </div>
</template>


<script>

export default {
    data(){
        return {
            User_follwsList:[]
        }
    },
    methods: {
        onClickLeft(){
            this.$router.replace('/person')
        },
        //获取关注列表
        getUser_follws(){
            this.$http.get('/user_follows').then(res=>{
                // console.log(res);
                const {data}=res.data
                if(!res.statusCode){
                    this.User_follwsList=data
                }
            }).catch(()=>{
                this.$toast.fail('系统错误')
            })
        },
        //取消关注
        unfollow(id){
            this.$http.get(`/user_unfollow/${id}`).then(res=>{
                if(!res.data.statusCode)
                this.$toast.success('取消关注成功')
                this.getUser_follws()
            })
        }
    },
    filters:{
        formatDate(create_date){
            return create_date.split('T')[0]
        },
    },
    created() {
        this.getUser_follws()
    },
}

</script>
    
<style lang="stylus">
.myfocus .van-nav-bar__title 
    font-size 3.611vw
    font-weight 600
.watchlist
    padding 2.778vw 1.389vw
    display flex 
    align-items center
    .van-image
        margin 1.389vw 0 1.389vw 4.167vw
    .van-cell__title
        span 
            font-size 3.889vw
    .van-button
        // border 0
        background-color #99999933
.notCollect
    padding 2.778vw
    font-size 3.333vw
    color #777
    text-align center
</style>