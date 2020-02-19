<template>
    <div :post='post'>
        <div v-if="post.type==1">
            <div class="collection cover1" v-if="post.cover.length==1">
                <div class="left-cover">
                    <div class="title" v-on="Listeners">{{post.title}}</div>
                    <div class="user">
                        <span>{{post.user.nickname}}</span>
                        <span>{{post.comment_length}}跟帖</span>
                    </div>
                </div>
                <div class="img-cover" v-on='Listeners'>
                    <img :src="post.cover[0].url">
                </div>
            </div>

            <div class="collection cover2" v-else-if="post.cover.length>=3">
                <div class="title" v-on="Listeners">{{post.title}}</div>
                <div class="imgs" v-on='Listeners'>
                    <img :src="post.cover[0].url"/>
                    <img :src="post.cover[1].url"/>
                    <img :src="post.cover[2].url"/>
                </div>
                <div class="user">
                    <span>{{post.user.nickname}}</span>
                    <span>{{post.comment_length}}跟帖</span>
                </div>
            </div>
        </div>
        
        <div class="collection cover3" v-else-if="post.type==2">
            <div class="title" v-on="Listeners">{{post.title}}</div>
            <div class="mark-img" v-on="Listeners">
                <img :src="post.cover[0].url"/>
                <div class="mark iconfont icon-bofang"></div>
            </div>
            <div class="user">
                <span>{{post.user.nickname}}</span>
                <span>{{post.comment_length}}跟帖</span>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    props:['post'],
    methods: {
        toArtDetail(){

        }
    },
    computed: {
        Listeners(){
        var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
            // 我们从父级添加所有的监听器
                this.$listeners,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                {
                    click:function(e){
                        vm.$emit('click',e.target.value)
                    },
                    // 这里确保组件配合 `v-model` 的工作
                    input: function (e) {
                            vm.$emit('input', e.target.value)
                    },
                    focus:function (e) {
                        vm.$emit('focus',e.target.value)
                    },
                    blur:function (e) {
                            vm.$emit('blur',e.target.value)
                        }
                }
            )
        }
    },
}

</script>
    
<style lang="stylus">
.collection
    width 100%
    border-bottom 1px solid #eee
    padding 5px 0 10px
    .title
        font-size 4.167vw
        font-family 'MicrosoftYaHei'
        padding 5px 0
        &:active
            color #666
    .user
        span
            display inline-block
            font-size 3.611vw
            color #888
            padding 8px 8px 0 0
.cover1
    display flex
    justify-content space-between
    .left-cover
        width 69.444vw
        display flex
        flex-direction column
        justify-content space-between
    .img-cover
        width 30.556vw
        height 22.222vw
        img
            width 100%
            height 100% 
            object-fit cover  
.cover2
    display flex
    flex-direction column
    justify-content space-between
    .imgs
        width 100%
        display flex 
        justify-content space-between
        img 
            width 115px
            height 80px
            object-fit cover
.cover3
    display flex
    flex-direction column
    justify-content space-between
    .mark-img
        position relative
        width 100%
        img 
            display block
            width 100%
            height 100%
            object-fit cover
        .mark
            position absolute 
            top 0
            left 0
            width 100%
            height 100%
            background-color #4c4c4c80
        .icon-bofang:before
            position absolute
            top 50%
            left 50%
            transform translate(-50%,-50%)
            font-size 30px
</style>