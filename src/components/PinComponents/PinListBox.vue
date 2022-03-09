<template lang="pug">
block content
    .list-box-container(ref = 'box_container' :class = 'styleRef.is_del ? "list-box-container-hide":"list-box-container-show" ' :style = 'styleRef.list_box_style')
        .main-box-content(ref = 'main_box_content' :style = 'styleRef.main_style')
            .content-view(@click = 'change_done_type_tap_action')
                span(ref = 'box_content' spellcheck = 'false') {{ data.content }}
                .type-checker(:class = 'data.is_done ? "type-checker-done":"" ' :key = 'data.type_key')
                    svg(width="25px" height="19px" viewBox="0 0 25 19" version="1.1")
                        g(stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round")
                            g.done-svg(transform="translate(-903.000000, -307.000000)")
                                polyline(transform="translate(915.500000, 316.500000) scale(-1, 1) translate(-915.500000, -316.500000)" points="925 316.5 917.745707 323 906 310")
            .del(@click = 'delete_tap_action')
                svg.pin-icon(aria-hidden="true")
                    use(xlink:href="#icon-shanchu")
        .bottom-container(v-if = 'data.date || data.pin')
            .bottom-box.bottom-box-date(v-if = 'data.date')
                span.icon ⏰
                span {{ data.date }}
            .bottom-box(v-if = 'data.pin')
                span.icon 📌
                span {{ data.pin }}
</template>

<script>
import { reactive, ref , getCurrentInstance ,onMounted,watch, nextTick } from 'vue'
import { 
    request_pin__done,
    request_pin__del
}  from '@/utils/network/request_util.js'
import store from '@/store'

export default {
    name: 'HomeListBox',
    props:{
        data:{
            type: Object,
        }
    },
    setup(props,{ emit }){
        const box_container  = ref(null)
        const main_box_content = ref(null)
        const box_content = ref(null)
        const { proxy } = getCurrentInstance()
        const styleRef = reactive({
            is_del:false,
            main_style:'display:flex;',
            list_box_style:'display:flex;'
        })
        const mobileRef = {
            show_del_timer:null,
            max_offset_left:33,
            is_mobile: store.state.is_mobile
        }
        const change_done_type_tap_action = () =>{
            request_pin__done(props.data.pid,!props.data.is_done)
            .then(res => props.data.is_done = !props.data.is_done)
            .catch(err => proxy.$showToast(err))
        }
        const delete_tap_action = () =>{
            request_pin__del(props.data.pid)
            .then(res => {
                styleRef.is_del = !styleRef.is_del
                setTimeout(() => { styleRef.list_box_style = 'display:none;' },500)
            }).catch(err => proxy.$showToast(err))
        }
        // -- config fun
        const set_mobile_onscroll_action = () =>{
            if(!mobileRef.is_mobile) return
            box_container.value.addEventListener('scroll', (e) => {
                if(mobileRef.show_del_timer) clearTimeout(mobileRef.show_del_timer)
                mobileRef.show_del_timer = setTimeout(() => {
                    if(box_container.value.scrollLeft > parseInt(mobileRef.max_offset_left/2)){
                        props.data.is_edit = true
                        box_container.value.scrollLeft = mobileRef.max_offset_left
                    }else{
                        props.data.is_edit = false
                        box_container.value.scrollLeft = 0
                    }
                },500)
            })
        }
        const upload_content_style = () =>{
            let _size = box_content.value.getBoundingClientRect()
            let _main_size = main_box_content.value.getBoundingClientRect()
            styleRef.main_style = `display:flex;--content-height:${_size.height - 5*2}px;--content-width:${_main_size.width - 2}px;`
            if(!props.data.date && !props.data.pin){
                styleRef.main_style = `${styleRef.main_style}margin-bottom:10px;`
            }
            // -- 移动端bug 变更key值强制触发更新
            props.data.type_key += `${props.data.pid}_1`
        }
        const handle_next = async () => {
            await nextTick()
            upload_content_style()
            set_mobile_onscroll_action()
        }
        onMounted(() => {
            handle_next()
        })
        watch(() => props.data.is_edit,(newValue, oldValue) =>{
            if(newValue){ box_container.value.scrollLeft = mobileRef.max_offset_left }
            else{ box_container.value.scrollLeft = 0 }
        })
        watch(() => props.data.content,(newValue, oldValue) =>{
            setTimeout(() => { upload_content_style() },10)
        })
        return {
            styleRef,
            box_container,
            main_box_content,
            box_content,
            change_done_type_tap_action,
            delete_tap_action
        }
    }
}
</script>

<style scoped lang="less">
@keyframes animation-done{
    to{
        left:calc(0px - var(--content-width) + 80px + 30px + 7.5px);
        width:calc(var(--content-width) - 40px);
    }
}
@keyframes polyline-show{
    to{
        stroke-dasharray: 54;
    }
}
@keyframes content-show{
    from{
        transform: rotateX(180deg);
    }
    to{
        transform: rotateX(0deg);
    }
}
@keyframes content-hide{
    from{
        transform: rotateX(0deg);
    }
    to{
        transform: rotateX(180deg);
    }
}
.list-box-container{
    position: relative;
    width:100%;
    display: flex;
    flex-direction:column;
    transition: transform 0.4s cubic-bezier(.7,.2,.64,.9);
    transform: rotateX(180deg);
    backface-visibility: hidden;
        &-hide{
            animation: content-hide 0.4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
        &-show{
            animation: content-show 0.4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
    .main-box-content{
        position: relative;
        width:100%;
        display: flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        z-index:2;
        .content-view{
            position: relative;
            flex:1;
            background:#BBC2F6;
            border-radius: 10px;
            display: flex;
            flex-direction:row;
            justify-content:center;
            align-items:center;
            cursor: pointer;
            span{
                position: relative;
                white-space:pre-wrap;
                word-wrap : break-word;
                outline:none;
                width: calc(100% - 25px - 5px - 20px*2);
                padding:10px 20px;
                z-index: 10;
            }
            .type-checker{
                position:relative;
                display: flex;
                justify-content:center;
                align-items:center;
                width:80px;
                height:var(--content-height);
                margin-right: 5px;
                svg{
                    z-index: 2;
                }
                .done-svg{
                    stroke:#778BC7;
                    stroke-width:5;
                    polyline{
                        stroke-dasharray: 54;
                        stroke-dashoffset: 25;
                    }
                }
                &::before{
                    content:'';
                    position: absolute;
                    top: 0;
                    left:0;
                    width:100%;
                    height:var(--content-height);
                    background:#F3F9FF;
                    box-shadow: 0 2px 3px #778BC7;
                    border-radius:6px;
                    z-index: 1;
                }
            }
            .type-checker-done{
                box-shadow: none;
                &::before{
                    box-shadow: none;
                    animation:animation-done .4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
                    z-index: 1;
                }
                .done-svg{
                    stroke:#7ED321;
                    polyline{
                        stroke-dasharray: 27;
                        animation:polyline-show 0.4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
                    }
                }
            }
        }
        .del{
            width:25px;
            height:25px;
            border:none;
            background-color:transparent;
            margin-left: 7.5px;
            cursor: pointer;
        }
    }
    .bottom-container{
        position: relative;
        top: -8px;
        width:calc(100% - 23px - 7.5px - 2px);
        height: 48px;
        background: #CDD2F6;
        z-index:0;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        align-items:flex-end;
        padding:8px 10px;
        font-size: 18px;
        box-sizing: border-box;
        .bottom-box{
            display: flex;
            flex:1;
            flex-direction: row;
            justify-content:flex-start;
            align-items:flex-end;
            .icon{
                width:25px;
                height:25px;
                margin-right: 5px;
            }
            span{
                height:23px;
            }
            &-date{
                flex:1
            }
        }
    }
}
@media screen and (max-width:768px) {
    @keyframes animation-done{
        to{
            left:calc(0px - var(--content-width) + 80px + 30px + 6.5px);
            width:calc(var(--content-width) - 40px);
        }
    }
    .list-box-container{
        position: relative;
        width:100%;
        display: flex;
        flex-direction:column;
        transition: transform 0.4s cubic-bezier(.7,.2,.64,.9);
        transform: rotateX(180deg);
        backface-visibility: hidden;
        overflow: auto;
            &-hide{
                animation: content-hide 0.4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
            }
            &-show{
                animation: content-show 0.4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
            }
        .main-box-content{
            position: relative;
            width:calc(100% + 25px + 7.5px);
            display: flex;
            flex-direction:row;
            justify-content:center;
            align-items:center;
            z-index:2;
            .content-view{
                position: relative;
                // flex:1;
                width:100%;
                background:#BBC2F6;
                border-radius: 10px;
                display: flex;
                flex-direction:row;
                justify-content:center;
                align-items:center;
                overflow: hidden;
                cursor: pointer;
                span{
                    position: relative;
                    white-space:pre-wrap;
                    word-wrap : break-word;
                    outline:none;
                    width: calc(100% - 25px - 5px - 20px*2);
                    padding:10px 20px;
                    z-index: 10;
                }
                .type-checker{
                    position:relative;
                    display: flex;
                    justify-content:center;
                    align-items:center;
                    width:80px;
                    height:var(--content-height);
                    margin-right: 5px;
                    svg{
                        z-index: 2;
                    }
                    .done-svg{
                        stroke:#778BC7;
                        stroke-width:5;
                        polyline{
                            stroke-dasharray: 54;
                            stroke-dashoffset: 25;
                        }
                    }
                    &::before{
                        content:'';
                        position: absolute;
                        top: 0;
                        left:0;
                        width:100%;
                        height:var(--content-height);
                        background:#F3F9FF;
                        box-shadow: 0 2px 3px #778BC7;
                        border-radius:6px;
                        z-index: 1;
                    }
                }
                .type-checker-done{
                    box-shadow: none;
                    &::before{
                        box-shadow: none;
                        animation:animation-done .4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
                        z-index: 1;
                    }
                    .done-svg{
                        stroke:#7ED321;
                        polyline{
                            stroke-dasharray: 27;
                            animation:polyline-show 0.4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
                        }
                    }
                }
            }
            .del{
                width:25px;
                height:25px;
                border:none;
                background-color:transparent;
                margin-left: 7.5px;
                cursor: pointer;
            }
        }
        .bottom-container{
            position: relative;
            top: -8px;
            width:calc(100%);
            height: 48px;
            background: #CDD2F6;
            z-index:0;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;
            display: flex;
            flex-direction: row;
            justify-content:flex-start;
            align-items:flex-end;
            padding:8px 10px;
            font-size: 16px;
            box-sizing: border-box;
            .bottom-box{
                display: flex;
                flex:1;
                flex-direction: row;
                justify-content:flex-start;
                align-items:flex-end;
                .icon{
                    width:25px;
                    height:25px;
                    margin-right: 5px;
                }
                span{
                    height:23px;
                }
                &-date{
                    flex:2
                }
            }
        }
    }
}
</style>