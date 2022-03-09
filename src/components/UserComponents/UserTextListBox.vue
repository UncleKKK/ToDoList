<template lang="pug">
block content
    .content-box-container
        .content-box
            span {{ data.title }}
            text {{ data.text }}
            .button(@click = 'send_code_tap_action')
                img(:src = 'data.button_src')
</template>

<script>
import { defineComponent, reactive, ref ,toRefs ,onMounted, computed } from 'vue'
import { _post_with_token }  from '@/utils/network/request.js'

const UserTextListBox = defineComponent({
    name: 'UserTextListBox',
    props:{
        data:{
            type: Object,
        }
    },
    setup(props){
      const send_code_tap_action = (e) =>{
          props.data.is_show_code = !props.data.is_show_code
      }
      const check_code_tap_action = (e) =>{
          props.data.is_show_code = !props.data.is_show_code
      }
      return {
        send_code_tap_action,
        check_code_tap_action
      }
    }
})

export default UserTextListBox
</script>
<style lang="less" scoped>
.content-box-container{
    height:100%;
    display: flex;
    justify-content:center;
    align-items:center;
    width:calc(100% - 20px);
    border-radius: 10px;
    border: 2px dashed #464646;
    padding:4px 10px;
    .content-box{
        position:relative;
        z-index:2;
        width:100%;
        flex-direction:row;
        display: flex;
        justify-content: space-between;
        align-items:center;
        transition: transform 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s,opacity 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
        transform: rotateX(0deg);
        opacity:1.0;
        text{
            font-size: 14px;
            color:#354954;
            opacity:0.8;
            height: 40px;
            line-height:40px;
        }
        .button{
            text-align: center;
            width:80px;
            height: 40px;
            background-color:var(--user-btn-bg-color);
            box-shadow: 0 2px 3px 0 #77ACC7;
            border-radius: 6px;
            cursor: pointer;
            line-height:40px;
            display:flex;
            justify-content: center;
            align-items:center;
        }
        &-hide{
            transform: rotateX(90deg);
            opacity:0;
        }
    }
}
@media screen and (max-width:768px) {
    .content-box-container{
        height:100%;
        display: flex;
        justify-content:center;
        align-items:center;
        width:100%;
        border-radius: 10px;
        border: 2px dashed #464646;
        padding:4px 10px;
        .content-box{
            position:relative;
            z-index:2;
            width:100%;
            flex-direction:row;
            display: flex;
            justify-content: flex-start;
            align-items:center;
            transition: transform 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s,opacity 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
            transform: rotateX(0deg);
            opacity:1.0;
            font-size: 14px;
            text{
                flex:1;
                font-size: 12px;
                color:#354954;
                opacity:0.8;
                height: 40px;
                line-height:40px;
                text-align: center;
            }
            .button{
                text-align: center;
                width:80px;
                height: 40px;
                background-color:var(--user-btn-bg-color);
                box-shadow: 0 2px 3px 0 #77ACC7;
                border-radius: 6px;
                cursor: pointer;
                line-height:40px;
                display:none;
                justify-content: center;
                align-items:center;
            }
            &-hide{
                transform: rotateX(90deg);
                opacity:0;
            }
        }
    }
}
</style>
