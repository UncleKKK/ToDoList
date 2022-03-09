<template lang="pug">
block content
    .tabbar-container(ref = 'tabbar' :style = 'styleRef.color_style')
        .progress-bar
            .cursor(:style = 'styleRef.curosr_style')
                .wave(:style = 'styleRef.wave_style')
                    svg.custom-color(ref = 'pointer_svg' viewBox="0 0 481 29" fill="none" )
                        path(d="M0 17.2666C240 17.2666 214.224 0.266602 240 0.266602C265.777 0.266602 240.001 17.2666 480.001 17.2666V29.2666H0V17.2666Z")
                    svg.focused(ref = 'focused_svg' viewBox="0 0 960 120")
                        path(class="customColor" d="M0,120c114,0,154-27,240-60C330.2,25.39,383.39,0,480,0S622,26,720,60c92.24,32,142.37,60,240,60Z")
                .focused-cursor-pin(:class = 'dataRef.is_hover ? "show-pin":"" ')
                    .focused-cursor-pin-item(v-for = '(item,index) in dataRef.tabbarList' :class = 'item.is_active ? "active" : "" ')
                        .pin-imgs
                            img(:src = 'item.src')
                            img.shadow(:src = 'item.src')
                        span {{ item.title }}
                ul.focused-cursor-container(:class = 'dataRef.is_hover ? "":"show" ')
                    li.focused-cursor-container-item(v-for = '(item,index) in dataRef.tabbarList' :class = 'item.is_active ? "active" : "" ')
                        .focused-item-boder
                            img(:src = 'item.src')
        .tabbar-item-container
            template(v-for = '(item,index) in dataRef.tabbarList')
                .tabbar-item(@mouseenter = 'tabbar_item_mouse_enter_action(index)'
                             @click = 'tabbar_item_click_tap_action(index)')
    .hover-cover(v-if = 'dataRef.is_hover')
</template>

<script>
import { reactive, ref ,toRefs ,onMounted } from 'vue'
import { commit_loading_state } from '@/utils/store'
import { useRouter } from 'vue-router'
import { __home_tabbarList } from '@/utils/static/staticData.js'

