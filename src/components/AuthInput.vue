<template>
    <div class="input-wrap">
        <input
        :type="type"
        :placeholder="placeholder"
        v-on="inputListeners"
        :rules='rules'>
        <span v-if='isValid===true' style="color:green">验证成功</span>
        <span v-else-if="isValid===false" style="color:red">验证失败</span>
        <span v-else></span>
    </div>
</template>


<script>

export default {
    data(){
        return{
            isValid:''
        }
    },
    props:{
        placeholder:{
            type:String,
            // required: true,
            default:function () {
                return "请输入内容"
            }
        },
        type:{
            type:String,
            // required: true,
            default:function(){
                return "text"
            }
        },
        rules:{
            type:String,
            default(){
                return ''
            }
        }
    },
    computed:{
        inputListeners(){
        var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
            // 我们从父级添加所有的监听器
                this.$listeners,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                {
                    // 这里确保组件配合 `v-model` 的工作
                    input: function (e) {
                        // console.log(e.target.style);
                        const regex=new RegExp(vm.rules)
                        vm.isValid=regex.test(e.target.value)
                        if(vm.isValid){
                            vm.$emit('input', vm.isValid)
                            // e.target.style.boxShadow='0 0 2px 1px #00a4ef'
                            e.target.style.borderBottom='1px solid #00a4ef'
                        }else{
                            // e.target.style.boxShadow='0 0 2px 1px red'
                            e.target.style.borderBottom='1px solid red'
                        }
                    },
                    focus:function (e) {
                        vm.$emit('focus',e.target.value)
                    },
                    blur:function (e) {
                        // const regex=new RegExp(vm.rules)
                        // vm.isValid=regex.test(e.target.value)
                        if(e.target.value.length===0){
                            vm.$emit('blur',e.target.value)
                            e.target.style.borderBottom="1px solid #cccccc"
                            vm.isValid=''
                        }


                    }
                }
            )
        }
    }

}

</script>
    
<style lang="stylus">
.input-wrap
    padding 2.778vw 5.556vw 0
    text-align center
    span 
        display block 
        text-align right
        height 3.333vw
        font-size 3.333vw
    input 
        padding 0 1.111vw
        width 100%
        height 10.556vw
        box-sizing border-box
        background-color #ffffff
        border 0
        border-bottom 1px solid #cccccc
        // border-radius 4px
        text-align center
        font-size 4.444vw
    input::-webkit-input-placeholder
        color #999
        font-size 4.444vw
        text-align center
        letter-spacing 0.833vw
</style>