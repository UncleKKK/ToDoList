<template lang="pug">  
block content
    .input-box(v-if = 'inputType == "username"')
        input.user-name(type = 'text' v-model = 'modelRef.input_box_value' 
                        @input = 'username__input_box_change_value_action' 
                        @blur = 'username__input_box_key_up_action' 
                        @focus = 'username__input_box_focus_action'
                        maxlength = '25')
        text.placeholder-text {{ modelRef.username_text_value }}
        span(class="line -right")
        span(class="line -top")
        span(class="line -left")
        span(class="line -bottom")
    .input-box(v-if = 'inputType == "password" || inputType == "re-password" ')
        input.password(:type = 'styleRef.is_show_pwd ? "text" : "password"' v-model = 'modelRef.input_box_value' 
                        @input = 'password__input_box_change_value_action' 
                        @blur = 'password__input_box_key_up_action' 
                        @focus = 'password__input_box_focus_action'
                        maxlength = '12')
        text.placeholder-text {{ modelRef.password_text_value }}
        span(class="line -right")
        span(class="line -top")
        span(class="line -left")
        span(class="line -bottom")
        img.show-pwd-icon(:src = 'styleRef.show_pwd_src' @click = 'show_pwd_icon_tap_action')
</template>

<script>
import { reactive, ref ,toRefs ,onMounted,computed,watch } from 'vue'

