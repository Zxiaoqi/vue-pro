<template>
    <div>
        <van-nav-bar
        left-arrow
        fixed
        left-text="NEW"
        @click-left="onClickLeft">
            <button v-show="!artContent.has_follow" slot="right" :style="{backgroundColor:'red',color:'#fff'}"
            @click="focusUser"
            >{{btnFocus}}</button>
            <button v-show="artContent.has_follow" slot="right"
            @click="cancelFoucs">已关注</button>
        </van-nav-bar>

        <van-panel :title="artContent.title" :icon="'http://liangwei.tech:3000'+artContent.user.head_img"
        :desc="artContent.user.nickname+' '+artContent.create_date|formatDate">
            <template v-if="artContent.type==2">
                <div class="video-box">
                    <video controls :poster="artContent.cover[0].url">
                        <source src="https://video.pearvideo.com/mp4/adshort/20200219/cont-1632418-14924288_adpkg-ad_hd.mp4" type="video/mp4">
                        <source :src="artContent.content.trim()" type="video/mp4">
                    </video>
                </div>
            </template>
            <template v-if="artContent.content.indexOf('https')=== -1">
                <div v-html="artContent.content"></div>
            </template>
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
                cover:'',
                has_follow:false
            },
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
                if(message==='关注成功'|| message==="已关注"){
                    this.artContent.has_follow=true
                    this.$toast({
                        message:message,
                        duration:500
                    })
                }
            })
        },
        //取消关注
        cancelFoucs(){
            this.$http.get(`/user_unfollow/${this.id}`).then(res=>{
                // console.log(res);
                const {message}=res.data
                if(message==='取消关注成功'){
                    this.artContent.has_follow=false
                    this.$toast({
                        message:message,
                        duration:500
                    })
                }
            })
        },
        getFocusList(){
            this.$http.get('/user_follows').then(res=>{
            // console.log(res);
                const {data}=res.data
                data.map(item=>{
                    if(item.id==this.id){
                        this.isFocus=true
                    }
                })
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
        this.getFocusList()
    }
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
    .van-nav-bar__left
        span.van-nav-bar__text
            color red 
            font-size 4.722vw
            font-weight 600
.van-panel
    margin-top 12.222vw
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
                    color #999
                    .icon-iconfontweixin:before
                        color green
.video-box
    padding 10px
    video
        width 100%
.content
    margin-top 1.389vw
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
.van-panel__header
    .van-cell__left-icon
        align-self flex-end
</style>