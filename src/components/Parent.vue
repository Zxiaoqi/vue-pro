<template>
    <div class="Parent" :parent="parent">
        <div class="reply-box">
           <div class="reply-user">
               回复@<span>{{parent.user.nickname}}：</span>
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
    props:['parent']

}

</script>
    
<style lang="stylus">
.reply
   padding-top 2.778vw
   .reply-box
       border-radius 0.833vw
       padding 2.778vw
       font-size 3.611vw
       background-color #e4e4e4
       color #797979
       .reply-user
           padding-bottom 1.944vw
           span 
               color #797979
       .reply-msg
           font-size 3.889vw
</style>