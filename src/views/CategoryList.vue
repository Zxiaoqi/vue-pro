<template>
    <div>
        <van-nav-bar
        title="栏目管理"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="labels">
            <p>点击删除以下频道</p>
            <van-row gutter="20">
                <van-col span="6" v-for="(item,i) in chosen" :key="i">
                    <van-tag size="large"
                    @click="removeLabel(i)">{{item.name}}</van-tag>
                </van-col>
            </van-row>
        </div>
        <div class="labels">
            <p>点击添加以下频道</p>
            <van-row gutter="20">
                <van-col span="6" v-for="(item,i) in selectLable" :key="i">
                    <van-tag plain size="large"
                    @click="addLabel(i)">{{item.name}}</van-tag>
                </van-col>
                <van-col span="6">
                    <van-tag plain size="large" class="addTag"
                    @click="show=true">
                        <van-icon name="plus" size="20"/>
                    </van-tag>
                </van-col>
            </van-row>
        </div>
        <!-- dialog -->
        <van-dialog v-model="show" title="添加栏目"
        show-cancel-button
        @confirm="addCate">
            <van-field v-model="cate" placeholder="请输入栏目名" />
        </van-dialog>
    </div>
</template>


<script>

export default {
    data(){
        return {
            chosen:[],
            selectLable:[],
            show:false,
            cate:''
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back(-1)
        },
        //获取所有栏目
        getCateList(){
            this.$http.get('/category').then(res=>{
                // console.log(res);
                const {data,statusCode}=res.data
                if(!statusCode){
                    this.selectLable=data
                }
            })
        },
        addLabel(id){
            this.chosen.push(this.selectLable[id])
            this.selectLable.splice(id,1)
            
        },
        removeLabel(id){
            this.selectLable.push(this.chosen[id])
            this.chosen.splice(id,1)
        },
        //添加栏目请求
        addCate(){
            this.$http.post('/category',
            {name:this.cate}).then(res=>{
                // console.log(res);
                const {statusCode,message}=res.data
                if(!statusCode){
                    this.$toast(message)
                    this.getCateList()
                }
            })
        }
    },
    created() {
        this.getCateList()
    },
}

</script>
    
<style lang="stylus">
.labels
    padding 2.778vw
    p
        font-size 3.611vw
        color #888
    .van-row
        padding 10px 0
        .van-col
            text-align center
            padding-bottom 2.778vw
        .addTag
            width 28px
            height 20px
            .van-icon
                left 50%
                transform translate(-50%)
</style>