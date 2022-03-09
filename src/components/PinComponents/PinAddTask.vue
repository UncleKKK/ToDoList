<template lang="pug">
block content
    .task-container(:style = 'container_height')
        .none-editing-container(:class = 'is_editing ? "none-editing-container-hide":"" ' @click = 'change_editing_tap_action')
            span ➕
        .editing-container(:class = 'is_editing ? "editing-container-show":"" ')
            textarea(spellcheck = 'false' placeholder = '添加新内容' v-model = 'dataRef.input_data' @input = 'textarea_value_change_action' maxlength = '200')
            .buttons-view
                .sub-view
                    .button.text-button(@click = 'add_time_tap_action' :class = 'is_add_time_disabled ? "button-disabled":"" ') ⏰ 
                        span 截止时间
                    .button.text-button(@click = 'add_pin_tap_action' :class = 'is_add_pin_disabled ? "button-disabled":"" ') 📌 
                        span 定义标签
                .sub-view.sub-view-right
                    .button(@click = 'change_editing_tap_action') 🔙
                    .button(@click = 'add_tas_tap_action') ➕
</template>

<script>
import { reactive ,toRefs , getCurrentInstance} from 'vue'

export default {
    name: 'PinAddTask',
    props:{},
    emits:['add_task_action'],
    setup(props,{ emit }){
        const styleRef = reactive({
            is_editing:false,
            container_height:'min-height: 50px',
            is_add_time_disabled:false,
            is_add_pin_disabled:false,
        })
        const dataRef = reactive({
            input_data : ''
        })
        const { proxy } = getCurrentInstance()
        const add_tas_tap_action = () =>{
            if(0 < dataRef.input_data.length){
                emit('add_task_action',dataRef.input_data)
                dataRef.input_data = ''
                styleRef.is_add_time_disabled = false
                styleRef.is_add_pin_disabled = false
            }else{
                proxy.$showToast('任务内容不能为空')
            }
        }
        const change_editing_tap_action = () =>{
            styleRef.is_editing = !styleRef.is_editing
            setTimeout(() => { 
                if(styleRef.is_editing){ styleRef.container_height = 'min-height: 200px' }
                else { styleRef.container_height = 'min-height: 50px' }
            },500)
        }
        const add_time_tap_action = () =>{
            if(!styleRef.is_add_time_disabled){
                dataRef.input_data = `${dataRef.input_data}\n⏰  [ ${get_current_date()} ]`
                styleRef.is_add_time_disabled = true 
            }
        }
        const add_pin_tap_action = () =>{
            if(!styleRef.is_add_pin_disabled){
                dataRef.input_data = `${dataRef.input_data}\n📌  [ #工作 ]`
                styleRef.is_add_pin_disabled = true
            }
        }
        const textarea_value_change_action = (e) =>{
            if(-1 === dataRef.input_data.indexOf('⏰  [')){
                styleRef.is_add_time_disabled = false
            }else{
                styleRef.is_add_time_disabled = true
            }
            if(-1 === dataRef.input_data.indexOf('📌  [')){
                styleRef.is_add_pin_disabled = false
            }else{
                styleRef.is_add_pin_disabled = true
            }
        }
        const get_current_date = () =>{
            let now = new Date()
            let month = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`
            let date = now.getDate() >= 10 ? now.getDate() : `0${now.getDate()}`
            let hour = now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`
            return `${now.getFullYear()}-${month}-${date} ${hour}:00:00`
        }
        return{
            ...toRefs(styleRef),
            dataRef,
            add_tas_tap_action,
            change_editing_tap_action,
            add_time_tap_action,
            add_pin_tap_action,
            textarea_value_change_action
        }
    }
}
</script>

