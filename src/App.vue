<template>
  <div class="main">
    <router-view/>
    <Loading :is_loading = 'is_loading'></Loading>
  </div>
</template>

<script>
import { computed ,onMounted } from 'vue'
import Loading from '@/components/PublicComponents/Loading.vue'
import store from '@/store'
import { commit_mobile_state } from '@/utils/store'

export default {
    components: {
        Loading
    },
    setup() {
        onMounted(() =>{
          let _is_mobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
          if(_is_mobile){
            commit_mobile_state(true)
          }else{
            commit_mobile_state(false)
          }
        })
        return {
          is_loading: computed(() => store.state.is_loading),
        }
    }
}
</script>
<style lang="less">
.main{
  width:100vw;
  height:100vh;
}
</style>
