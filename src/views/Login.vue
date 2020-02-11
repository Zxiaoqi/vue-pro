<template>
    <div>
        <div class="closeBtn">
            <span class="iconfont icon-shanchu"></span>
        </div>
        <div class="logo">
            <h1>NEW</h1>
        </div>
        <AuthInput></AuthInput>
    </div>
</template>


<script>
import AuthInput from '../components/AuthInput'
export default {
    components:{
        AuthInput
    }
}

</script>
    
<style lang="stylus">
.closeBtn
    margin:2.778vw
    span
        font-size: 30px
.logo
    h1
        margin:11.111vw 0
        font-size:11.111vw
        text-align :center
        color:red
</style>