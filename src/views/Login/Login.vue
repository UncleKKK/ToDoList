<template lang="pug">  
block content
  .container
    .background
      section
        .section-1
        .section-2
      section
        .section-3(:class = 'styleRef.is_show_forget ? "left-out":"left-in" ')
        .section-4(:class = 'styleRef.is_show_forget ? "right-out":"right-in" ')
      section
        .section-5(:class = 'styleRef.is_show_register ? "left-in":"left-out" ')
        .section-6(:class = 'styleRef.is_show_register ? "right-in":"right-out" ')
    BackgroundSquare(:is_show = 'styleRef.is_show_square')
    .container-main
      h2.title(:class = 'styleRef.is_show_input_container ? "title-show":"" ') {{ dataRef.title }}
      section.register(v-if = 'styleRef.is_show_register')
        Register(:is_show_input_container = 'styleRef.is_show_input_container' 
                 :data_value = 'dataRef.input_value'
                 @register_back_to_login_tap_action_call_back = 'register_back_to_login_tap_action')
      section.forget-password(v-else-if = 'styleRef.is_show_forget')
        ForgetPassword(:is_show_input_container = 'styleRef.is_show_input_container' 
                       :data_value = 'dataRef.input_value'
                       @forget_password_back_to_login_tap_action_call_back = 'forget_password_back_to_login_tap_action')
      section.login(v-else)
        LoginComponent(:is_show_input_container = 'styleRef.is_show_input_container' 
                       :data_value = 'dataRef.input_value'
                       @to_forget_password_tap_action_call_back = 'to_forget_password_tap_action'
                       @to_register_tap_action_call_back = 'to_register_tap_action')
</template>

