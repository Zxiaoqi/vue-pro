<template>
    <div class="edituser">
        <van-nav-bar
        title="编辑资料"
        right-text="编辑"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickEdit"
        />
        <van-image
        round
        fit="cover"
        width="19.444vw"
        height="19.444vw"
        :src="'http://liangwei.tech:3000'+userData.head_img"
        />
        <van-uploader class="upImg"
        :max-count="1"
        :after-read="afterRead" :before-read="beforeRead"/>

        <van-cell title="昵称" @click="show=true,title='编辑昵称',userValue=userData.nickname" is-link :value="userData.nickname" />
        <van-cell title="密码" @click="showPassword" is-link value="******" />
        <van-cell title="性别" @click="showGender" is-link :value="gender" />
        <!-- Dialog -->
        <van-dialog v-model="show" :title="title" show-cancel-button 
        @confirm="sendChangeUser">
            <van-radio-group v-if="title==='修改性别'"
            v-model="userData.gender" class="sexRadio">
                <van-radio :name=1>男</van-radio>
                <van-radio :name=0>女</van-radio>
            </van-radio-group>
             <van-field v-else v-model="userValue" placeholder="输入内容" :type="type"/>
        </van-dialog>
    </div>
</template>


<script>

export default {
    data(){
        return {
            userData:{
                head_img:'/uploads/image/IMG1568705287936.jpeg',
                nickname:'',
                gender:1,
                password:''
            },
            id:'',
            show:false,
            title:'',
            type:'text',
            userValue:''
        }
    },
    methods: {
        onClickLeft(){
            this.$router.push('/person')
        },
        onClickEdit(){
            this.$router.push({path:'/edit',query:{id:this.id}})
        },
        onEditUser(obj){
            this.$http.post(`/user_update/${this.id}`,
            obj).then(res=>{
                // console.log(res);
                const {data,message}=res.data
                if(message==='修改成功'){
                    this.userData.nickname=data.nickname
                    this.$toast(message)
                }
            })
        },
        showNickname(){
                this.show=true,
                this.title='编辑昵称',
                this.userValue=this.userData.nickname
        },
        showPassword(){
                this.show=true,
                this.title='修改密码',
                this.type='password'
                this.userValue=this.userData.password
        },
        showGender(){
                this.show=true,
                this.title='修改性别',
                this.userValue=this.userData.gender
        },
        //改变用户信息
        sendChangeUser(){
            if(this.title==='编辑昵称'){
                this.onEditUser({nickname:this.userValue})
            }else if(this.title==='修改密码'){
                this.onEditUser({password:this.userValue})
            }else if(this.title==='修改性别'){
                this.onEditUser({gender:this.userData.gender})
            }
        },
        //图片处理
        //上传完成后
        afterRead(file){
            const formData=new FormData()
            formData.append('file',file.file)
            this.$http.post('/upload',formData).then(res=>{
                // console.log(res);
                const {data,message}=res.data
                if(message==='文件上传成功'){
                    this.userData.head_img=data.url
                }
            })
        },
        //上传前校验
        beforeRead(file){
            // console.log(file);
            const regExg=/image\/(jpeg|jpg|png|gif|webp)/
            if (!regExg.test(file.type)) {
                this.$toast('请上传 jpg 格式图片');
                return false;
            }
            return true;
        },
       async getUserData(){
            this.id =this.$route.query.id
            const {data:res} = await this.$http.get(`/user/${this.id}`)
                // console.log(res);
            const {data}=res
            if(!data.head_img){
                data.head_img='/uploads/image/IMG1568705287936.jpeg'
            }
            if(!res.data.statusCode){
                this.userData=data
            }
        },
    },
    computed:{
        gender(){
            if(this.userData.gender===1){
                return '男'
            }else{
                return '女'
            }
        }
    },
    created() {
        this.getUserData()
        // console.log(this.$route); 
    }
}

</script>
    
<style lang="stylus">
.edituser
    .van-nav-bar__title 
        font-size 3.611vw
        font-weight 600
.edituser .van-image
        position relative
        left 50%
        margin 5.556vw 0
        transform translate(-50%)
    .van-uploader.upImg
        position absolute
        margin 5.556vw 0
        left 50%
        transform translate(-50%)
        opacity 0
</style>