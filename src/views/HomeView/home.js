import { defineComponent, ref ,reactive, getCurrentInstance ,onMounted, watch } from 'vue'
import AddTask from '@/components/HomeComponents/AddTask.vue'
import HomeListBox from '@/components/HomeComponents/HomeListBox.vue'
import Header from '@/components/PublicComponents/Header.vue'
import { 
  request_home__add,
  request_home__list
}  from '@/utils/network/request_util.js'
import { __rebuild_home_and_pin_list_data } from '@/utils/rebuild.js'
import store from '@/store'

const homePage = defineComponent({
    components: {
        AddTask,
        HomeListBox,
        Header
    },
    setup(){
      // -- refs & data
      const task_list = ref(null)
      const styleRef = reactive({
        is_loading: false,
        is_show_add_task: true
      })
      const stateRef = reactive({
        current_selected_index:0
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
      // -- call back
      const add_task_tap_action = (new_task_content) =>{
        request_home__add(new_task_content)
        .then(res => {
          dataRef.data.unshift(res)
          set_load_more_content(res)
        })
        .catch(err => proxy.$showToast(err))
      }
      const tabbar_item_click_tap_action = (route_path) =>{
          console.log(route_path)
      }
      // -- tap action
      const load_more_tap_action = () => {
        set_mobile_is_edit_def()
        if ('加载更多' != dataRef.load_more_content) return
        dataRef.params.page += 1
        request_home__list(dataRef.params.page,dataRef.params.pageSize)
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
        request_home__list(dataRef.params.page,dataRef.params.pageSize)
        .then(res => {
          dataRef.data = res
          set_load_more_content(res)
        })
        .catch(err => proxy.$showToast(err))
        set_mobile_onscroll_action()
      })
      watch(() => dataRef.data.length,() =>{
        __rebuild_home_and_pin_list_data(dataRef.data)
      })
      return {
        task_list,
        styleRef,
        stateRef,
        dataRef,
        tabbar_item_click_tap_action,
        add_task_tap_action,
        load_more_tap_action
      }
    }
})

export default homePage