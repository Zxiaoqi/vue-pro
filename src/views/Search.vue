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
                @search="onSearch">
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>
        <van-panel title="历史记录" v-if="oldValue.length!==0">
            <div class="searchTitle" v-for="(item,i) in oldValue" :key="i"
            @click="toDetail(item.id)">{{item.title}}</div>
        </van-panel>
        <van-panel title="热门搜索" v-else-if="recomSearch.length!==0">
            <div class="searchTitle" v-for='(item,i) of recomSearch' :key="i"
            @click="toDetail(item.id)">{{item.title}}</div>
        </van-panel>
    </div>
</template>


<script>

export default {
    data() {
        return {
            value:'',
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
        onSearch(){
            if(this.value.trim().length!=0){
                this.pageIndex ++
                this.$http.get('/post_search',
                {params:{
                    keyword:this.value,
                    pageIndex:this.pageIndex,
                    pageSize:2
                }}).then(res=>{
                    // console.log(res);
                    const {data}=res.data
                    if(data.length!=0){
                        this.oldValue=[...this.oldValue,...data]
                        localStorage.setItem('oldSearch',JSON.stringify(this.oldValue))
                    }
                })
            }
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
        const oldSearch=JSON.parse(localStorage.getItem('oldSearch'))
        if(oldSearch){
            this.oldValue=oldSearch
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
        div.searchTitle
            padding 1.667vw 4.444vw
            color #666
            font-size 3.611vw
            white-space nowrap
            text-overflow ellipsis 
            overflow hidden
            box-shadow 0 0 1px 0 #ccc inset
            &:active
                filter brightness(130%)
</style>