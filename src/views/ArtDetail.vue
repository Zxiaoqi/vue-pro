<template>
    <div class="detail">
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
        <review :commentList="commentList" @onreply="onReply"></review>
        <div class="more-review">
            <button @click="moreComment">更多跟帖</button>
        </div>

        <div class="comment-input">
           <div class="comment-box">
                <input type="text" placeholder="写跟贴"
                @focus="showTextarea">
                <van-icon name="chat-o" :info="artContent.comment_length" />
                <van-icon name="star-o" v-if="!artContent.has_star" @click="onStar"/>
                <van-icon name="star" color="#ffeb3b"
                v-else-if="artContent.has_star" @click="onStar"/>
                <van-icon name="ellipsis" />
           </div>
        </div>

        <van-action-sheet v-model="show" title="标题">
            <textarea v-model="textareaVal" rows="3" cols="35" name="" ref="foucsTextarea"></textarea>
            <btn class="btn" rounded small color="red" @click="releaseComment">发送</btn>
        </van-action-sheet>
    </div>
</template>


<script>
import btn from '../components/AuthButton'
import review from '../components/Reviews'
export default {
    components:{
        review,
        btn
    },
    data(){
        return {
            id:'',
            btnFocus:'关注',
            artContent:{
                title:'',
                content:'',
                user:{},
                cover:'',
                has_follow:false,
                has_star:false,
                comment_length:''
            },
            count:1,
            commentList:[],
            show:false,
            textareaVal:'',
            commentId:'',
        }
    },
    methods: {
        //获取文章详情
        getArtDetails(id){
            this.$http.get(`/post/${id}`).then(res=>{
                // console.log(res);
                const {data}=res.data
                this.artContent=data
            })
        },
        //获取文章评论列表
        getCommentList(id){
            this.$http.get(`/post_comment/${id}`).then(res=>{
                // console.log(res);
                const {data}=res.data
                this.commentList=data.slice(0,3)
            })
        },
        //跳转更多跟帖
        moreComment(){
            this.$router.push({path:'/morecomment',query:{id:this.id}})
        },
        onClickLeft(){
            this.$router.replace("/index")
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
        //异步聚焦
        showTextarea(){
            this.show=true
            this.$nextTick(() =>{
                this.$refs.foucsTextarea.focus()
                // console.log(this.$refs.foucsTextarea)
            })
        },
        //回复
        onReply(id){
            this.show=true
            // console.log(id);
            this.commentId=id
        },
        //发布评论
        releaseComment(){
            if(this.textareaVal.trim().length!=0){
                this.$http.post(`/post_comment/${this.id}`,{
                    content:this.textareaVal,
                    parent_id:this.commentId
                }).then(res=>{
                    const {message}=res.data
                    // console.log(res);
                    if(message==='评论发布成功')
                    this.$toast(message)
                    this.show=false
                    this.getCommentList(this.id)
                })
            }
            
        },
        //收藏文章
        onStar(){
            this.$http.get(`/post_star/${this.id}`).then(res=>{
                // console.log(res);
                const {message}=res.data
                if(message==='收藏成功'){
                    this.artContent.has_star=true
                }else{
                    this.artContent.has_star=false
                }
                    this.$toast(message)
            })
        }
    },
    filters:{
        formatDate(time){
            return time.split('T')[0]
        }
    },
    mounted() {
    },
    created() {
        this.id=this.$route.query.id
        if(!this.$route.query.id){
            this.$toast('缺少id')
            return false
        }
        this.getArtDetails(this.id)
        this.getCommentList(this.id)
    }
}

</script>
    
<style lang="stylus">
.detail
    padding-bottom 13.889vw
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
    .more-review
        padding 5.556vw
        text-align center
        button 
            width 19.444vw
            height 8.333vw
            outline 0
            border 1px solid #555
            border-radius 4.167vw 
            font-size 3.611vw
            color #666
    .comment-input
        position fixed
        bottom 0
        background-color #fff
        width 100%
        .comment-box
            padding 2.778vw 3.333vw 
            display flex
            justify-content space-between
            align-content center
        input 
            border 0
            width 52.778vw
            height 8.333vw
            background-color #eee
            border-radius 4.167vw
            box-sizing border-box
            padding 0.833vw 2.778vw
            font-size 3.333vw
        .van-icon
            line-height 8.333vw
            font-size 6.667vw
    .van-action-sheet
        .van-action-sheet__content
            position relative
            padding 10px
            display flex
            textarea
                padding 2.778vw
                resize none 
                background-color #eee
                font-size 3.611vw
                border 0
                border-radius 1.667vw
            .btn
                position absolute
                right 0
                bottom 0
                padding-bottom 2.778vw
</style>