<script>
import { reactive, ref ,toRefs ,onMounted } from 'vue'
import Register from '@/components/LoginComponents/Register.vue'
import LoginComponent from '@/components/LoginComponents/LoginComponent.vue'
import ForgetPassword from '@/components/LoginComponents/ForgetPassword.vue'
import BackgroundSquare from '@/components/LoginComponents/BackgroundSquare.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  components: {
    BackgroundSquare,
    Register,
    LoginComponent,
    ForgetPassword
  },
  setup (){
    const styleRef = reactive({
      is_show_input_container: false,
      is_show_square :false,
      is_show_register:false,
      is_show_forget:false,
    })
    const dataRef = reactive({
      input_value:{
        username:'',
        password:'',
        re_password:'',
      },
        title:'login'
    })
    // -- tap action
    // -- page change action
    const to_register_tap_action = () =>{
        styleRef.is_show_register = true
        setTimeout(() => { dataRef.title = 'register' },400)
        set_hide_and_show_animation_group_state()
        set_input_value_def()
    } 
    const to_forget_password_tap_action = ()=>{
        styleRef.is_show_forget = true
        setTimeout(() => { dataRef.title = 'forget password' },400)
        set_hide_and_show_animation_group_state()
        set_input_value_def()
    }
    const forget_password_back_to_login_tap_action = () =>{
        styleRef.is_show_forget = false
        setTimeout(() => { dataRef.title = 'login' },400)
        set_hide_and_show_animation_group_state()
        set_input_value_def()
    }
    const register_back_to_login_tap_action = () => {
        styleRef.is_show_register = false
        setTimeout(() => { dataRef.title = 'login' },400)
        set_hide_and_show_animation_group_state()
        set_input_value_def()
    }
    // -- animation state
    const set_show_animation_state = () =>{
      setTimeout(() => {
        styleRef.is_show_input_container = true
        styleRef.is_show_square = true
      },1200)
    }
    const set_hide_animation_state = () =>{
        styleRef.is_show_input_container = false
        styleRef.is_show_square = false
    }
    const set_hide_and_show_animation_group_state = () =>{
        set_hide_animation_state()
        set_show_animation_state()
    }
    // -- set def data
    const set_input_value_def = () =>{
        dataRef.input_value = {
          username:'',
          password:'',
          re_password:'',
        }
    }
    onMounted(() => {
      set_show_animation_state()
    })
    return {
      styleRef,
      dataRef,
      to_register_tap_action,
      to_forget_password_tap_action,
      register_back_to_login_tap_action,
      forget_password_back_to_login_tap_action,
    }
  }
}
</script>
<style scoped>
.container
{
  width:100vw;
  height: 100vh;
  background-color:rgba(255, 255, 255, 0.3);
  font-family: 'Poppins', STFangsong ,sans-serif;
  font-style: italic;
  font-weight: bold;
}
.container .background
{
  position:absolute;
  width:100%;
  height:100%;
  overflow:hidden;
}
.container .background section
{
  position:absolute;
  width:100%;
  height:100%;
  display: flex;
  flex-direction:row;
}
@keyframes right-out-animation
{
   35%{
    transform: rotate(-15deg) translate3d(35%,0,0);
  }70%{
    transform: rotate(15deg) translate3d(70%,0,0);
  }100%{
    transform: rotate(0deg) translate3d(100%,0,0);
  }
}
@keyframes left-out-animation
{
  35%{
    transform: rotate(15deg) translate3d(-35%,0,0);
  }70%{
    transform: rotate(-15deg) translate3d(-70%,0,0);
  }100%{
    transform: rotate(0deg) translate3d(-100%,0,0);
  }
}
@keyframes right-in-animation
{
   35%{
    transform: rotate(15deg) translate3d(-35%,0,0);
  }70%{
    transform: rotate(-15deg) translate3d(-70%,0,0);
  }100%{
    transform: rotate(0deg) translate3d(-100%,0,0);
  }
}
@keyframes left-in-animation
{
  35%{
    transform: rotate(-15deg) translate3d(35%,0,0);
  }70%{
    transform: rotate(15deg) translate3d(70%,0,0);
  }100%{
    transform: rotate(0deg) translate3d(100%,0,0);
  }
}
.container .background .left-in
{
  left:-50%;
  animation: left-in-animation .8s both cubic-bezier(.7,.2,.64,.9);
  z-index: 11;
}
.container .background .left-out
{
  animation: left-out-animation .8s both cubic-bezier(.7,.2,.64,.9);
  z-index: 11;
}
.container .background .right-in
{
  left: 50%;
  animation: right-in-animation .8s both cubic-bezier(.7,.2,.64,.9);
  z-index: 11;
}
.container .background .right-out
{
  animation: right-out-animation .8s both cubic-bezier(.7,.2,.64,.9);
  z-index: 11;
}
.container .background div[class^="section"]
{
  position:relative;
  top: -100%;
  width:50%;
  height:300%;
}
.container .background .section-1
{
  background-color:rgb(193, 137, 85);
}
.container .background .section-2
{
  background-color:rgb(99, 79, 148);
}
.container .background .section-3
{
  background-color:rgb(174, 99, 171);
}
.container .background .section-4
{
  background-color:rgb(129, 155, 67);
}
.container .background .section-5
{
  background-color:rgb(109, 125, 167);
}
.container .background .section-6
{
  background-color:rgb(124, 199, 190);
}
.container .container-main
{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  display: flex;
  justify-content:center;
  background:url('../../assets/light.png') no-repeat;
  background-size: cover;
  background-position: center center;
  z-index: 100;
  justify-content:center;
}
.container .container-main .title
{
  position:absolute;
  top:5%;
  text-align: center;
  font-size: 4.5em;
  color:#F4F4F4;
  z-index: 101;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-shadow: 1px 2px 2px rgba(255,255,255,0.3);
  transition: transform 0.4s cubic-bezier(.7,.2,.64,.9),opacity 0.4s cubic-bezier(.7,.2,.64,.9);
  transform:translateY(40px);
  opacity:0;
}
@media screen and (max-width:768px) {
    .container .container-main section
    {
        width:100%;
        height:100%;
        display: flex;
        justify-content:center;
    }
    .container .background div[class^="section"]
    {
        position:relative;
        top: -100%;
        width:100%;
        height:300%;
    }
    @keyframes right-out-animation
    {
        35%{
            transform: rotate(-8deg) translate3d(35%,0,0);
        }70%{
            transform: rotate(8deg) translate3d(70%,0,0);
        }100%{
            transform: rotate(0deg) translate3d(100%,0,0);
        }
    }
    @keyframes left-out-animation
    {
        35%{
            transform: rotate(8deg) translate3d(-35%,0,0);
        }70%{
            transform: rotate(-8deg) translate3d(-70%,0,0);
        }100%{
            transform: rotate(0deg) translate3d(-100%,0,0);
        }
    }
    @keyframes right-in-animation
    {
        35%{
            transform: rotate(8deg) translate3d(-35%,0,0);
        }70%{
            transform: rotate(-8deg) translate3d(-70%,0,0);
        }100%{
            transform: rotate(0deg) translate3d(-100%,0,0);
        }
    }
    @keyframes left-in-animation
    {
        35%{
            transform: rotate(-8deg) translate3d(35%,0,0);
        }70%{
            transform: rotate(8deg) translate3d(70%,0,0);
        }100%{
            transform: rotate(0deg) translate3d(100%,0,0);
        }
    }
    .container .container-main .title
    {
        position:absolute;
        top:5%;
        font-size: 2.5em;
        color:#F4F4F4;
        z-index: 101;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        text-shadow: 1px 2px 2px rgba(255,255,255,0.3);
        transition: transform 0.4s cubic-bezier(.7,.2,.64,.9),opacity 0.4s cubic-bezier(.7,.2,.64,.9);
        transform:translateY(40px);
        opacity:0;
    }
}
.container .container-main .title-show
{
    transform:translateY(0px);
    opacity:1;
}
</style>
