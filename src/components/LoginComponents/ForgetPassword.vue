<template lang="pug">  
block content
    .input-container.input-container-register(:class = 'is_show_input_container ? "input-container-show":"" ')
        InputBox(inputType = 'username' placeholder_text = 'REGISTRATION EMAIL' :input_value = 'data_value')
        InputBox(inputType = 'password' :input_value = 'data_value')
        InputBox(inputType = 're-password' placeholder_text = 'RE-ENTER PASSWORD' :input_value = 'data_value')
        LoadingButton(button_text = 'ChangePassword' @login_button_tap_action_call_back = 'change_password_button_tap_action' :is_loading = 'styleRef.is_loading')
        a
            span.forget-password(@click = 'forget_password_back_to_login_tap_action') Back To Login
        text.state-message(:class = 'styleRef.is_show_state_message ? "state-message-show":"state-message-hide" ') {{ dataRef.state_message }}
</template>

<script>
import { reactive, ref ,toRefs ,onMounted } from 'vue'
import InputBox from '@/components/LoginComponents/InputBox.vue'
import LoadingButton from '@/components/LoginComponents/LoadingButton.vue'
// import { reqeust_manger_post } from '@/utils/httpManger'

export default {
  name: 'ForgetPassword',
  components: {
    InputBox,
    LoadingButton
  },
  props:{
    is_show_input_container:{
        type:Boolean
    },
    data_value:{},
    forget_password_back_to_login_tap_action_call_back:{
        type:Function
    }
  },
  setup (props,{ emit }){
    // -- refs
    const styleRef = reactive({
      is_show_state_message:false,
      is_loading:false,
    })
    const dataRef = reactive({
        state_message:'',
    })
    const set_show_state_message_animation_state = (state_message) => {
        if(styleRef.is_show_state_message){ styleRef.is_show_state_message = false }
        dataRef.state_message = state_message
        styleRef.is_show_state_message = true
        setTimeout(() =>{ styleRef.is_show_state_message = false },4000)
    }
    // -- tap action
    const forget_password_back_to_login_tap_action = () =>{
        emit('forget_password_back_to_login_tap_action_call_back')
    }
    const change_password_button_tap_action = () =>{
        styleRef.is_loading = true
        setTimeout(() => { 
            styleRef.is_loading = false 
            set_show_state_message_animation_state('功能暂未开放')
        },4000)
    }
    return{
        styleRef,
        dataRef,
        change_password_button_tap_action,
        forget_password_back_to_login_tap_action,
    }
  }
}
</script>
<style scoped src="../../assets/style/login.css"></style>
