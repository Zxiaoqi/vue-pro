<template>
    <div class="comments">
        <van-nav-bar
        title="我的跟帖"
        left-arrow
        @click-left="onClickLeft"
        />
        <!-- 评论展示区 -->
        <div class="comment-box" v-for="(item,i) in comments" :key="i">
            <div class="comments-time">
                <span class="comment-date">{{item.create_date.split('T')[0]}}</span>
                <span class="comment-hours">{{item.create_date.split('T')[1].slice(0,5)}}</span>
            </div>
            <div class="reply">
                <template v-if="item.parent" >
                    <div class="reply-box">
                        <div class="reply-user">
                            回复<span>{{item.parent.user.nickname}}</span>
                        </div>
                        <div class="reply-msg">
                            {{item.parent.content}}
                        </div>
                    </div>
                </template>
                <div class="child-reply">
                    <p>{{item.content}}</p>
                </div>
            </div>
            <div class="original">
                <span class="link-original">原文：{{item.post.title}}</span>
                <van-icon name="arrow" />
            </div>
        </div>
    </div>
</template>


<script>

export default {
    data() {
        return {
            comments:[]
        }
    },
    methods: {
        onClickLeft(){

        },
        getUserComments(){
            this.$http.get('/user_comments').then(res=>{
                console.log(res);
                const {data}=res.data
                this.comments=data
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
    .van-nav-bar__title
        font-size 3.611vw
        font-weight 600
    .comment-box
        padding  0 15px
        border-bottom  1px solid #ccc
        .comments-time
            padding-top 10px
            span 
                font-size 3.611vw
                color #797979
                padding-right 10px
        .reply
            padding-top 10px
            .reply-box
                padding 10px
                font-size 3.611vw
                background-color #e4e4e4
                color #797979
                .reply-user
                    padding-bottom 7px
                    span 
                        color #797979
                        padding-left 10px
                .reply-msg
                    font-size 3.889vw
                    text-indent 2em
            .child-reply
                padding-top 7px
                p
                    font-size 3.889vw
        .original
            padding 7px 0 
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
</style>