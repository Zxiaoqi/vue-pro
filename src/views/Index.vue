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
        <van-tabs v-model="activeTab" sticky swipeable>
            <van-tab v-for="(item,i) in cateList" :title="item.name" :key="i">
                <van-list
                v-model="item.loading"
                :finished="item.finished"
                finished-text="没有更多了"
                :immediate-check='false'
                @load="onLoad">
                    <Cover :post="item1" v-for="(item1,i) in item.posts" :key="i"
                    @click="toArtDetail(item1.id)">
                        <span>{{item1.comment_length}}跟帖</span>
                    </Cover>
                </van-list>
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
            activeTab:0,
            cateList:[]
        }
    },
    methods: {
        onLoad(){
            const activeCategory=this.cateList[this.activeTab]
            activeCategory.pageSize ++
            setTimeout(() => {
                this.getArtList()
            }, 1000);
            // console.log(activeCategory.finished);
            
        },
        initCategory(data){
            data.forEach(el=>{
                el.posts=[];
                el.pageIndex=1;
                el.pageSize=5;
                el.loading=false;
                el.finished=false
            })
            return data
        },
        onSearch(){
            this.$router.push('/search')
        },
        toArtDetail(id){
            this.$router.push({path:'/artdetail',query:{id:id}})
        },
        //文章列表id
        getArtList(){
            const activeCategory = this.cateList[this.activeTab]
            // console.log(activeCategory);
            this.$http.get('/post',
            {params:{
                category:activeCategory.id,
                pageIndex:activeCategory.pageIndex,
                pageSize:activeCategory.pageSize
            }}).then(res=>{
                // console.log(res);
                const {data}=res.data
                if(!res.data.statusCode){
                    activeCategory.posts=[...data]
                    activeCategory.loading=false
                    if(data.length < activeCategory.pageSize){
                        activeCategory.finished=true
                    }
                }
            })
        },
        //栏目列表
        getCateList(){
            this.$http.get('/category').then(res=>{
                // console.log(res);
                const {data,statusCode}=res.data
                if(!statusCode){
                    // this.cateList=data
                    this.cateList=this.initCategory(data)
                    this.getArtList()
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
    watch: {
        activeTab(newId){
            const categoryDate=this.cateList[newId]
            // console.log(categoryDate);
            if(categoryDate.posts.length==0){
                this.getArtList()
            }
        }
    },
    mounted() {
        // window.addEventListener("scroll", this.tabsTop);
    },
    created() {
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
        padding-bottom 50px
.van-tabs__content
    padding 0 10px
</style>