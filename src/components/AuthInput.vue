<template>
    <div class="input-wrap">
        <input
        :type="type"
        :placeholder="placeholder"
        v-on="inputListeners"
        :rules='rules'>
    </div>
</template>


<script>

export default {
    data(){
        return{
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
                        const isValid=regex.test(e.target.value)
                        if(isValid){
                            vm.$emit('input', isValid)
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
                        if(e.target.value.length===0){
                            vm.$emit('blur',e.target.value)
                            e.target.style.borderBottom="1px solid #cccccc"

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
    padding 5.556vw
    text-align center
input 
    width 100%
    height 10.556vw
    box-sizing border-box
    background-color #ffffff
    border 0
    border-bottom 1px solid #cccccc
    border-radius 4px
    text-align center
    font-size 4.444vw
    // &.err
        // box-shadow  0 0 2px 1px red
    //     border-bottom 1px solid red
    // &.success
    //     box-shadow 0 0 2px 1px #00a4ef
    //     border-bottom 1px solid #00a4ef
input::-webkit-input-placeholder
    color #999
    font-size 4.444vw
    text-align center
    letter-spacing 0.833vw
</style>