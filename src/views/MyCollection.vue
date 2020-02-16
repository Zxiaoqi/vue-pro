<template>
    <div>
        <div class="mycollect">
            <van-nav-bar
            title="我的收藏"
            left-arrow
            @click-left="onClickLeft"
            />
            <div class="content" v-if="articleList.lenght!==0">
                <div class="collection" v-for="(item,i) in articleList" :key="i">
                    <p>{{item.title}}</p>
                    <div class="clearfix" v-if="item.cover">
                        <van-image
                        width="30.833vw"
                        height="22.222vw"
                        fit="cover"
                        v-for="(item1,j) in item.cover" :key="j"
                        :src="item1.url"
                        />
                    </div>
                    <div class="user">
                        <span>{{item.user.nickname}}</span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div v-else>还没有收藏</div>
        </div>
    </div>
</template>


<script>

export default {
    data(){
        return {
            articleList:[]
        }
    },
    methods: {
        getArticleList(){
            this.$http.get('/user_star').then(res=>{
                // console.log(res);
                const {statusCode,data}=res.data
                if(!statusCode){
                    this.articleList=data
                }
            }).catch(()=>{
                this.$toast('错误')
            })
        },
        onClickLeft(){
            this.$router.push({path:'/person',query:{id:window.sessionStorage.getItem('user_id')}})
        },
    },
    created() {
        this.getArticleList()
    },
}

</script>
    
<style lang="stylus">
.mycollect .van-nav-bar__title 
    font-size 3.611vw
    font-weight 600
.content
    padding 10px 10px
    .collection
        width 100%
        padding 10px 0
        border-bottom 1px solid #eee
        .van-image
            float left
            padding-right  1px 
        p
            font-size 4.167vw
            padding 3px 0
        span
            font-size 3.611vw
            color #888
</style>