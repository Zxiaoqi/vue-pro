<template>
    <div>
        <van-nav-bar
        left-arrow
        left-text="NEW"
        @click-left="onClickLeft"
        >
            <template v-if="!isFocus">
                <button slot="right" :style="{backgroundColor:'red',color:'#fff'}"
                @click="focusUser"
                >{{btnFocus}}</button>
            </template>
            <template v-else>
                <button slot="right">已关注</button>
            </template>
                    
            
        </van-nav-bar>

        <van-panel :title="artContent.title"
        :desc="artContent.user.nickname+' '+artContent.create_date|formatDate">
            <div v-html="artContent.content"></div>
            <div slot="footer">
                <van-button size="small"
                @click="addDianZan"><span class="iconfont icon-dianzan"></span>{{count}}</van-button>
                <van-button size="small"><span class="iconfont icon-iconfontweixin"></span>微信</van-button>
            </div>
        </van-panel>
    </div>
</template>


<script>

export default {
    data(){
        return {
            id:'',
            btnFocus:'关注',
            artContent:{
                title:'',
                content:'',
                user:{},
            },
            isFocus:'',
            count:1
        }
    },
    methods: {
        getArtDetails(id){
            this.$http.get(`/post/${id}`).then(res=>{
                // console.log(res);
                const {data}=res.data
                this.artContent=data
            })
        },
        onClickLeft(){
            this.$router.back(-1)
        },
        addDianZan(){
            this.$http.get(`/post_like/${this.id}`).then(res=>{
                // console.log(res.data.message);
                const {message}=res.data
                if(message==="点赞成功"){
                    this.count++
                }else{
                    this.count--
                }
            })
        },
        //关注用户
        focusUser(){
            this.$http.get(`/user_follows/${this.id}`).then(res=>{
                // console.log(res);
                const {message}=res.data
                if(message==='关注成功'){
                    this.isFocus=true
                    this.$toast(message)
                }
            })
        }
    },
    filters:{
        formatDate(time){
            return time.split('T')[0]
        }
    },
    created() {
        this.id=this.$route.query.id
        if(!this.$route.query.id){
            this.$toast('缺少id')
            return false
        }
        this.getArtDetails(this.id)
    },
}

</script>
    
<style lang="stylus">
.van-nav-bar
    button 
        border 0
        width 19.444vw
        height 7.778vw
        line-height 7.778vw
        border-radius 14px
        background-color #ececec
        &:active
            filter brightness(90%)
    span.van-nav-bar__text
        color red 
        font-size 5vw
        font-weight 600
.van-panel
    .van-cell__title
        span 
            font-size 5vw
            font-weight 600
    .van-panel__footer
        div
            display flex
            justify-content space-around
            .van-button
                border-radius 4.167vw
                .van-button__text
                    font-size 3.611vw
                    .icon-iconfontweixin:before
                        color green
.content
    .page
        p 
            font-family: 'Arial Normal', 'Arial';
            font-size 3.889vw
            color #333
            font-weight 400
            line-height: 7.778vw
        .photo
            a 
                display block
                img 
                    width 100%
                span 
                    display block
                    color #000
                    font-size 3.889vw
                    font-weight 600
                    padding 5px 0
        .otitle_editor
            .editor
                color #666
                font-size 4.167vw
                padding 5px 0
</style>