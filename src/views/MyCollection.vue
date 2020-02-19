<template>
    <div>
        <div class="mycollect">
            <van-nav-bar
            title="我的收藏"
            left-arrow
            fixed
            @click-left="onClickLeft"
            />
            <div class="content" v-if="articleList.length!==0">
                <div v-for="(item,i) in articleList" :key="i">
                    <Cover :post="item" @click="toArtDetail(item.id)"></Cover>
                </div>
            </div>
            <div v-else class="notCollect">还没有收藏</div>
        </div>
    </div>
</template>


<script>
import Cover from '../components/CoverList'
export default {
    components:{
        Cover
    },
    data(){
        return {
            articleList:[]
        }
    },
    methods: {
        toArtDetail(id){
            this.$router.push({path:'/artdetail',query:{id:id}})
        },
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
            this.$router.back(-1)
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
.notCollect
    padding 2.778vw
    font-size 3.333vw
    color #777
    text-align center
.content
    padding 0 10px
    margin-top 45px
</style>