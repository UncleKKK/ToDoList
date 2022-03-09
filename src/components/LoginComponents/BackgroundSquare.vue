<template lang="pug">  
block content
    .background-square(:class = 'is_show ? "show-square" : "" ')
      .square(style = '--i:0')
      .square(style = '--i:1')
      .square(style = '--i:2')
      .square(style = '--i:3')
      .square(style = '--i:4')
</template>

<script>
import { reactive, ref ,toRefs ,onMounted } from 'vue'

export default {
  name: 'BackgroundSquare',
  props:{
      is_show:{
          type:Boolean
      },
  },
  setup (props){
     
  }
}
</script>
<style scoped>
@keyframes move-animation
{
    0%,100%{
        transform:translate3d(0,0,0)
    }
    50%{
        transform:translate3d(0,-40px,0)
    }
}
.background-square
{
  position:absolute;
  width:100%;
  height:100%;
  overflow:hidden;
  transition: transform 0.4s cubic-bezier(.7,.2,.64,.9),opacity 0.4s cubic-bezier(.7,.2,.64,.9);
  opacity:0;
  transform: translate3d(0,40px,0);
  z-index: 11;
}
.show-square
{
    opacity:1;
    transform:translateY(0px);
}
.background-square .square
{
  z-index: 100;
  position:absolute;
  top:40%;
  left:20%;
  width:200px;
  height:200px;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0,0,0,0.1);
  background:rgba(255,255,255,0.1);
  border-radius:10px;
  border: 1px solid rgba(255,255,255,0.5);
  border-right: 1px solid rgba(255,255,255,0.2);
  border-bottom: 1px solid rgba(255,255,255,0.2);
  animation:move-animation 4.0s linear 0.56s infinite;
  animation-delay: calc(var(--i) * 1.2s);
  pointer-events:none;
}
.background-square .square:nth-child(2)
{
    top: 15%;
    left:30%;
    width:50px;
    height:50px;
}
.background-square .square:nth-child(3)
{
    top: 17%;
    left:60%;
    width:120px;
    height:120px;
    z-index: 0;
}
.background-square .square:nth-child(4)
{
    bottom: 17%;
    left:80%;
    width:60px;
    height:60px;
}
.background-square .square:nth-child(5)
{
    top: 80%;
    left: calc(50% - 75px/2);
    width:75px;
    height:75px;
}
@media screen and (max-width:768px) {
    .background-square .square:nth-child(1)
    {
        top: 20%;
        left:5%;
        width:80px;
        height:80px;
    }
    .background-square .square:nth-child(2)
    {
        top: 10%;
        left:calc(50% - 50px/2);
        width:50px;
        height:50px;
    }
    .background-square .square:nth-child(4)
    {
        top: 70%;
        left:60%;
        width:120px;
        height:120px;
        z-index: 0;
    }
    .background-square .square:nth-child(5)
    {
        top: 80%;
        left: 12%;
        width:75px;
        height:75px;
    }
}
</style>
