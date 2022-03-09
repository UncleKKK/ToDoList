<template lang="pug">
block content
    .container
        Header(:current_selected_index = 'stateRef.current_selected_index' title = '用户中心' :subtitle = 'dataRef.subtitle')
          template(v-slot:content)
              ul
                  li(v-for = '(item,index) in dataRef.item_list' :key = 'index')
                      component(:is = 'item.component' :data = 'item')
              .logout-button.hold
              .logout-button(@click = 'logout_tap_action') 退出登录
</template>

<script>
import { defineComponent, reactive ,onMounted ,getCurrentInstance } from 'vue'
import Header from '@/components/PublicComponents/Header.vue'
import UserAnimationListBox from '@/components/UserComponents/UserAnimationListBox.vue'
import UserTextListBox from '@/components/UserComponents/UserTextListBox.vue'
import UserListBox from '@/components/UserComponents/UserListBox.vue'
import { request_user__info }  from '@/utils/network/request_util.js'
import { __user_itemList } from '@/utils/static/staticData.js'
import { __rebuild_user_data } from '@/utils/rebuild.js'
import { remove_storage_for_token } from '@/utils/storage'
import { useRouter } from 'vue-router'
import { commit_loading_state } from '@/utils/store'

const userInfoPage = defineComponent({
    components: {
        Header,
        UserAnimationListBox,
        UserTextListBox,
        UserListBox
    },
    setup(){
        // -- router
        const router = useRouter()
        const router_to_login = () => {
            commit_loading_state(true)
            setTimeout(() =>{ 
                router.push({ name:'Login' })
                commit_loading_state(false)
            },1500)
        }
        const stateRef = reactive({
            current_selected_index:3
        })
        const dataRef = reactive({
            item_list: __user_itemList,
            user_info: {
            uname:'用户名'
            },
            subtitle:''
        })
        const { proxy } = getCurrentInstance()
        const logout_tap_action = () =>{
            remove_storage_for_token()
            router_to_login()
        }
        const tabbar_item_click_tap_action = (route_path) =>{
            console.log(route_path)
        }
        onMounted(() => {
            request_user__info()
            .then(res =>{
                dataRef.user_info = res
                __rebuild_user_data(res,dataRef.item_list)
                dataRef.subtitle = `您好,${dataRef.user_info.uname}\n您可以通过绑定以下几种方式来获取任务提醒`
            })
            .catch(err => proxy.$showToast(err))
        })
        return {
            dataRef,
            stateRef,
            tabbar_item_click_tap_action,
            logout_tap_action
        }
    }
})

export default userInfoPage
</script>
<style lang="less" scoped>
.container{
    width:100%;
    height:100%;
    display: flex;
    justify-content:center;
    align-items:center;
    padding:20px;
    ul{
        width:100%;
        max-height:100%;
        list-style: none;
        li{
            position:relative;
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            align-items:center;
            margin-bottom:10px;
        }
    }
    .logout-button{
      position: absolute;
      bottom:20px;
      width:calc(100% - 40px*2);
      text-align: center;
      height: 40px;
      background-color:var(--user-btn-bg-color);
      box-shadow: 0 2px 3px 0 #77ACC7;
      border-radius: 6px;
      cursor: pointer;
      line-height:40px;
    }
    .hold{
      background-color: transparent;
      box-shadow: none;
      position:relative;
      top: 0px;
      left: 0px;
      cursor: none;
      margin-bottom: 20px;
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
        ul{
            width:100%;
            max-height:100%;
            list-style: none;
            li{
                position:relative;
                display: flex;
                flex-direction:row;
                justify-content: space-between;
                align-items:center;
                margin-bottom:10px;
            }
        }
        .logout-button{
            position: absolute;
            bottom:20px;
            width:calc(100% - 40px);
            text-align: center;
            height: 40px;
            background-color:var(--user-btn-bg-color);
            box-shadow: 0 2px 3px 0 #77ACC7;
            border-radius: 6px;
            cursor: pointer;
            line-height:40px;
        }
        .hold{
            display:none;
            background-color: transparent;
            box-shadow: none;
            position:relative;
            top: 0px;
            left: 0px;
            cursor: none;
            margin-bottom: 20px;
        }
    }
}
</style>
