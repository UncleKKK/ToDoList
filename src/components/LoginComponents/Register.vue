<template lang="pug">  
block content
    .input-container.input-container-register(:class = 'is_show_input_container ? "input-container-show":"" ')
        InputBox(inputType = 'username' :input_value = 'data_value')
        InputBox(inputType = 'password' :input_value = 'data_value')
        InputBox(inputType = 're-password' placeholder_text = 'RE-ENTER PASSWORD' :input_value = 'data_value')
        LoadingButton(button_text = 'Register' @login_button_tap_action_call_back = 'register_button_tap_action' :is_loading = 'styleRef.is_loading')
        a
            span.forget-password(@click = 'register_back_to_login_tap_action') Back To Login
        text.state-message(:class = 'styleRef.is_show_state_message ? "state-message-show":"state-message-hide" ') {{ dataRef.state_message }}
</template>

<script>
import { reactive, ref ,toRefs ,onMounted } from 'vue'
import InputBox from '@/components/LoginComponents/InputBox.vue'
import LoadingButton from '@/components/LoginComponents/LoadingButton.vue'
import { 
  request_login__register
} from '@/utils/network/request_util.js'

export default {
  name: 'Register',
  components: {
    InputBox,
    LoadingButton
  },
  props:{
    is_show_input_container:{
        type:Boolean
    },
    data_value:{}
  },
  emits:['register_back_to_login_tap_action_call_back'],
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
    const register_back_to_login_tap_action = () =>{
        emit('register_back_to_login_tap_action_call_back')
    }
    const register_button_tap_action = () =>{
        if(props.data_value.username.length === 0){
            set_show_state_message_animation_state('请输入用户名')
        }else if (props.data_value.password.length === 0){
            set_show_state_message_animation_state('请输入密码')
        }else if(props.data_value.re_password !== props.data_value.password){
            set_show_state_message_animation_state('两次密码输入不一致')
        }else{
            styleRef.is_loading = true
            request_login__register(props.data_value.username,props.data_value.password,props.data_value.re_password)
            .then(res => {
                styleRef.is_loading = false
                set_show_state_message_animation_state('注册成功')
            })
            .catch(err => {
                styleRef.is_loading = false
                set_show_state_message_animation_state(err)
            })
      }
    }
    return{
        styleRef,
        dataRef,
        register_button_tap_action,
        register_back_to_login_tap_action,
    }
  }
}
</script>
<style scoped src="../../assets/style/login.css"></style>
