<template>
    <div class="btn-wrap">
        <button class="ui-btn" @click="onClickBtn"
        :class="{
            'ui-btn-xlarge':xlarge,
            'ui-btn-large':large,
            'ui-btn-small':small,
            'ui-btn-xsmall':xsmall,
            'ui-btn-tile':tile,
            'ui-btn-rounded':rounded,
            'ui-btn-circle':circle,
            'ui-btn-disabled':disabled
        }" :style="`
            --color-tint:${TintColor}
        `">
            <slot>按钮</slot>
        </button>
    </div>
</template>


<script>

export default {
    props:{
        xlarge:Boolean,
        large:Boolean,
        small:Boolean,
        xsmall:Boolean,
        tile:Boolean,
        rounded:Boolean,
        circle:Boolean,
        disabled:Boolean,
        color:String
    },
    methods: {
        onClickBtn(e){
            if(!this.disabled){
                this.$emit("click",e);
            }
        }
    },
    computed:{
        TintColor(){
            if(this.color){
                return this.color
            }else{
                return '#2d8cf0'
            }
        }
    }
}

</script>
    
<style lang="stylus">
resize(minWidth,height,paddingLR,fontSize)
    min-width minWidth
    height height
    padding 0 paddingLR
    font-size fontSize
    //关联样式
    &.ui-btn-rounded,&.ui-btn-circle
        border-radius (@height/2) //属性计算
    &.ui-btn-circle
        width @height
        min-width 0
        padding 0
    &:hover
        filter brightness(120%)
    &:active
        filter brightness(80%)
.btn-wrap
    padding 5.556vw
    text-align center
    .ui-btn
       resize(80%,10vw,4.444vw,0.875rem)
       border 0 
       border-radius 4px
       box-shadow  0px 0px 3px 1px red
       background-color  var(--color-tint) //属性方法
       user-select none
       color inherit
       outline none
       &.ui-btn-xsmall
           resize(10.556vw,6.111vw,2.5vw,0.625rem)
       &.ui-btn-small
           resize(14.444vw,7.778vw,3.611vw,0.75rem)
       &.ui-btn-large
           resize(21.667vw,10.556vw,5.278vw,0.875rem)
       &.ui-btn-xlarge
           resize(27.222vw,12.778vw,6.389vw,1rem)
       &.ui-btn-tile
           border-radius 0
       &.ui-btn-disabled
           color #999
           background-color #ccc
           cursor no-drop
           box-shadow 0 0 3px 1px #999
</style>