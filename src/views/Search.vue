<template>
    <div class="searchRoot">
        <div class="search">
            <van-icon name="arrow-left" class="arrow"
            @click="quitSearch"/>
            <van-search
                v-model="value"
                show-action
                shape="round"
                left-icon="search"
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @clear="clearVal">
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>
        <div class="search-content">
            <template v-if="!showSearch">
                <van-panel title="历史记录" v-if="keyword.length!==0">
                    <!-- <div class="searchTitle" v-for="(item,i) in oldValue" :key="i"
                    @click="toDetail(item.id)">{{item.title}}</div> -->
                    <van-row type="flex">
                        <van-col span="6" v-for="(item,i) in keyword" :key="i">
                            <van-tag
                            v-if="item"
                            closeable
                            round
                            size="medium"
                            @close="close(i)"
                            @click="getSearch(item)">{{item}}</van-tag>
                        </van-col>
                    </van-row>
                </van-panel>
                <van-panel title="热门搜索" v-if="recomSearch.length!==0">
                    <div class="searchTitle" v-for='(item,i) of recomSearch' :key="i"
                    @click="toDetail(item.id)">{{item.title}}</div>
                </van-panel>
            </template>

            <template v-if="showSearch">
                <Cover :post="item" v-for="(item,i) in oldValue" :key="i"
                @click="toDetail(item.id)">
                    <span>{{item.comment_length}}跟帖</span>
                </Cover>
            </template>
        </div>
    </div>
</template>


<script>
import Cover from '../components/CoverList'
export default {
    components:{
        Cover
    },
    data() {
        return {
            value:'',
            keyword:[],
            showSearch:false,
            oldValue:[],
            recomSearch:[],
            pageIndex:0
        }
    },
    methods: {
        //to文章详情页
        toDetail(id){
            this.$router.push({path:'/artdetail',query:{id:id}})
        },
        getSearch(value,pageIndex=1){
            this.$http.get('/post_search',
                {params:{
                    keyword:value,
                    pageIndex:pageIndex,
                    pageSize:2
                }})
                .then(res=>{
                // console.log(res);
                const {data}=res.data
                this.showSearch=true
                if(data.length!=0){
                    this.oldValue=[...this.oldValue,...data]
                    this.keyword.push(this.value)
                    localStorage.setItem('keyword',JSON.stringify(this.keyword))
                }
            })
        },
        onSearch(){
            if(this.value.trim().length!=0){
                this.pageIndex ++
                this.getSearch(this.value,this.pageIndex)
            }
        },
        //关闭标签
        close(i){
            if(this.keyword.length!==0){
                this.keyword.splice(i,1)
                localStorage.setItem('keyword',JSON.stringify(this.keyword))
            }
        },
        clearVal(){
            this.showSearch=false
        },
        //跳转详情
        toRegister(){
            this.$router.push('/register')
        },
        //推荐搜索
        recommendSearch(){
            this.$http.get('/post_search_recommend',
            {params:{keyword:''}}).then(res=>{
                // console.log(res);
                const {data,statusCode}=res.data
                if(!statusCode){
                    this.recomSearch=data
                }
            })
        },
        //退出搜索
        quitSearch(){
            this.$router.back(-1)
        }
    },
    created() {
        const keyword=JSON.parse(localStorage.getItem('keyword'))||[]
        if(keyword[0]){
            this.keyword=keyword
        }
        this.recommendSearch()
    },
}

</script>
    
<style lang="stylus">
.search
    display flex
    .arrow
        width 11.111vw
        text-align center
        line-height 14.444vw
    .van-search
        width 100%
.searchRoot
    .van-panel
        .van-cell__title
            span
                font-size 3.611vw
        .van-col
            text-align center
        div.searchTitle
            padding 1.667vw 1.389vw
            color #666
            font-size 3.611vw
            white-space nowrap
            text-overflow ellipsis 
            overflow hidden
            box-shadow 0 0 1px 0 #ccc inset
            &:active
                filter brightness(130%)
    .search-content
        padding 0 2.778vw
</style>