export default {
    name: 'TabBar',
    emits:['tabbar_item_click_tap_action_call_back'],
    props:{
        current_selected_index:{
            type:Number
        }
    },
    setup (props,{ emit }){
        // -- refs
        const tabbar = ref(null), pointer_svg = ref(null), focused_svg = ref(null)
        const styleRef = reactive({
            curosr_style: 'transform: translate(0px, 0px)',
            wave_style : 'transform: skewX(0deg)',
            color_style : '--tab-bg-color:#218bee',
        })
        const staticData = reactive({
            last_offset_x :0,
            move_action_timeout: null,
            current_selected_index:parseInt(props.current_selected_index),
        })
        const dataRef = reactive({
            tabbarList:__home_tabbarList,
            is_hover:false,
        })
        // -- router
        const router = useRouter()
        // -- set animation fun
        const set_wave_style_with_move = (offset_x) =>{
            let skew_x = (staticData.last_offset_x - offset_x) * 2 > 0 ? Math.min((staticData.last_offset_x - offset_x) * 2,30) : Math.max((staticData.last_offset_x - offset_x) * 2,-30)
            styleRef.wave_style = `transform: skewX(${skew_x}deg)`
        }
        const add_focused_animation_class = () =>{
            focused_svg.value.classList.add('focused-show')
            focused_svg.value.classList.remove('focused-hide')
        }
        const remove_focused_animation_class = () =>{
            focused_svg.value.classList.remove('focused-show')
            focused_svg.value.classList.add('focused-hide')
        }
        const add_pointer_animation_class = () =>{
            pointer_svg.value.classList.add('custom-color-hide')
            pointer_svg.value.classList.add('custom-color-show')
        }
        const remove_pointer_animation_class = () =>{
            pointer_svg.value.classList.remove('custom-color-hide')
            pointer_svg.value.classList.remove('custom-color-show')
        }
        // -- tap action
        const tabbar_mouse_move_action = () =>{
            tabbar.value.addEventListener('mousemove',e => {
                if(staticData.move_action_timeout) { clearTimeout(staticData.move_action_timeout) }
                styleRef.curosr_style = `transform: translate(${e.clientX - 240}px, 0px);`
                set_wave_style_with_move(e.clientX)
                staticData.last_offset_x = e.clientX
                staticData.move_action_timeout = setTimeout(() => {
                    set_wave_style_with_move(staticData.last_offset_x)
                    staticData.move_action_timeout = null
                }, 300);
            })
        }
        const tabbar_mouse_enter_action = () =>{
            tabbar.value.addEventListener('mouseenter',e => {
                add_focused_animation_class()
                remove_pointer_animation_class()
                dataRef.is_hover = true
            })
        }
        const tabbar_mouse_leave_action = () =>{
            tabbar.value.addEventListener('mouseleave',e => {
                remove_focused_animation_class()
                add_pointer_animation_class()
                dataRef.is_hover = false
                setTimeout(() => { 
                    move_to_select_item_by_mouse_leave()
                    tabbar_item_mouse_enter_action(staticData.current_selected_index)
                },200)
            })
        }
        const tabbar_item_mouse_enter_action = (e) =>{
            dataRef.tabbarList.forEach(item => {
                item.is_active = false
            })
            dataRef.tabbarList[e].is_active = true
            let _color = '--tab-bg-color:'
            switch(e){
                case 0:
                    _color = `${_color}var(--tab-section1-color)`
                    break
                case 1:
                    _color = `${_color}var(--tab-section2-color)`
                    break
                case 2:
                    _color = `${_color}var(--tab-section5-color)`
                    break
                case 3:
                    _color = `${_color}var(--tab-section4-color)`
                    break
            }
            styleRef.color_style = _color
        }
        const set_tabbar_mouse_action = () =>{
            tabbar_mouse_move_action()
            tabbar_mouse_enter_action()
            tabbar_mouse_leave_action()
        }
        const tabbar_item_click_tap_action = (e) => {
            if(props.current_selected_index == e) return
            commit_loading_state(true)
            let _page_name = ''
            switch(e){
                case 0:
                    _page_name = 'Home'
                    break
                case 1:
                    _page_name = 'Pin'
                    break
                case 2:
                    _page_name = 'History'
                    break
                case 3:
                    _page_name = 'UserInfo'
                    break
            }
            setTimeout(() =>{ 
                router.push({ name:_page_name })
                commit_loading_state(false)
            },1500)
            emit('tabbar_item_click_tap_action_call_back',e)
        }
        const move_to_select_item_by_mouse_leave = () =>{
            let _item_width = document.body.clientWidth / dataRef.tabbarList.length
            let _item_offset_Y = staticData.current_selected_index*_item_width
            styleRef.curosr_style = `transform: translate(${_item_offset_Y}px, 0px);`
        }
        onMounted(() => {
            set_tabbar_mouse_action()
            move_to_select_item_by_mouse_leave()
            tabbar_item_mouse_enter_action(staticData.current_selected_index)
        })
        return{
            tabbar,
            pointer_svg,
            focused_svg,
            styleRef,
            dataRef,
            tabbar_item_mouse_enter_action,
            tabbar_item_click_tap_action
        }
    }
}
</script>

