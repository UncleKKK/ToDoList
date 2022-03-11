<template lang="pug">
block content
    .list-box-container(ref = 'box_container' :class = 'styleRef.is_del ? "list-box-container-hide":"list-box-container-show" ' :style = 'styleRef.list_box_style')
        .main-box-content(ref = 'main_box_content' :style = 'styleRef.main_style')
            .content-view(@click = 'change_done_type_tap_action')
                span(ref = 'box_content' spellcheck = 'false') {{ data.content }}
                .type-checker(:class = 'data.is_done ? "type-checker-done":"" ' :key = 'data.type_key')
                    svg(width="25px" height="19px" viewBox="0 0 25 19" version="1.1")
                        g(stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round")
                            g.done-svg(transform="translate(-903.000000, -307.000000)")
                                polyline(transform="translate(915.500000, 316.500000) scale(-1, 1) translate(-915.500000, -316.500000)" points="925 316.5 917.745707 323 906 310")
            .del(@click = 'delete_tap_action')
                svg.home-icon(aria-hidden="true")
                    use(xlink:href="#icon-shanchu")
        .bottom-container(v-if = 'data.date || data.pin')
            .bottom-box(v-if = 'data.date')
                span.icon ⏰
                span {{ data.date }}
            .bottom-box(v-if = 'data.pin')
                span.icon 📌
                span {{ data.pin }}
</template>

<script>
import { getCurrentInstance ,onMounted , watch } from 'vue'
import { _post_with_token }  from '@/utils/network/request.js'
import { 
  request_home__done,
  request_home__del
}  from '@/utils/network/request_util.js'
import { use_list_box } from '@/components/PublicMixin/PublicListBox.js'

export default {
    name: 'HomeListBox',
    props:{
        data:{
            type: Object,
        }
    },
    setup(props,{ emit }){
        // -- refs & public fun
        const {
            mobileRef,
            main_box_content,
            box_container,
            box_content,
            styleRef,
            handle_next,
            upload_content_style
        } = use_list_box(props)
        const { proxy } = getCurrentInstance()
        // -- tap action
        const change_done_type_tap_action = () =>{
            request_home__done(props.data.tid,!props.data.is_done)
            .then(res => props.data.is_done = !props.data.is_done)
            .catch(err => proxy.$showToast(err))
        }
        const delete_tap_action = () =>{
            request_home__del(props.data.tid)
            .then(res => {
                styleRef.is_del = !styleRef.is_del
                setTimeout(() => { styleRef.list_box_style = 'display:none;' },500)
            }).catch(err => proxy.$showToast(err))
        }
        onMounted(() => {
            handle_next()
        })
        watch(() => props.data.is_edit,(newValue, oldValue) =>{
            if(newValue){ box_container.value.scrollLeft = mobileRef.max_offset_left }
            else{ box_container.value.scrollLeft = 0 }
        })
        watch(() => props.data.content,(newValue, oldValue) =>{
            setTimeout(() => { upload_content_style() },10)
        })
        return {
            styleRef,
            main_box_content,
            box_container,
            box_content,
            change_done_type_tap_action,
            delete_tap_action
        }
    }
}
</script>

<style scoped lang="less">
@keyframes animation-done{
    to{
        left:calc(0px - var(--content-width) + 80px + 30px + 7.5px);
        width:calc(var(--content-width) - 40px);
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
            background:#EEBDAB;
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
                    stroke:#DF987E;
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
                    background:#FFF4D7;
                    box-shadow: 0 2px 3px #C78C77;
                    border-radius:6px;
                    z-index: 1;
                }
            }
            .type-checker-done{
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
        .del{
            width:25px;
            height:25px;
            border:none;
            background-color:transparent;
            margin-left: 7.5px;
            cursor: pointer;
        }
    }
    .bottom-container{
        position: relative;
        top: -8px;
        width:calc(100% - 23px - 7.5px - 2px);
        height: 48px;
        background: #FFE8CD;
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
            width:38%;
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
        }
    }
}
@media screen and (max-width:768px) {
    @keyframes animation-done{
        to{
            left:calc(0px - var(--content-width) + 80px + 30px + 6.5px);
            width:calc(var(--content-width) - 40px);
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
        overflow: auto;
            &-hide{
                animation: content-hide 0.4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
            }
            &-show{
                animation: content-show 0.4s both cubic-bezier(0.445, 0.05, 0.55, 0.95);
            }
        .main-box-content{
            position: relative;
            width:calc(100% + 25px + 7.5px);
            display: flex;
            flex-direction:row;
            justify-content:center;
            align-items:center;
            z-index:2;
            .content-view{
                position: relative;
                // flex:1;
                width:100%;
                background:#EEBDAB;
                border-radius: 10px;
                display: flex;
                flex-direction:row;
                justify-content:center;
                align-items:center;
                overflow: hidden;
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
                        stroke:#DF987E;
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
                        background:#FFF4D7;
                        box-shadow: 0 2px 3px #C78C77;
                        border-radius:6px;
                        z-index: 1;
                    }
                }
                .type-checker-done{
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
            .del{
                width:25px;
                height:25px;
                border:none;
                background-color:transparent;
                margin-left: 7.5px;
                cursor: pointer;
            }
        }
        .bottom-container{
            position: relative;
            top: -8px;
            width:calc(100%);
            height: 48px;
            background: #FFE8CD;
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
            }
        }
    }
}
</style>