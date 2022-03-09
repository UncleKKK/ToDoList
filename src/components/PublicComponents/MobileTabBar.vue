<template lang="pug">
block content
    .mobile-tab-bar-container(:style = 'styleRef.color_style')
        ul  
            li.tab-item(v-for = '(item,index) in tabbarList' :key = 'index' @click = 'tabbar_item_click_tap_action(index)')
                img.icon(:src = 'item.src' :class = 'item.is_active ? "icon-active":"" ')
                img.shadow(:src = 'item.src' :class = 'item.is_active ? "shadow-active":"" ')
                span {{ item.title }}
            .indicator(:style = 'styleRef.indicator_style')
</template>

<script>
import { reactive, ref ,toRefs ,onMounted, watch } from 'vue'
import { __home_tabbarList } from '@/utils/static/staticData.js'
import { commit_loading_state } from '@/utils/store'
import { useRouter } from 'vue-router'

export default {
    name: 'MobileTabBar',
    props:{
        current_selected_index:{
            type:Number
        }
    },
    setup(props,{ emit }){
        const styleRef = reactive({
            color_style : '--tab-bg-color:#218bee',
            indicator_style:''
        })
        const dataRef = reactive({
            tabbarList:__home_tabbarList
        })
        // -- router
        const router = useRouter()
        const tabbar_item_click_tap_action = (e) => {
            if(props.current_selected_index == e) return
            // commit_loading_state(true)
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
                // commit_loading_state(false)
            },400)
            tabbar_item_change_color_and_transform_indicator(e)
        }
        const tabbar_item_change_color_and_transform_indicator = (e) =>{
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
            styleRef.indicator_style = `transform:translateX(calc((100vw/4 - 20px) * ${e} + 20px *${e}))`
            styleRef.color_style = _color
        }
        onMounted(() =>{
            tabbar_item_change_color_and_transform_indicator(props.current_selected_index)
        })
        return {
            ...toRefs(dataRef),
            styleRef,
            tabbar_item_click_tap_action
        }
    }
}
</script>

<style scoped lang="less">
.mobile-tab-bar-container{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: var(--tab-bg-color);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    transition: all 0.4s cubic-bezier(.7,.2,.64,.9);
    will-change: transform;
    ul{
        width:100%;
        height:100%;
        display: flex;
        flex-direction: row;
        list-style:none;
        .tab-item{
            position: relative;
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content:center;
            align-items: center;
            color: var(--home-font-color);
            cursor: pointer;
            .icon{
                position: relative;
                width:40px;
                height:40px;
                z-index:2;
                transition: transform 0.4s cubic-bezier(.7,.2,.64,.9);
                transform: scale(1.0);
                &-active{
                    transform: scale(1.2) translateY(-20px);
                }
            }
            .shadow{
                position: absolute;
                top: 10px;
                left: 20px;
                width:40px;
                height:40px;
                z-index: 1;
                opacity: 0.5;
                filter: blur(5px);
                &-active{
                    transform: scale(1.2) translateY(-20px);
                }
            }
        }
        .indicator{
            position: absolute;
            top: -50%;
            left:10px;
            width:calc(100%/4 - 20px);
            height:calc(100vw/4 - 20px);
            background-color: var(--tab-bg-color);
            border-top-left-radius: 50%;
            border-top-right-radius: 50%;
            border: 6px solid var(--bg-color);
            transition: transform 0.4s cubic-bezier(.7,.2,.64,.9);
            will-change: transform;
        }
    }
}
</style>