export default {
  name: 'InputBox',
  props:{
    inputType:{
        type:String
    },
    placeholder_text:{
        type:String
    },
    input_value:{},
  },
  setup (props){
      // -- refs
      const modelRef = reactive({
          input_box_value:'',
          username_text_value: props.placeholder_text ? props.placeholder_text : 'ENTER USERNAME OR EMAIL',
          password_text_value: props.placeholder_text ? props.placeholder_text : 'ENTER PASSWORD'
      })
      const dataRef = reactive({
          username:'',
          password:'',
      })
      const styleRef = reactive({
          is_show_pwd:false,
          show_pwd_src:require('@/assets/hide_pwd_icon.svg')
      })
      // -- username input fun
      const username__input_box_change_value_action = (e) => {
          if(0 === modelRef.input_box_value.length) {
              modelRef.username_text_value = props.placeholder_text ? props.placeholder_text : 'ENTER USERNAME OR EMAIL'
              dataRef.username = ''
          }else{
              modelRef.username_text_value = `USERNAME : ${modelRef.input_box_value}`
          }
      }
      const username__input_box_key_up_action = () => {
          if(0 !== modelRef.input_box_value.length) {
              dataRef.username = modelRef.input_box_value
          }
          modelRef.input_box_value = ''
      }
      const username__input_box_focus_action = () => {
          modelRef.input_box_value = dataRef.username
      }
      // -- password input fun
      const password__input_box_change_value_action = () => {
          if(0 === modelRef.input_box_value.length) {
              modelRef.password_text_value = props.placeholder_text ? props.placeholder_text : 'ENTER PASSWORD'
              dataRef.password = ''
          }else{
              let _password = '' 
              if(!styleRef.is_show_pwd){
                  for(let _ of modelRef.input_box_value){ _password += '＊' }
              }else{
                  _password = modelRef.input_box_value
              }
              modelRef.password_text_value = `PASSWORD : ${_password}`
          }
      }
      const password__input_box_key_up_action = () =>{
          if(0 !== modelRef.input_box_value.length) {
              dataRef.password = modelRef.input_box_value
          }
          modelRef.input_box_value = ''
      }
      const password__input_box_focus_action = () =>{
          modelRef.input_box_value = dataRef.password
      }
      // -- password show-password button action
      const show_pwd_icon_tap_action = () =>{
        styleRef.is_show_pwd = !styleRef.is_show_pwd
        if(!styleRef.is_show_pwd){
            styleRef.show_pwd_src = require('@/assets/hide_pwd_icon.svg')
            if(0 !== dataRef.password.length){
                let _password ='' 
                for(let _ of dataRef.password){ _password += '＊' }
                modelRef.password_text_value = `PASSWORD : ${_password}`
            }
        }else{
            styleRef.show_pwd_src = require('@/assets/show_pwd_icon.svg')
            if(0 !== dataRef.password.length){
                modelRef.password_text_value = `PASSWORD : ${dataRef.password}`
            }
        }
      }
      watch(dataRef,(newValue, oldValue) => {
          if('username' == props.inputType){
              props.input_value.username = oldValue.username
          }else if ('password' == props.inputType){
              props.input_value.password = oldValue.password
          }else if ('re-password' == props.inputType){
              props.input_value.re_password = oldValue.password
          }
      })
      return {
          modelRef,
          dataRef,
          styleRef,
          username__input_box_change_value_action,
          username__input_box_key_up_action,
          username__input_box_focus_action,
          password__input_box_change_value_action,
          password__input_box_key_up_action,
          password__input_box_focus_action,
          show_pwd_icon_tap_action,
      }
  }
}
</script>
<style scoped>
.input-box
{
    position:relative;
    width:80%;
    height:60px;
    display:flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #fff;
    margin-bottom: 20px;
}
.input-box::after
{
  content: "";
  width:2px;
  height:20%;
  position:absolute;
  bottom:0;
  right:0;
  background-color:#fff;
}
.input-box::before
{
  content: "";
  width:2px;
  height:20%;
  position:absolute;
  bottom:0;
  left:0;
  background-color:#fff;
}
.input-box .placeholder-text
{
  position: absolute;
  font-size: 1.25em;
  color: #fff;
  text-shadow: 1px 2px 2px rgba(255,255,255,0.3);
  transition: all 0.3s cubic-bezier(.7,.2,.64,.9);
  white-space: nowrap;
  pointer-events: none;
}
.input-box .user-name,
.input-box .password
{
  border: 0px;
  outline: none;
  padding: 0.75em;
  width:100%;
  height:100%;
  background: transparent;
  color: #fff;
  font-size:1.25em;
  font-family: 'Poppins', sans-serif;
  transition: all 0.4s cubic-bezier(.7,.2,.64,.9);
  z-index: 1;
}
.input-box .line {
  position: absolute;
  background: #F6F6F6;
}
.input-box .line.-right, .input-box .line.-left {
  width: 2px;
  bottom: 0px;
  top: 0px;
  transform: scale3d(1, 0, 1);
}
.input-box .line.-top, .input-box .line.-bottom {
  height: 2px;
  left: 0px;
  right: 0px;
  transform: scale3d(0, 1, 1);
}
.input-box .line.-right {
  right: 0px;
  transition: transform 0.1s cubic-bezier(1, 0, 0.65, 1.01) 0.23s;
  transform-origin: top;
}
.input-box .line.-top {
  top: 0px;
  transition: transform 0.08s linear 0.43s;
  transform-origin: left;
}
.input-box .line.-left {
  left: 0px;
  transition: transform 0.08s linear 0.51s;
  transform-origin: bottom;
}
.input-box .line.-bottom {
  bottom: -2px;
  transition: transform 0.3s cubic-bezier(1, 0, 0.65, 1.01);
  transform-origin: right;
}
.input-box input:focus ~ .line,
.input-box input:active ~ .line {
  transform: scale3d(1, 1, 1);
}
.input-box input:focus ~ .line.-right,
.input-box input:active ~ .line.-right {
  transition: transform 0.1s cubic-bezier(1, 0, 0.65, 1.01) 0.2s;
  transform-origin: bottom;
}
.input-box input:focus ~ .line.-top,
.input-box input:active ~ .line.-top {
  transition: transform 0.08s linear 0.4s;
  transform-origin: right;
}
.input-box input:focus ~ .line.-left,
.input-box input:active ~ .line.-left {
  transition: transform 0.08s linear 0.48s;
  transform-origin: top;
}
.input-box input:focus ~ .line.-bottom,
.input-box input:active ~ .line.-bottom {
  transition: transform 0.5s cubic-bezier(0, 0.53, 0.29, 1) 0.56s;
  transform-origin: left;
}
.input-box input:focus ~ .placeholder-text ,
.input-box input:active ~ .placeholder-text  
{
    transform: translate3d(0,-150%,0);
    z-index: 2;
    mix-blend-mode:difference;
    font-size: 0.8em;
}
.input-box .show-pwd-icon
{
    position: absolute;
    right: -50px;
    width:30px;
    height:30px;
    mix-blend-mode:multiply;
    z-index: 3;
    opacity: 1;
    cursor: pointer;
}
@media screen and (max-width:768px) {
  .input-box .show-pwd-icon
  {
      position: absolute;
      right: -30px;
      width:30px;
      height:30px;
      mix-blend-mode:multiply;
      z-index: 3;
      opacity: 1;
      cursor: pointer;
  }
}
</style>