<style scoped lang="less">
.task-container{
    position: relative;
    width:calc(100% - 30px);
    min-height:50px;
    margin-bottom: 10px;
    font-family: Apple Color Emoji;
    font-size: 1.25em;
    transition: height 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
    .none-editing-container{
        position: absolute;
        display: flex;
        justify-content:center;
        align-items:center;
        border: 2px dashed #464646;
        border-radius: 10px;
        min-height: 50px;
        width:100%;
        transition: transform 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s,opacity 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
        transform:rotateX(0deg);
        opacity:1.0;
        cursor: pointer;
        backface-visibility: hidden;
        &-hide{
            opacity:0;
            transform:rotateX(180deg);
        }
    }
    .editing-container{
        position: absolute;
        display: flex;
        justify-content:flex-start;
        flex-direction:column;
        border: 2px dashed #464646;
        border-radius: 10px;
        height:200px;
        width:100%;
        transition: transform 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s,opacity 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
        transform:rotateX(-180deg);
        opacity:0;
        backface-visibility: hidden;
        textarea{
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
                color:#BBC2F6;
            }
        }
        .buttons-view{
            flex:1;
            display: flex;
            justify-content:flex-start;
            flex-direction:row;
            align-items:center;
            .sub-view{
                display: flex;
                flex:1;
                padding-left: 10px;
                .button{
                    margin-right:5px;
                    width:80px;
                    height: 40px;
                    background:#F3F9FF;
                    box-shadow: 0 2px 3px 0 #778BC7;
                    border-radius: 6px;
                    text-align: center;
                    line-height: 40px;
                    cursor: pointer;
                }
                .button-disabled{
                    display:none !important;
                }
                .text-button{
                    height: 36px;
                    line-height: 36px;
                    background: #BBC2F6;
                    border-radius:20px;
                    box-shadow:none;
                    width:auto;
                    padding:0px 10px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    font-family: PingFangSC-Medium, sans-serif;
                    color:#464646;
                    span{
                        font-size:14px;
                        margin-left: 5px;
                    }
                }
            }
            .sub-view-right{
                justify-content: flex-end;
            }
        }
        &-show{
            transform:rotateX(0deg);
            opacity:1.0;
        }
    }
}
@media screen and (max-width:768px) {
    .task-container{
        position: relative;
        width:calc(100%);
        min-height:50px;
        margin-bottom: 10px;
        font-family: Apple Color Emoji;
        font-size: 1.25em;
        transition: height 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
        .none-editing-container{
            position: absolute;
            display: flex;
            justify-content:center;
            align-items:center;
            border: 2px dashed #464646;
            border-radius: 10px;
            min-height: 50px;
            width:100%;
            transition: transform 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s,opacity 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
            transform:rotateX(0deg);
            opacity:1.0;
            cursor: pointer;
            backface-visibility: hidden;
            &-hide{
                opacity:0;
                transform:rotateX(180deg);
            }
        }
        .editing-container{
            position: absolute;
            display: flex;
            justify-content:flex-start;
            flex-direction:column;
            border: 2px dashed #464646;
            border-radius: 10px;
            height:200px;
            width:100%;
            transition: transform 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s,opacity 0.4s cubic-bezier(.7,.2,.64,.9) 0.4s;
            transform:rotateX(-180deg);
            opacity:0;
            backface-visibility: hidden;
            textarea{
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
                    color:#BBC2F6;
                }
            }
            .buttons-view{
                flex:1;
                display: flex;
                justify-content:flex-start;
                flex-direction:row;
                align-items:center;
                .sub-view{
                    display: flex;
                    flex:1;
                    padding-left: 10px;
                    .button{
                        margin-right:5px;
                        width:80px;
                        height: 40px;
                        background:#F3F9FF;
                        box-shadow: 0 2px 3px 0 #778BC7;
                        border-radius: 6px;
                        text-align: center;
                        line-height: 40px;
                        cursor: pointer;
                    }
                    .button-disabled{
                        display:none !important;
                    }
                    .text-button{
                        height: 36px;
                        line-height: 36px;
                        background: #BBC2F6;
                        border-radius:20px;
                        box-shadow:none;
                        width:auto;
                        padding:0px 10px;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        font-family: PingFangSC-Medium, sans-serif;
                        color:#464646;
                        span{
                            display:none;
                            font-size:14px;
                            margin-left: 5px;
                        }
                    }
                }
                .sub-view-right{
                    justify-content: flex-end;
                }
            }
            &-show{
                transform:rotateX(0deg);
                opacity:1.0;
            }
        }
    }
}
</style>