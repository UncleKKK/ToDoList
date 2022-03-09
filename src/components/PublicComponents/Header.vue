<template lang="pug">
block content
    TabBar(:current_selected_index = 'current_selected_index' v-if = '!is_mobile')
    MobileTabBar(:current_selected_index = 'current_selected_index' v-else)
    .main-container(:style = 'styleRef.main_style')
        .header
            h2 {{ title }}
            text {{ subtitle }}
        slot(name = 'content')
</template>

<script>
import { reactive, ref ,toRefs ,onMounted, computed } from 'vue'
import TabBar from '@/components/PublicComponents/TabBar.vue'
import MobileTabBar from '@/components/PublicComponents/MobileTabBar.vue'
import store from '@/store'

export default {
    name: 'Header',
    components: {
        TabBar,
        MobileTabBar
    },
    props:{
        current_selected_index:{
            type: Number,
            default:0
        },
        title:{
            type:String
        },
        subtitle:{
            type:String
        }
    },
    setup(props,{ emit }){
        const styleRef = reactive({
            main_style:'background:#FFDAC2;'
        })
        const set_main_style_with_current_selected_index = (current_selected_index) =>{
            switch(current_selected_index){
                case 0:
                    styleRef.main_style = 'background:var(--home-bg-color)'
                    break
                case 1:
                    styleRef.main_style = 'background:var(--pin-bg-color)'
                    break
                case 2:
                    styleRef.main_style = 'background:var(--message-bg-color)'
                    break
                case 3:
                    styleRef.main_style = 'background:var(--user-bg-color)'
                    break
            }
        }
        onMounted(() => {
            set_main_style_with_current_selected_index(props.current_selected_index)
        })
        return{
            styleRef,
            is_mobile: computed(() => store.state.is_mobile)
        }
    }
}
</script>

<style scoped lang="less">
.main-container{
    position: relative;
    width:40%;
    min-height: 480px;
    height: calc(100% - 120px);
    border-radius:20px;
    display: flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
    padding:30px 20px 10px 40px;
    .header{
        display: flex;
        flex-direction:column;
        justify-content:flex-start;
        color: var(--home-font-color);
        margin-bottom: 30px;
        text{
            font-size:14px;
            // opacity:0.8;
            white-space:pre-wrap;
        }
    }
}
@media screen and (max-width:768px) {
    .main-container{
        width:calc(100% - 10px);
        min-height: 480px;
        height: calc(100% - 120px);
        border-radius:20px;
        display: flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:flex-start;
        padding:40px 20px 10px 20px;
        .header{
            display: flex;
            flex-direction:column;
            justify-content:flex-start;
            color: var(--home-font-color);
            margin-bottom: 30px;
            text{
                font-size:14px;
                // opacity:0.8;
                white-space:pre-wrap;
            }
        }
    }
}
</style>