<style scoped lang="less">
@keyframes focuse-show-animation
{
    0%{
        transform: scale(0,0)
    }30%{
        transform: scale(1.75,1.7)
    }50%{
        transform: scale(1.7,1.7)
    }75%{
        transform: scale(1.65,1.7)
    }100%{
        transform: scale(1.7,1.7)
    }
}
@keyframes focuse-hide-animation
{
    from{
        transform: scale(1.7,1.7)
    }
    to{
        transform: scale(0,0)
    }
}
@keyframes pointer-hide-animation
{
    from{
        transform: scale(1.0,1.0)
    }
    to{
        transform: scale(0,0)
    }
}
@keyframes pointer-show-animation
{
    from{
        transform: scale(0,0)
    }
    to{
        transform: scale(1.0,1.0)
    }
}
.tabbar-container
{
    position: absolute;
    bottom: 0;
    width:100%;
    height:100px;
    z-index:101;
    .progress-bar{
        position: absolute;
        bottom: 0;
        background-color: var(--tab-bg-color);
        width:100%;
        height:.75rem;
        transition: background-color .7s cubic-bezier(.19,1,.22,1);
        .cursor{
            position: absolute;
            left: 0;
            bottom: 0;
            width:30rem;
            height:3.75rem;
            transition: transform 1.3s cubic-bezier(.19,1,.22,1);
            pointer-events:none;
            will-change: transform;
            .wave{
                width:100%;
                height:100%;
                transition: transform .5s cubic-bezier(.19,1,.22,1);
                svg{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    transform-origin: center bottom;
                    will-change: transform;
                    transition: transform .5s cubic-bezier(.19,1,.22,1);
                }
                .custom-color{
                    fill: var(--tab-bg-color);
                    transition: fill .7s cubic-bezier(.19,1,.22,1);
                    &-hide{
                        animation: pointer-hide-animation .3s both cubic-bezier(.19,1,.22,1);
                    }
                    &-show{
                        animation: pointer-show-animation .3s both cubic-bezier(.19,1,.22,1) 0.3s;
                    }
                }
                .focused{
                    fill: var(--tab-bg-color);
                    padding-bottom: 0.35rem;
                    transform: scale(0,0);
                    transition: fill .7s cubic-bezier(.19,1,.22,1);
                    &-show{
                        animation: focuse-show-animation .5s both cubic-bezier(.19,1,.22,1) 0.5s;
                    }
                    &-hide{
                        animation: focuse-hide-animation .5s both cubic-bezier(.19,1,.22,1);
                    }
                }
            }
            .focused-cursor-container{
                position: absolute;
                bottom: 90%;
                width:100%;
                height:10rem;
                list-style: none;
                opacity:0;
                transition: transform 0.4s cubic-bezier(.7,.2,.64,.9),opacity 0.4s cubic-bezier(.7,.2,.64,.9);
                transform:translateY(-20px);
                .active{
                    opacity:1;
                }
                &-item{
                    position: absolute;
                    width:100%;
                    height:10rem;
                    display:flex;
                    justify-content:center;
                    align-items:flex-end;
                    transition: opacity 0.4s cubic-bezier(.7,.2,.64,.9);
                    opacity:0;
                    .focused-item-boder{
                        position: relative;
                        width:120px;
                        height:120px;
                        background:#fff;
                        border-radius:50%;
                        display: flex;
                        justify-content:center;
                        align-items:center;
                        &::after{
                            content:'';
                            position: absolute;
                            bottom:-7px;
                            left: calc(50% - 20px/2);
                            width:20px;
                            height:20px;
                            background:#fff;
                            border-radius:3px;
                            transform: rotate(45deg);
                            z-index: -1;
                        }
                        img{
                            width:100px;
                            height:100px;
                            border-radius:50%;
                            background-color:var(--tab-bg-color);
                        }
                    }
                }
            }
            .focused-cursor-pin{
                position: absolute;
                left: 0;
                bottom: 0;
                width:100%;
                height:200%;
                display: flex;
                opacity:0;
                transition: transform 0.4s cubic-bezier(.7,.2,.64,.9),opacity 0.4s cubic-bezier(.7,.2,.64,.9);
                transform: scale(0.6,0.6);
                .active{
                    transform: scale(1,1);
                    opacity:1;
                }
                &-item{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width:100%;
                    height:100%;
                    display: flex;
                    flex-direction: column;
                    justify-content:flex-start;
                    align-items:center;
                    transition: transform 0.4s cubic-bezier(.7,.2,.64,.9),opacity 0.4s cubic-bezier(.7,.2,.64,.9);
                    opacity:0;
                    transform: scale(0,0);
                    .pin-imgs{
                        width:100px;
                        height:100px;
                        transform: translateY(-40px);
                        img{
                            position: absolute;
                            width:100%;
                            height:100%;
                            z-index: 2
                        }
                        .shadow{
                            position: absolute;
                            top: 10px;
                            left: 10px;
                            z-index: 1;
                            opacity: 0.5;
                            filter: blur(5px);
                        }
                    }
                    span{
                        font-family: STSong;
                        font-weight: bold;
                        color:#fff;
                        transform: translateY(-40px);
                        letter-spacing: 0.2rem;
                        font-size: 1.75em;
                    }
                }
            }
            .show{
                opacity:1;
                transition-delay: 0.4s;
                transform: translateY(0px);
            }
            .show-pin{
                opacity:1;
                transform: scale(1.0,1.0);
                transition-delay: 0.5s;
            }
        }
    }
    .tabbar-item-container{
        display:flex;
        flex-direction: row;
        width:100%;
        height:100%;
        .tabbar-item{
            flex: 1;
            cursor: pointer;
        }
    }
}
.hover-cover{
    position: absolute;
    top: 0;
    left: 0;
    width:100vw;
    height:100vh;
    background-color:#333;
    opacity:0.3;
    z-index: 100;
}
</style>