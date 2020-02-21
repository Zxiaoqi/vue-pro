<template>
    <div>
        <van-nav-bar
        title="更多跟帖"
        left-arrow
        fixed
        @click-left="onClickLeft"
        />
        <Review :commentList="commentList"></Review>
    </div>
</template>


<script>
import Review from '../components/Reviews'
export default {
    components:{
        Review
    },
    data() {
        return {
            commentList:{}
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back(-1)
        },
        getMoreComment(id){
             this.$http.get(`/post_comment/${id}`).then(res=>{
                // console.log(res);
                const {data}=res.data
                this.commentList=data
            })
        }
    },
    created() {
        const id=this.$route.query.id
        this.getMoreComment(id)
    },
}

</script>
    
<style lang="stylus">
.van-nav-bar__title 
    font-size 3.611vw
    font-weight 600
</style>