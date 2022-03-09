<template lang="pug">
block content
    ul.history-header
        span.title {{ data.name }}
        .row-list
            template(v-for = '(item,index) in data.values')
                li(:class = 'item.is_selected ? "selected":"" ' @click = 'item_selected_tap_action(item)')
                    span {{ item.value }}
</template>             

<script>
import { defineComponent, reactive, ref ,toRefs ,onMounted, computed } from 'vue'

const historyHeader = defineComponent({
    name: 'HistoryHeader',
    props:{
        data:{
            type: Object,
        },
        params:{
            type: Object,
        }
    },
    emits:['item_selected_tap_action'],
    setup(props,{ emit }){
        const item_selected_tap_action = (e) =>{
            props.data.values.forEach(item => {
                item.is_selected = false
            })
            e.is_selected = true
            set_params(e.value)
            emit('item_selected_tap_action')
        }
        const set_params = (e) =>{
            switch(props.data.type) {
                case 0:
                    props.params.stype = e
                    break
                case 1:
                    props.params.tag = e
                    break
                case 2:
                    props.params.date = e
                    break
            }
        }
        return {
            item_selected_tap_action
        }
    }
})

export default historyHeader
</script>
<style lang="less" scoped>
.history-header{
    list-style: none;
    display: flex;
    flex-direction:row;
    align-items:center;
    justify-content: space-between;
    padding: 5px;
    color:#464646;
    font-family: PingFangSC-Medium, sans-serif;
    .title{
        width:80px;
    }
    .row-list{
        flex: 1;
        display: flex;
        flex-direction:row;
        align-items:center;
        overflow-x: auto;
        li{
            margin-right: 10px;
            padding: 5px 10px;
            cursor: pointer;
            background:#F8DE6A;
            border-radius:20px;
            span{
                white-space: nowrap;
            }
        }
        .selected{
            background-color:#FFF8DA;
            border-radius:20px;
        }
    }    
}
</style>
