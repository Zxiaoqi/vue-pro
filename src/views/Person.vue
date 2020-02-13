<template>
    <div>
        <div class="profile">
            <van-image round width="27.5vw" height="19.444vw"
            src="" fit="cover"/>
            <van-cell class="iconfont icon-xingbienan"
            title="火星网友" label="创建时间"
            is-link to="/myfocus"></van-cell>
        </div>
        <van-cell-group>
            <van-cell title="我的关注" value="关注的用户"
            is-link to="/myfocus"/>
            <van-cell title="我的跟帖" value="跟帖/回复"
            is-link to="/myfocus"/>
            <van-cell title="我的收藏" value="文章/视频"
            is-link to="/myfocus"/>
            <van-cell title="设置"
            is-link to="/myfocus"/>
        </van-cell-group>
    </div>
</template>


<script>

export default {

}

</script>
    
<style lang="stylus">
.profile
    padding 5.556vw 0 
    display flex
    align-items center
    border-bottom 1.389vw solid #cecece
    .van-cell__right-icon 
        height: 12.5vw
        line-height: 12.5vw
    .van-image
        margin 2.778vw 0 2.778vw 8.333vw
.icon-xingbienan:before 
    color blue
</style>