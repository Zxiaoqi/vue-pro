<template>
    <div class="input-wrap">
        <input :type="type" :placeholder="placeholder">
    </div>
</template>


<script>

export default {
    props:{
        placeholder:{
            type:String,
            default:function () {
                return "请输入内容"
            }
        },
        type:{
            type:String,
            default:function(){
                return "text"
            }
        }
    }

}

</script>
    
<style lang="stylus">
.input-wrap
    padding 5.556vw
input 
    width 100%
    height 10.556vw
    box-sizing border-box
    background-color #ffffff
    border 0
    border-bottom 1px solid #cccccc
    outline 0
    text-align center
    font-size 4.444vw
input::-webkit-input-placeholder
    color #999
    font-size 5vw
    text-align center
    letter-spacing 0.833vw

</style>