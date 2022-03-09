<template lang="pug">  
block content
    .login-button(ref = 'login_button' @click = 'login_button_tap_action')
        text(v-for = 'char,index in dataRef.text' :style = '"--i:" + index + ";--count:" + dataRef.loading_animation_count') {{ char }}
</template>

<script>
import { reactive, ref ,toRefs ,onMounted, watch } from 'vue'

export default {
  name: 'LoadingButton',
  props:{
    button_text:{
        type:String
    },
    login_button_tap_action_call_back:{
        type:Function
    },
    is_loading:{
        type:Boolean
    }
  },
  setup (props,{ emit }){
    // -- refs
    const login_button = ref(null)
    const dataRef = reactive({
        text:props.button_text,
        is_loading:props.is_loading,
        loading_interval:null,
        loading_animation_count:0
    })
    // -- tap action
    const login_button_tap_action = ()=>{
        emit('login_button_tap_action_call_back')
    }
    // -- loading state function
    const set_add_loading_infinite = () => {
        dataRef.loading_interval = setInterval(() => {
            dataRef.loading_animation_count += 1
        }, 4000);
    }
    const add_loading_state = () =>{
        dataRef.text = 'Loading...'
        login_button.value.classList.add('loading')
    }
    const remove_loading_state = () => {
        dataRef.text = props.button_text
        login_button.value.classList.remove('loading')
    }
    watch(props,(newValue, oldValue) => {
        if(newValue.is_loading){
            add_loading_state()
            set_add_loading_infinite()
        }else{
            remove_loading_state()
            clearInterval(dataRef.loading_interval)
            dataRef.loading_interval = null
            dataRef.loading_animation_count = 0
        }
    })
    return{
        login_button,
        dataRef,
        login_button_tap_action
    }
  }
}
</script>
<style scoped>
@keyframes loading
{
    from { background-position: 0 0; }
    to { background-position: 320px 0; }
}
@keyframes text-loading
{
    0%,100%{
        transform:translate3d(0,0,0)
    }50%{
        transform:translate3d(0,-5px,0)
    }
}
.login-button
{
    position:relative;
    width:80%;
    height:60px;
    margin-top: 20px;
    text-align: center;
    font-size: 1.25em;
    line-height: 60px;
    color:#fff;
    cursor: pointer;
    text-shadow: 0 25px 45px rgba(0,0,0,0.2);
    transition: background-color 0.4s cubic-bezier(.7,.2,.64,.9);
    display: flex;
    flex-direction:row;
    justify-content:center;
}
.login-button text 
{
    padding:0 0.5px;
}
.login-button::before,
.loading::before
{
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    width:100%;
    height:100%;
    border: 2px solid #F4F4F4;
    z-index: -1;
    transition: transform 0.4s cubic-bezier(.7,.2,.64,.9);
    background:rgba(255,255,255,0.2);
    box-sizing: border-box;
}
.login-button::after,
.loading::after
{
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    width:100%;
    height:100%;
    border: 2px solid #F4F4F4;
    z-index: 1;
    transition: transform 0.4s cubic-bezier(.7,.2,.64,.9);
    background:rgba(255,255,255,0.2);
    box-sizing: border-box;
}
.loading text
{
    animation: text-loading 0.4s cubic-bezier(.7,.2,.64,.9) 4.0s;
    animation-delay: calc(var(--count) * 4.0s + var(--i) * .4s);
}
.login-button:hover
{
    background:#333;
}
.login-button:hover::before
{
    transform: translate3d(5px,5px,0);
}
.login-button:hover::after
{
    transform: translate3d(-5px,-5px,0);
}
.loading
{
    animation:loading 4.0s cubic-bezier(.7,.2,.64,.9) infinite;
    background: linear-gradient(to right,#333 1%,#4B4848 20%,#333 40%);
}
.loading:hover
{
    animation:loading 4.0s cubic-bezier(.7,.2,.64,.9) infinite;
    background: linear-gradient(to right,#333 1%,#4B4848 20%,#333 40%);
}
.loading::before
{
    left:0;
    top: 0;
}
.loading::after
{
    left:0;
    top: 0;
}
.loading:hover::before
{
    transform: translate3d(0,0,0);
}
.loading:hover::after
{
    transform: translate3d(0,0,0);
}
</style>
