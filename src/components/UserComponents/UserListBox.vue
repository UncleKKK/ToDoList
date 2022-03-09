<template lang="pug">
block content
    .content-box-container
        .content-box
            span {{ data.title }}
            input(type = 'text' v-model = 'data.input_data')
            .button(@click = 'send_feedback_tap_action') {{ data.button_title }}
</template>

<script>
import { defineComponent, getCurrentInstance } from 'vue'
import { 
    request_user__feedback
}  from '@/utils/network/request_util.js'

const UserListBox = defineComponent({
    name: 'UserListBox',
    props:{
        data:{
            type: Object,
        }
    },
    setup(props){
        const { proxy } = getCurrentInstance()
        const send_feedback_tap_action = (e) =>{
            if(0 < props.data.input_data.length){
                request_user__feedback(props.data.input_data)
                .then(_ => {
                    props.data.input_data = ''
                    props.data.is_show_code = !props.data.is_show_code
                    proxy.$showToast('感谢您的宝贵意见,尽快改善')
                })
                .catch(err => proxy.$showToast(err))
            }else{
                proxy.$showToast('输入内容不能为空')
            }
        }
      return {
        send_feedback_tap_action,
      }
    }
})

export default UserListBox
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
        .button{
            text-align: center;
            width:80px;
            height: 40px;
            background-color:var(--user-btn-bg-color);
            box-shadow: 0 2px 3px 0 #77ACC7;
            border-radius: 6px;
            cursor: pointer;
            line-height:40px;
            color:#333;
            text-shadow: 0.25px 0.25px 0px #333;
            font-size: 14px;
        }
        input{
            flex: 2;
            padding:10px 20px;
            outline:none;
            border:none;
            background:transparent;
            height:100%;
            font-size:1em;
            font-family: PingFangSC-Medium, sans-serif;
            color:var(--home-font-color);
            resize: none;
            &::-webkit-input-placeholder{
                color:#EEBDAB;
            }
        }
        &-hide{
            transform: rotateX(90deg);
            opacity:0;
        }
    }
    .code-content-box{
        position:absolute;
        z-index:2;
        width:calc(100% - 20px);
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-items:center;
        transition: transform 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s,opacity 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
        transform: rotateX(90deg);
        opacity:0;
        .button{
            text-align: center;
            width:80px;
            height: 40px;
            background-color:var(--user-btn-bg-color);
            box-shadow: 0 2px 3px 0 #77ACC7;
            border-radius: 6px;
            cursor: pointer;
            line-height:40px;
            margin-left: 10px;
            color:#333;
            text-shadow: 0.25px 0.25px 0px #333;
            font-size: 14px;
        }
        input{
            flex: 2;
            padding:10px 20px;
            outline:none;
            border:none;
            background:transparent;
            height:100%;
            font-size:1em;
            font-family: PingFangSC-Medium, sans-serif;
            color:var(--home-font-color);
            resize: none;
            &::-webkit-input-placeholder{
                color:#EEBDAB;
            }
        }
        &-show{
            transform: rotateX(0deg);
            opacity:1.0;
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
            justify-content: space-between;
            align-items:center;
            transition: transform 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s,opacity 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
            transform: rotateX(0deg);
            opacity:1.0;
            font-size: 14px;
            .button{
                flex:1;
                text-align: center;
                width:80px;
                min-width: 60px;
                height: 40px;
                background-color:var(--user-btn-bg-color);
                box-shadow: 0 2px 3px 0 #77ACC7;
                border-radius: 6px;
                cursor: pointer;
                line-height:40px;
                color:#333;
                text-shadow: 0.25px 0.25px 0px #333;
                font-size: 14px;
            }
            input{
                flex: 2;
                padding:10px;
                min-width: 150px;
                outline:none;
                border:none;
                background:transparent;
                height:100%;
                font-size:1em;
                font-family: PingFangSC-Medium, sans-serif;
                color:var(--home-font-color);
                resize: none;
                &::-webkit-input-placeholder{
                    color:#EEBDAB;
                }
            }
            &-hide{
                transform: rotateX(90deg);
                opacity:0;
            }
        }
        .code-content-box{
            position:absolute;
            z-index:2;
            width:calc(100% - 20px);
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            align-items:center;
            transition: transform 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s,opacity 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
            transform: rotateX(90deg);
            opacity:0;
            .button{
                text-align: center;
                width:80px;
                height: 40px;
                background-color:var(--user-btn-bg-color);
                box-shadow: 0 2px 3px 0 #77ACC7;
                border-radius: 6px;
                cursor: pointer;
                line-height:40px;
                margin-left: 10px;
                color:#333;
                text-shadow: 0.25px 0.25px 0px #333;
                font-size: 14px;
            }
            input{
                flex: 2;
                padding:10px 20px;
                outline:none;
                border:none;
                background:transparent;
                height:100%;
                font-size:1em;
                font-family: PingFangSC-Medium, sans-serif;
                color:var(--home-font-color);
                resize: none;
                &::-webkit-input-placeholder{
                    color:#EEBDAB;
                }
            }
            &-show{
                transform: rotateX(0deg);
                opacity:1.0;
            }
        }
    }
}
</style>
