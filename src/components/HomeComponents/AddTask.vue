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
                        span 完成时段
                    .button.text-button(@click = 'add_pin_tap_action' :class = 'is_add_pin_disabled ? "button-disabled":"" ') 📌 
                        span 定义标签
                .sub-view.sub-view-right
                    .button(@click = 'change_editing_tap_action') 🔙
                    .button(@click = 'add_tas_tap_action') ➕
</template>

<script>
import { toRefs } from 'vue'
import { use_add_task } from '@/components/PublicMixin/PublicAddTask.js'

export default {
    name: 'AddTask',
    props:{},
    emits:['add_task_action'],
    setup(props,{ emit }){
        const { 
            styleRef,
            dataRef,
            add_tas_tap_action,
            change_editing_tap_action,
            add_time_tap_action,
            add_pin_tap_action,
            textarea_value_change_action
        } = use_add_task(emit)
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
                color:#EEBDAB;
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
                    background:#FFF4D7;
                    box-shadow: 0 2px 3px 0 #C78C77;
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
                    background: #FAC9B7;
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
                    color:#EEBDAB;
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
                        background:#FFF4D7;
                        box-shadow: 0 2px 3px 0 #C78C77;
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
                        background: #FAC9B7;
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