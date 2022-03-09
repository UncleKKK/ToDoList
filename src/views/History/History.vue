<template lang="pug">
block content
    .container
        Header(:current_selected_index = 'stateRef.current_selected_index' title = '历史任务')
          template(v-slot:content)
              .history-container
                  HistoryHeader(:data = 'dataRef.data.type' :params = 'dataRef.params' @item_selected_tap_action = 'item_selected_call_back_tap_action')
                  HistoryHeader(:data = 'dataRef.data.tags' :params = 'dataRef.params' @item_selected_tap_action = 'item_selected_call_back_tap_action')
                  HistoryHeader(:data = 'dataRef.data.dates' :params = 'dataRef.params' @item_selected_tap_action = 'item_selected_call_back_tap_action')
              .history-list
                  ul
                      li(v-for = '(item,index) in dataRef.data_list')
                          HistoryListBox(:data = 'item' :key = 'index')
                      .load-more(@click = 'load_more_tap_action') {{ dataRef.load_more_content }}
</template>             

<script>
import { defineComponent, reactive, onMounted, getCurrentInstance } from 'vue'
import Header from '@/components/PublicComponents/Header.vue'
import HistoryHeader from '@/components/HistoryComponents/HistoryHeader.vue'
import HistoryListBox from '@/components/HistoryComponents/HistoryListBox.vue'
import { __rebuild_search_data } from '@/utils/rebuild.js'
import { 
  request_search__items,
  request_search__list
} from '@/utils/network/request_util.js'

const historyPage = defineComponent({
    components: {
        Header,
        HistoryHeader,
        HistoryListBox
    },
    setup(){
      // -- refs
      const stateRef = reactive({
        current_selected_index:2
      })
      const dataRef = reactive({
        data:{ type:[],dates:[],tags:[] },
        params: { stype:'每日任务',date:'全部',tag:'全部',page:1 },
        data_list :[],
        load_more_content:'加载更多'
      })
      // -- instance
      const { proxy } = getCurrentInstance()
      const tabbar_item_click_tap_action = (route_path) =>{
          console.log(route_path)
      }
      // -- tap action
      const item_selected_call_back_tap_action = () =>{
          dataRef.params.page = 1
          _request_search_list_firest()
          .then(res => {
            dataRef.data_list = res
            set_load_more_content(res)
          })
          .catch(err => proxy.$showToast(err))
      }
      const load_more_tap_action = () =>{
        if ('加载更多' != dataRef.load_more_content) return
        dataRef.params.page += 1
        _request_search_list_firest()
        .then(res => {
          res.forEach(item => { dataRef.data_list.push(item) })
          set_load_more_content(res)
        })
        .catch(err => proxy.$showToast(err))
      }
      // -- fun
      const set_load_more_content = (res) =>{
        dataRef.load_more_content = res.length == 20 ? '加载更多' : '没有更多任务了'
      }
      // -- request
      const _request_search_list_firest = () =>{
        return new Promise((resolve, reject) =>{
          request_search__list(dataRef.params.stype, dataRef.params.tag,dataRef.params.date,dataRef.params.page)
          .then(res => resolve(res))
          .catch(err => reject(err))
        })
      }
      onMounted(() => {
        request_search__items()
        .then(res => {
          __rebuild_search_data(res)
          dataRef.data = res
        })
        .then(_request_search_list_firest)
        .then(res => {
          dataRef.data_list = res
          set_load_more_content(res)
        })
        .catch(err => proxy.$showToast(err))
      })
      return {
        stateRef,
        dataRef,
        tabbar_item_click_tap_action,
        item_selected_call_back_tap_action,
        load_more_tap_action
      }
    }
})

export default historyPage
</script>
<style lang="less" scoped>
.container{
    width:100%;
    height:100%;
    display: flex;
    justify-content:center;
    align-items:center;
    font-family: PingFangSC-Medium, sans-serif;
    .history-container{
        width:calc(100% - 20px);
        height:auto;
        border: 2px dashed #464646;
        border-radius:10px;
        padding:0px 10px;
        display: flex;
        flex-direction:column;
        justify-content:space-between;
    }
    .history-list{
      margin-top:20px;
      width:calc(100% - 20px);
      overflow:auto;
      ul{
        list-style: none;
        width:100%;
        max-height:100%;
        li{
          width:100%;
          display: flex;
          align-items:center;
          justify-content: space-between;
          font-size: 1.25em;
          color: var(--home-font-color);
        }
        .load-more{
          width:100%;
          height:40px;
          font-size: 1.25em;
          color: var(--home-font-color);
          background:#FFF8DA;
          text-align: center;
          line-height:40px;
          border-radius:10px;
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
        .history-container{
            width:calc(100%);
            height:auto;
            border: 2px dashed #464646;
            border-radius:10px;
            padding:0px 10px;
            display: flex;
            flex-direction:column;
            justify-content:space-between;
        }
        .history-list{
          margin-top:20px;
          width:calc(100%);
          overflow:auto;
          ul{
            list-style: none;
            width:100%;
            max-height:100%;
            li{
              width:100%;
              display: flex;
              align-items:center;
              justify-content: space-between;
              font-size: 1.25em;
              color: var(--home-font-color);
            }
            .load-more{
              width:100%;
              height:40px;
              font-size: 1.25em;
              color: var(--home-font-color);
              background:#FFF8DA;
              text-align: center;
              line-height:40px;
              border-radius:10px;
              cursor: pointer;
            }
          }
        }
    }
}
</style>
