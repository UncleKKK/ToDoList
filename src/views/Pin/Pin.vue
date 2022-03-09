<template lang="pug">
block content
    .container
        Header(:current_selected_index = 'stateRef.current_selected_index' title = '标记任务' subtitle = '如您设置了⏰截止时间会通过用户中心绑定的信息通知您')
          template(v-slot:content)
              PinAddTask(@add_task_action = 'add_task_tap_action')
              .task-list(ref = 'task_list')
                  ul
                      li(v-for = '(item,index) in dataRef.data')
                          PinListBox(:data = 'item' :key = 'index')
                      .load-more(@click = 'load_more_tap_action') {{ dataRef.load_more_content }}
</template>

<script>
import { defineComponent, reactive, ref ,getCurrentInstance , onMounted , watch} from 'vue'
import Header from '@/components/PublicComponents/Header.vue'
import PinAddTask from '@/components/PinComponents/PinAddTask.vue'
import PinListBox from '@/components/PinComponents/PinListBox.vue'
import { 
    request_pin__add,
    request_pin__list
}  from '@/utils/network/request_util.js'
import { __rebuild_home_and_pin_list_data } from '@/utils/rebuild.js'
import store from '@/store'

const pinPage = defineComponent({
    components: {
        Header,
        PinAddTask,
        PinListBox
    },
    setup(){
      const task_list = ref(null)
      const stateRef = reactive({
        current_selected_index:1
      })
      const dataRef = reactive({
        data:[],
        params:{ page:1,pageSize:20 },
        load_more_content:'加载更多'
      })
      const mobileRef = {
        scroll_timer:null,
        is_scroll_editing:false,
        is_mobile: store.state.is_mobile
      }
      const { proxy } = getCurrentInstance()
      const tabbar_item_click_tap_action = (route_path) =>{
          console.log(route_path)
      }
      // -- call back
      const add_task_tap_action = (e) =>{
          request_pin__add(e)
          .then((res) => {
            dataRef.data.push(res)
            set_load_more_content(res)
          })
          .catch((err) => proxy.$showToast(err))
      }
      // -- tap action
      const load_more_tap_action = () => {
        if ('加载更多' != dataRef.load_more_content) return
        dataRef.params.page += 1
        request_pin__list(dataRef.params.page,dataRef.params.pageSize)
        .then(res => {
          res.forEach(item => { dataRef.data.push(item) })
          set_load_more_content(res)
        })
        .catch(err => proxy.$showToast(err))
      }
      // -- fun
      const set_load_more_content = (res) =>{
        dataRef.load_more_content = res.length == dataRef.params.pageSize ? '加载更多' : '没有更多任务了'
      }
      const set_mobile_onscroll_action = () =>{
        task_list.value.addEventListener('scroll',() =>{
          if(!mobileRef.is_scroll_editing){
            set_mobile_is_edit_def()
            mobileRef.is_scroll_editing = true
            if(mobileRef.scroll_timer) clearTimeout(mobileRef.scroll_timer)
            mobileRef.scroll_timer = setTimeout(() =>{ mobileRef.is_scroll_editing = false },1000)
          }
        })
      }
      const set_mobile_is_edit_def = () =>{
        if(!mobileRef.is_mobile) return
        dataRef.data.forEach(item => {
          item.is_edit = false
        })
      }
      onMounted(() => {
          set_mobile_onscroll_action()
          request_pin__list(dataRef.params.page,dataRef.params.pageSize)
          .then((res) => {
            dataRef.data = res
            set_load_more_content(res)
          })
          .catch((err) => proxy.$showToast(err))
      })
      watch(() => dataRef.data.length,() =>{
        __rebuild_home_and_pin_list_data(dataRef.data)
      })
      return {
        task_list,
        dataRef,
        stateRef,
        tabbar_item_click_tap_action,
        add_task_tap_action
      }
    }
})

export default pinPage
</script>
<style lang="less" scoped>
.container{
    width:100%;
    height:100%;
    display: flex;
    justify-content:center;
    align-items:center;
    padding:20px;
    font-family: PingFangSC-Medium, sans-serif;
    .task-list{
      width:100%;
      overflow:auto;
      ul{
        list-style:none;
        width:100%;
        max-height:100%;
        li{
          width:100%;
          display: flex;
          align-items:center;
          justify-content: space-between;
          font-size: 1.25em;
          color: var(--home-font-color);
          transition: all 0.3s linear;
        }
        .load-more{
          width:calc(100% - 25px - 7.5px);
          height:40px;
          font-size: 1.25em;
          color: var(--home-font-color);
          background:#F3F9FF;
          text-align: center;
          line-height:40px;
          border-radius: 10px;
          cursor: pointer;
        }
      }
    }
}
@media screen and (max-width:768px) {
    .container{
        width:100%;
        height:100%;
        display: flex;
        justify-content:center;
        align-items:flex-start;
        padding:5px;
        font-family: PingFangSC-Medium, sans-serif;
        .task-list{
          width:100%;
          overflow:auto;
          ul{
            list-style:none;
            width:100%;
            max-height:100%;
            li{
              width:100%;
              display: flex;
              align-items:center;
              justify-content: space-between;
              font-size: 1.25em;
              color: var(--home-font-color);
              transition: all 0.3s linear;
            }
            .load-more{
              width:100%;
              height:40px;
              font-size: 1.25em;
              color: var(--home-font-color);
              background:#F3F9FF;
              text-align: center;
              line-height:40px;
              border-radius: 10px;
              cursor: pointer;
            }
          }
        }
    }
}
</style>
