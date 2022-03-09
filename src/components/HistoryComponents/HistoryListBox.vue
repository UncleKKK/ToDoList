<template lang="pug">
block content
    .list-box-container(:class = 'styleRef.is_del ? "list-box-container-hide":"list-box-container-show" ' :style = 'styleRef.list_box_style')
        .main-box-content(ref = 'main_box_content' :style = 'styleRef.main_style')
            .content-view
                span(ref = 'box_content' spellcheck = 'false') {{ data.content }}
                .type-checker(:class = 'data.is_done ? "type-checker-done":"" ' :key = 'data.type_key')
                    svg(width="25px" height="19px" viewBox="0 0 25 19" version="1.1")
                        g(stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round")
                            g.done-svg(transform="translate(-903.000000, -307.000000)")
                                polyline(transform="translate(915.500000, 316.500000) scale(-1, 1) translate(-915.500000, -316.500000)" points="925 316.5 917.745707 323 906 310")
        .bottom-container(v-if = 'data.date || data.pin')
            .bottom-box.bottom-box-date(v-if = 'data.date')
                span.icon ⏰
                span {{ data.date }}
            .bottom-box(v-if = 'data.pin')
                span.icon 📌
                span {{ data.pin }}
</template>

<script>
import { reactive, ref ,onUpdated, watch, onMounted, nextTick} from 'vue'
import { _post_with_token }  from '@/utils/network/request.js'

export default {
    name: 'HistoryListBox',
    props:{
        data:{
            type: Object,
        }
    },
    setup(props,{ emit }){
        const main_box_content = ref(null)
        const box_content = ref(null)
        const styleRef = reactive({
            is_del:false,
            main_style:'display:flex;',
            list_box_style:'display:flex;',
        })
        const upload_content_style = () =>{
            let _size = box_content.value.getBoundingClientRect()
            let _main_size = main_box_content.value.getBoundingClientRect()
            styleRef.main_style = `display:flex;--content-height:${_size.height - 5*2}px;--content-width:${_main_size.width - 2}px;`
            if(!props.data.date && !props.data.pin){
                styleRef.main_style = `${styleRef.main_style}margin-bottom:10px;`
            }
            // -- 移动端bug 变更key值强制触发更新
            props.data.type_key += `${props.data.pid}_1`
        }
        const handle_next = async () => {
            await nextTick()
            upload_content_style()
        }
        onMounted(() => {
            handle_next()
        })
        watch(() => props.data.content,(newValue, oldValue) =>{
            setTimeout(() => { upload_content_style() },10)
        })
        return {
            styleRef,
            main_box_content,
            box_content
        }
    }
}
</script>

<style scoped lang="less">
@keyframes animation-done{
    to{
        left:calc(0px - var(--content-width) + 80px + 6.5px);
        width:calc(var(--content-width) - 40px + 20px + 10px);
    }
}
@keyframes polyline-show{
    to{
        stroke-dasharray: 54;
    }
}
@keyframes content-show{
    from{
        transform: rotateX(180deg);
    }
    to{
        transform: rotateX(0deg);
    }
}
@keyframes content-hide{
    from{
        transform: rotateX(0deg);
    }
    to{
        transform: rotateX(180deg);
    }
}
.list-box-container{
    position: relative;
    width:100%;
    display: flex;
    flex-direction:column;
    transition: transform 0.4s cubic-bezier(.7,.2,.64,.9);
    transform: rotateX(180deg);
    backface-visibility: hidden;
        &-hide{
            animation: content-hide 0.4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
        &-show{
            animation: content-show 0.4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
    .main-box-content{
        position: relative;
        width:100%;
        display: flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        z-index:2;
        .content-view{
            position: relative;
            flex:1;
            background:#F8DE6A;
            border-radius: 10px;
            display: flex;
            flex-direction:row;
            justify-content:center;
            align-items:center;
            cursor: pointer;
            span{
                position: relative;
                white-space:pre-wrap;
                word-wrap : break-word;
                outline:none;
                width: calc(100% - 25px - 5px - 20px*2);
                padding:10px 20px;
                z-index: 10;
            }
            .type-checker{
                position:relative;
                visibility: hidden;
                display: flex;
                justify-content:center;
                align-items:center;
                width:80px;
                height:var(--content-height);
                margin-right: 5px;
                svg{
                    z-index: 2;
                }
                .done-svg{
                    stroke:#F2D217;
                    stroke-width:5;
                    polyline{
                        stroke-dasharray: 54;
                        stroke-dashoffset: 25;
                    }
                }
                &::before{
                    content:'';
                    position: absolute;
                    top: 0;
                    left:0;
                    width:100%;
                    height:var(--content-height);
                    background:#FFF8DA;
                    box-shadow: 0 2px 3px #F2D217;
                    border-radius:6px;
                    z-index: 1;
                }
            }
            .type-checker-done{
                visibility: visible;
                box-shadow: none;
                &::before{
                    box-shadow: none;
                    animation:animation-done .4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
                    z-index: 1;
                }
                .done-svg{
                    stroke:#7ED321;
                    polyline{
                        stroke-dasharray: 27;
                        animation:polyline-show 0.4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
                    }
                }
            }
        }
    }
    .bottom-container{
        position: relative;
        top: -8px;
        width:100%;
        height: 48px;
        background: #FFF2B4;
        z-index:0;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        align-items:flex-end;
        padding:8px 10px;
        font-size: 18px;
        box-sizing: border-box;
        .bottom-box{
            display: flex;
            flex:1;
            flex-direction: row;
            justify-content:flex-start;
            align-items:flex-end;
            .icon{
                width:25px;
                height:25px;
                margin-right: 5px;
            }
            span{
                height:23px;
            }
            &-date{
                flex:2;
            }
            @media screen and (max-width:768px) {
               &-date{
                    flex:2;
                    font-size:15px;
                } 
            }
        }
    }
}
@media screen and (max-width:768px) {
    @keyframes animation-done{
        to{
            left:calc(0px - var(--content-width) + 80px + 5.5px);
            width:calc(var(--content-width) - 40px + 20px + 10px);
        }
    }
}
</style>