<template>
    <div>
        <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        />
    </div>
</template>


<script>

export default {
    methods: {
        onClickLeft(){
            this.$router.replace('/index')
        }
    },
}

</script>
    
<style lang="stylus">
</style>