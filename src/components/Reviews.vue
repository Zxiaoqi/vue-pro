<template>
    <div class="comments">
        <van-nav-bar
        title="精彩跟帖"
        left-arrow
        fixed
        @click-left="onClickLeft"
        />
        <!-- 评论展示区 -->
        <div class="comment-content">
            <template v-if="commentList.length>0">
                <div class="comment-box"
                v-for="(item,i) in commentList" :key="i">
                    <div class="review-user">
                        <div class="user-img">
                            <img :src="'http://liangwei.tech:3000'+item.user.head_img">
                        </div>
                        <div class="user-name">
                            <h5>{{item.user.nickname}}</h5>
                            <span>{{item.create_date.split('T')[0]}}</span>
                        </div>
                        <div class="reply-btn">回复</div>
                    </div>
                    <!-- <div class="comments-time">
                        <span class="comment-date">{{item.create_date.split('T')[0]}}</span>
                        <span class="comment-hours">{{item.create_date.split('T')[1].slice(0,5)}}</span>
                    </div> -->
                    <div class="reply">
                        <Parent :parent='item.parent' v-if="item.parent">
                        </Parent>
                        <div class="child-reply">
                            <p>{{item.content}}</p>
                        </div>
                    </div>
                </div>
            </template>
            <div v-else class="notCollect">还没有跟帖！</div>
        </div>
    </div>
</template>


<script>
import Parent from '../components/Parent'
export default {
    components:{
        Parent
    },
    data() {
        return {
            commentList:[]
        }
    },
    methods: {
        onClickLeft(){
            // this.$router.back(-1)
        },
        getUserComments(){
            this.$http.get(`/post_comment/${5}`).then(res=>{
                console.log(res);
                const {data}=res.data
                this.commentList=data
            })
        }
    },
    created() {
        this.getUserComments()
    },
}

</script>
    
<style lang="stylus">
.comments
    .comment-content
        padding-top 11.944vw
        .van-nav-bar__title
            font-size 3.611vw
            font-weight 600
        .comment-box
            padding  0 4.167vw
            border-bottom  1px solid #ccc
            .review-user
                padding-top 2.778vw
                display flex
                justify-content space-between
                align-content center
                .user-img
                    width 16.667vw
                    border-radius 8.333vw
                    overflow hidden
                    img 
                        display block
                        width 100%
                        object-fit cover
                .user-name
                    padding 0 2.778vw
                    width 100%
                    display flex
                    flex-direction column
                    justify-content space-around
                    span 
                        font-size 3.333vw
                        color #ccc
                .reply-btn
                    width 11.111vw
                    font-size 3.611vw
                    color #999
            .reply
                .child-reply
                    padding 2.5vw
                    p
                        font-size 3.889vw
            .original
                padding 1.944vw 0 
                display flex
                justify-content space-between
                color #797979
                font-size 3.611vw
                &:active
                    filter brightness(150%)
                span.link-original
                    overflow hidden
                    white-space nowrap
                    text-overflow: ellipsis
                .van-icon
                    line-height 6.111vw
.notCollect
    padding 2.778vw
    font-size 3.333vw
    color #777
    text-align center
</style>