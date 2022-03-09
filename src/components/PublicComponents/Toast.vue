<template lang="pug">
block content
    teleport(to = '#app')
        .toast-container
            .content(:class = 'is_show ? "content-show":"" ')
                .icon 🙅‍♀️🙅‍♀️🙅‍♀️
                span {{ message }}
</template>

<script>
import { defineComponent, reactive, ref ,toRefs ,onMounted, computed } from 'vue'
const Toast = defineComponent({
    name: 'Toast',
    props:{
        message:{
            type: String,
            default: ''
        }
    },
    inheritAttrs: false,
    setup(props){
      const styleDef = reactive({
          is_show : false,
      })
      onMounted(() => {
          setTimeout(() => { styleDef.is_show = true },100)
          setTimeout(() => { styleDef.is_show = false },2000)
      })
      return{
          ...toRefs(styleDef)
      }
    }
})

export default Toast
</script>
<style lang="less" scoped>
.toast-container{
    position:absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    display: flex;
    justify-content:center;
    align-items:center;
    z-index: 999;
    .content{
        width:20em;
        height:auto;
        background-color:rgba(51,51,51,0.8);
        padding:10px;
        border-radius: 10px;
        display: flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        transition: transform 0.4s cubic-bezier(.7,.2,.64,.9),opacity 0.4s cubic-bezier(.7,.2,.64,.9);
        transform: translateY(-40px);
        opacity:0;
        &-show{
            transform: translateY(0px);
            opacity:1.0;
        }
        .icon{
            font-family: Apple Color Emoji;
            font-size: 20px;
            margin-bottom: 10px;
        }
        span{
            flex: 1;
            color:#F3FDFF;
        }
    }
}
</style>
