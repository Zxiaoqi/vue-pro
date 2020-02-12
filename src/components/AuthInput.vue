<template>
    <div class="input-wrap">
        <input :type="type" :placeholder="placeholder" v-on="inputListeners">
    </div>
</template>


<script>

export default {
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
                    input: function (event) {
                        vm.$emit('input', event.target.value)
                    },
                    focus:function (event) {
                        vm.$emit('focus',event.target.value)
                        event.target.style.boxShadow='0 0 2px 1px #ff0c0c'
                    },
                    blur:function (event) {
                        vm.$emit('blur',event.target.value)
                        event.target.style.boxShadow='0 0 0 0'

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
input::-webkit-input-placeholder
    color #999
    font-size 4.444vw
    text-align center
    letter-spacing 0.833vw

</style>