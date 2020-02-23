<template>
    <div class="Parent" :parent="parent">
        <div class="reply-box">
           <div class="reply-user">
               <span>回复@{{parent.user.nickname}}：</span>
               <div class="reply-btn" @click="parentId(parent.id)">回复</div>
           </div>
           <div class="reply-msg">
               {{parent.content}}
           </div>
       </div>
       <Parent :parent='parent.parent' v-if="parent.parent"></Parent>
    </div>
</template>


<script>

export default {
    name:'Parent',
    props:['parent'],
    methods: {
        parentId(id){
            this.$emit('onreply',id)
        }
    },

}

</script>
    
<style lang="stylus">
.Parent
    padding  1.389vw 0
    .reply-box
        border-radius 0.833vw
        padding 2.778vw
        font-size 3.611vw
        background-color #e4e4e4
        color #797979
        .reply-user
            display flex
            justify-content space-between
            padding-bottom 1.944vw
            span 
                color #797979
            .reply-btn
                &:active
                    filter brightness(140%)
        .reply-msg
            font-size 3.889vw
</style>