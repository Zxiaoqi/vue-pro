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
        <van-tabs :style="tabsStyle">
            <van-tab v-for="(index,i) in 5" :title="'标签 ' + index" :key="i">
            </van-tab>
            <!-- <van-tab disabled></van-tab> -->
            <!-- <van-tab class="addCategory"
                @click="toCate" title='plus'>
                <van-icon name="plus" size='5.556vw' />
            </van-tab> -->
        </van-tabs>
        <!-- 内容 -->
        <div class="content" :style="marginTop">
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
        <!-- 底部导航 -->
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/person">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>


<script>

export default {
    data(){
        return {
            active:0,
            articleList:[],
            total:0,
            tabsStyle:'',
            marginTop:''
        }
    },
    methods: {
        onSearch(){
            this.$router.push('/search')
        },
        toCate(){

        },
        getArtList(){
            this.$http.get('/post',
            {query:{category:window.sessionStorage.getItem('user_id')}}).then(res=>{
                // console.log(res);
                const {data,total}=res.data
                if(!res.data.statusCode){
                    this.articleList=data
                    this.total=total
                }
            })
        },
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
        window.addEventListener("scroll", this.tabsTop);
    },
    created() {
        this.getArtList()
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
.content
    padding 0 10px
    .collection
        width 100%
        padding 10px 0
        border-bottom 1px solid #eee
        .van-image
            float left
            padding-right  1px 
        p
            font-size 4.167vw
            padding 5px 0
        span
            display inline-block
            font-size 3.611vw
            color #888
            padding 8px 5px 0 0
.clearfix:after{
  content: "020"; 
  display: block; 
  height: 0; 
  clear: both; 
  visibility: hidden;  
  }
.clearfix {
  /* 触发 hasLayout */ 
  zoom: 1; 
  }
</style>