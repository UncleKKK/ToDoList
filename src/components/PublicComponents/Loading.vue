<template lang="pug">
block content
    teleport(to = '#app')
        .loading-cover-container
            .loading-cover
                template(v-for = 'item in [1,2,3,4,5,6,7,8,9,0,1,2,3,3,3,3]')
                    .loading-item(:class = 'is_loading ? "show":"" ')
</template>

<script>
import { reactive, ref ,toRefs ,onMounted, watch } from 'vue'

export default {
    name: 'Loading',
    props:{
        is_loading:{
            type: Boolean,
        }
    },
    setup(props,{ emit }){
    }
}
</script>

<style scoped lang="less">
.loading-cover-container{
    display:flex;
    justify-content:center;
    position: absolute;
    top: 0;
    left: 0;
    width:100vw;
    height:100vh;
    z-index: 102;
    pointer-events: none;
    .loading-cover
    {
        position: absolute;
        top: 0;
        left: -60%;
        width:160%;
        height:100%;
        display: flex;
        flex-direction: row;
        overflow:hidden;
        .loading-item{
            transform:rotate(-45deg) translate3d(0,-100%,0);
            width:10%;
            height:200%;
            transform-origin: 0 0;
            border-radius:20px;
            transition: transform 0.8s cubic-bezier(.7,.2,.64,.9);
            pointer-events: auto;
            will-change: transform;
            &:nth-child(3n+1){
                background-color:var(--tab-section1-color);
                transition-delay: 0.2s;
            }
            &:nth-child(3n+2){
                background-color:var(--tab-section2-color);
                transition-delay: 0.125s;
            }
            &:nth-child(3n+3){
                background-color:var(--tab-section3-color);
                transition-delay: 0.3s;
            }
        }
        .show{
            &:nth-child(3n+1){
                transform:rotate(-45deg) translate3d(0,-20px,0);
            }
            &:nth-child(3n+2){
                transform:rotate(-45deg) translate3d(0,-20px,0);
            }
            &:nth-child(3n+3){
                transform:rotate(-45deg) translate3d(0,-20px,0);
            }
        }
        @media screen and (max-width:768px) {
           .loading-item{
                transform:rotate(-15deg) translate3d(0,-100%,0);
                width:10%;
                height:200%;
                transform-origin: 0 0;
                border-radius:20px;
                transition: transform 0.8s cubic-bezier(.7,.2,.64,.9);
                pointer-events: auto;
                will-change: transform;
                &:nth-child(3n+1){
                    background-color:var(--tab-section1-color);
                    transition-delay: 0.2s;
                }
                &:nth-child(3n+2){
                    background-color:var(--tab-section2-color);
                    transition-delay: 0.125s;
                }
                &:nth-child(3n+3){
                    background-color:var(--tab-section3-color);
                    transition-delay: 0.3s;
                }
            }
            .show{
                &:nth-child(3n+1){
                    transform:rotate(-15deg) translate3d(0,-20px,0);
                }
                &:nth-child(3n+2){
                    transform:rotate(-15deg) translate3d(0,-20px,0);
                }
                &:nth-child(3n+3){
                    transform:rotate(-15deg) translate3d(0,-20px,0);
                }
            } 
        }
    }
}
</style>