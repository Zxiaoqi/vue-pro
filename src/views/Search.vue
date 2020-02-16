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
        <van-panel title="历史记录">
            <p>内容</p>
        </van-panel>
        <van-panel title="热门搜索" v-if="recomSearch.length!==0">
            <div v-for='(item,i) of recomSearch' :key="i">
                <p>内容</p>
            </div>
        </van-panel>
    </div>
</template>


<script>

export default {
    data() {
        return {
            value:'',
            recomSearch:[]
        }
    },
    methods: {
        onSearch(){
            this.$http.get('/post_search',
            {query:{keyword:this.value}}).then(res=>{
                console.log(res);
            })
        },
        recommendSearch(){
            this.$http.get('/post_search_recommend',
            {query:{keyword:this.value}}).then(res=>{
                // console.log(res);
                const {data,statusCode}=res.data
                if(!statusCode){
                    this.recomSearch=data
                }
            })
        },
        quitSearch(){
            this.$router.replace('/index')
        }
    },
    created() {
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
        p
            padding 1.389vw 5.556vw
            color #666
            font-size 3.889vw
</style>