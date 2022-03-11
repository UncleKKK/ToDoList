import { reactive, ref, nextTick } from 'vue'
import store from '@/store'

export const use_list_box = (props) => {
    // -- refs
    const main_box_content = ref(null)
    const box_container = ref(null)
    const box_content = ref(null)
    const styleRef = reactive({
        is_del: false,
        main_style: 'display:flex;',
        list_box_style: 'display:flex;'
    })
    const mobileRef = {
        show_del_timer: null,
        max_offset_left: 33,
        is_mobile: store.state.is_mobile
    }
    // -- config fun
    const set_mobile_onscroll_action = () => {
        if (!mobileRef.is_mobile) return
        box_container.value.addEventListener('scroll', scroll_event_listener_fun)
    }
    const scroll_event_listener_fun = () => {
        if (mobileRef.show_del_timer) clearTimeout(mobileRef.show_del_timer)
        mobileRef.show_del_timer = setTimeout(() => {
            if (box_container.value.scrollLeft > parseInt(mobileRef.max_offset_left / 2)) {
                props.data.is_edit = true
                box_container.value.scrollLeft = mobileRef.max_offset_left
            } else {
                props.data.is_edit = false
                box_container.value.scrollLeft = 0
            }
        }, 500)
    }
    const upload_content_style = () => {
        let _size = box_content.value.getBoundingClientRect()
        let _main_size = main_box_content.value.getBoundingClientRect()
        styleRef.main_style = `display:flex;--content-height:${_size.height - 5 * 2}px;--content-width:${_main_size.width - 2}px;`
        if (!props.data.date && !props.data.pin) {
            styleRef.main_style = `${styleRef.main_style}margin-bottom:10px;`
        }
        // -- 移动端bug 变更key值强制触发更新
        props.data.type_key += `${props.data.pid}_1`
    }
    const handle_next = async () => {
        await nextTick()
        upload_content_style()
        set_mobile_onscroll_action()
    }
    return {
        mobileRef,
        styleRef,
        main_box_content,
        box_container,
        box_content,
        handle_next,
        upload_content_style
    }
}