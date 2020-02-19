<template>
    <div class="index">
        <van-search
        show-action
        shape="round"
        background="red"
        left-icon="search"
        label="NEW"
        input-align="center"
        placeholder="请输入搜索关键词"
        @focus="onSearch"
        >
        <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <van-tabs :style="tabsStyle" v-model="activeTab" sticky
        @click="getArtList(cateList[activeTab].id)">
            <van-tab v-for="(item,i) in cateList" :title="item.name" :key="i">
                <div v-for="(item,i) in articleList" :key="i">
                    <Cover :post="item" @click="toArtDetail(item.id)"></Cover>
                </div> 
            </van-tab>
        </van-tabs>
        <!-- 底部导航 -->
        <van-tabbar v-model="active" fixed>
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/person">个人中心</van-tabbar-item>
        </van-tabbar>
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
            active:0,
            articleList:[],
            tabsStyle:'',
            marginTop:'',
            activeTab:0,
            cateList:[]
        }
    },
    methods: {
        onSearch(){
            this.$router.push('/search')
        },
        toCate(){

        },
        toArtDetail(id){
            this.$router.push({path:'/artdetail',query:{id:id}})
        },
        getArtList(id){
            this.$http.get('/post',
            {params:{
                category:id
            }}).then(res=>{
                console.log(res);
                const {data}=res.data
                if(!res.data.statusCode){
                    this.articleList=data
                }
            })
            this.active=id
        },
        getCateList(){
            this.$http.get('/category').then(res=>{
                // console.log(res);
                const {data,statusCode}=res.data
                if(!statusCode){
                    this.cateList=data
                }
            })
        },
        //定义滚动监听
        tabsTop(){
            let scroll=document.documentElement.scrollTop
            //  console.log(scroll);
            if(scroll>55){
                this.tabsStyle ={
                    position:'fixed',
                    width:100+'%'
                }
                this.marginTop = {
                    marginTop:'55px'
                }
            }else{
                this.tabsStyle={
                    position:'relative',
                }
                this.marginTop = {
                    marginTop:'0'
                }
            }
        }
    },
    mounted() {
        // window.addEventListener("scroll", this.tabsTop);
    },
    created() {
        this.getArtList()
        this.getCateList()
    },
}

</script>
    

<style lang="stylus">
.index 
    height 100%
    .van-search__label
        color red
        font-weight 600
    .van-search__action 
        color #fff
    .van-tabs
        background-color #fff
        top 0
        z-index 999
.van-tabs__content
    padding 0 10px
    // .collection
    //     width 100%
    //     padding 5px 0 10px
    //     .van-image
    //         float left
    //         padding-right  1px 
    //     .title
    //         font-size 4.167vw
    //         font-family 'MicrosoftYaHei'
    //         padding 5px 0
    //         &:active
    //             color #666
    //     .user
    //         span
    //             display inline-block
    //             font-size 3.611vw
    //             color #888
    //             padding 8px 5px 0 0
// .clearfix:after{
//   content: "020"; 
//   display: block; 
//   height: 0; 
//   clear: both; 
//   visibility: hidden;  
//   }
// .clearfix {
//   /* 触发 hasLayout */ 
//   zoom: 1; 
//   }
</style>