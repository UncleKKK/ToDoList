<template lang="pug">
block content
    .content-box-container(:class = 'data.is_bind ? "content-box-container-binded":""')
        .content-box(:class = 'data.is_show_code ? "content-box-hide":"" ')
            span {{ data.title }}
            input(type = 'text' v-model = 'data.input_data' :disabled = 'data.is_bind')
            .button(:class = 'data.is_bind ? "button-binded":""' @click = 'send_code_tap_action')
                img(:src = 'data.button_src')
        .code-content-box(:class = 'data.is_show_code ? "code-content-box-show":"" ')
            span 验证码 :
            input(type = 'text' v-model = 'data.input_code_data' maxlength = 6)
            .button.emoji(@click = 'back_tap_action') 🔙
            .button(@click = 'check_code_tap_action') Done
</template>

<script>
import { defineComponent, reactive, getCurrentInstance } from 'vue'
import { 
    request_user__send_email,
    request_user__check_email_code,
    request_user__unbind_email,
    request_user__send_sms,
    request_user__check_sms_code,
    request_user__unbind_sms
}  from '@/utils/network/request_util.js'

const UserAnimationListBox = defineComponent({
    name: 'UserAnimationListBox',
    props:{
        data:{
            type: Object,
        }
    },
    setup(props){
        const dataRef = reactive({
            email_address: '',
            phone_num:''
        })
        const { proxy } = getCurrentInstance()
        // -- tap action
        const send_code_tap_action = (e) =>{
            if('email' == props.data.type){
                if(props.data.is_bind){ unbind_email() }
                else{ send_email_code() }
            }
            else if('phone' == props.data.type){ 
                if(props.data.is_bind){ unbind_phone() }
                else{ send_phone_code() }
            }
        }
        const check_code_tap_action = (e) =>{
            if('email' == props.data.type){ check_email_code() }
            else if('phone' == props.data.type){ check_phone_code() }
        }
        const back_tap_action = () =>{
            props.data.is_show_code = !props.data.is_show_code
        }
        // -- email fun
        const send_email_code = () =>{
            if(0 < props.data.input_data.length){
                request_user__send_email(props.data.input_data)
                .then(_ => {
                    dataRef.email_address = props.data.input_data
                    props.data.input_data = ''
                    props.data.is_show_code = !props.data.is_show_code
                })
                .catch(err => proxy.$showToast(err))
            }else{
                proxy.$showToast('邮箱地址不能为空')
            }
        }
        const check_email_code = () =>{
            if(0 < props.data.input_code_data.length){
                request_user__check_email_code(props.data.input_code_data)
                .then(_ => {
                    set_bind_data(dataRef.email_address)
                    props.data.input_code_data = ''
                    props.data.is_show_code = !props.data.is_show_code
                })
                .catch(err => proxy.$showToast(err))
            }
        }
        const unbind_email = () =>{
            request_user__unbind_email()
            .then(_ => set_unbind_data())
            .catch(err => console.log(err))
        }
        const set_bind_data = (input_data) =>{
            props.data.button_title = '解除绑定'
            props.data.is_bind = true
            props.data.button_src = require('@/assets/unbind.svg')
            props.data.input_data = input_data
        }
        const set_unbind_data = () =>{
            props.data.button_title = '绑定'
            props.data.is_bind = false
            props.data.button_src = require('@/assets/bind.svg')
            props.data.input_data = ''
        }
        // -- phone fun
        const send_phone_code = () =>{
            if(0 < props.data.input_data.length){
                request_user__send_sms(props.data.input_data)
                .then(_ => {
                    dataRef.phone_num = props.data.input_data
                    props.data.input_data = ''
                    props.data.is_show_code = !props.data.is_show_code
                })
                .catch(err => proxy.$showToast(err))
            }else{
                proxy.$showToast('手机号不能为空')
            }
        }
        const check_phone_code = () =>{
            if(0 < props.data.input_code_data.length){
                request_user__check_sms_code(props.data.input_code_data)
                .then(_ => {
                    set_bind_data(dataRef.phone_num)
                    props.data.input_code_data = ''
                    props.data.is_show_code = !props.data.is_show_code
                })
                .catch(err => proxy.$showToast(err))
            }
        }
        const unbind_phone = () =>{
            request_user__unbind_sms()
            .then(_ => set_unbind_data())
            .catch(err => proxy.$showToast(err))
        }
        return {
            dataRef,
            send_code_tap_action,
            check_code_tap_action
        }
    }
})

export default UserAnimationListBox
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
    &-binded{
        border: 2px dashed transparent;
        background: #ABD3EE;
    }
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
            display: flex;
            justify-content:center;
            align-items:center;
            &-binded{
                background-color:transparent;
                box-shadow:none;
            }
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
        width:calc(100% - 40px);
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-items:center;
        transition: transform 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s,opacity 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
        transform: rotateX(90deg);
        opacity:0;
        pointer-events: none;
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
        .emoji{
            font-size: 20px;
            font-family: Apple Color Emoji;
            text-shadow: none;
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
            pointer-events: auto;
        }
    }
}
@media screen and (max-width:768px) {
    .content-box-container{
        height:100%;
        display: flex;
        justify-content:center;
        align-items:center;
        width:calc(100%);
        border-radius: 10px;
        border: 2px dashed #464646;
        padding:4px 10px;
        &-binded{
            border: 2px dashed transparent;
            background: #ABD3EE;
        }
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
                height: 40px;
                min-width: 60px;
                background-color:var(--user-btn-bg-color);
                box-shadow: 0 2px 3px 0 #77ACC7;
                border-radius: 6px;
                cursor: pointer;
                line-height:40px;
                display: flex;
                justify-content:center;
                align-items:center;
                &-binded{
                    background-color:transparent;
                    box-shadow:none;
                }
            }
            input{
                flex: 2;
                padding:10px;
                outline:none;
                min-width: 150px;
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
            span{
                flex: 1;
            }
            &-hide{
                transform: rotateX(90deg);
                opacity:0;
            }
        }
        .code-content-box{
            position:absolute;
            z-index:2;
            width:100%;
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            align-items:center;
            transition: transform 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s,opacity 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
            transform: rotateX(90deg);
            opacity:0;
            pointer-events: none;
            padding:10px;
            .button{
                flex:0.8;
                text-align: center;
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
            .emoji{
                font-size: 20px;
                font-family: Apple Color Emoji;
                text-shadow: none;
            }
            input{
                flex: 1;
                width:80px;
                padding:10px;
                outline:none;
                border:none;
                background:transparent;
                height:100%;
                font-size:1em;
                font-family: PingFangSC-Medium, sans-serif;
                color:var(--home-font-color);
                resize: none;
            }
            span{
                flex: 0.8;
            }
            &-show{
                transform: rotateX(0deg);
                opacity:1.0;
                pointer-events: auto;
            }
        }
    }
}
</style>
