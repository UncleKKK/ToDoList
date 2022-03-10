import { reactive , getCurrentInstance } from 'vue'
export const use_add_task = (emit) => {
    const styleRef = reactive({
        is_editing:false,
        container_height:'min-height: 50px',
        is_add_time_disabled:false,
        is_add_pin_disabled:false,
    })
    const dataRef = reactive({
        input_data : ''
    })
    const { proxy } = getCurrentInstance()
    const add_tas_tap_action = () =>{
        if(0 < dataRef.input_data.length){
            emit('add_task_action',dataRef.input_data)
            dataRef.input_data = ''
            styleRef.is_add_time_disabled = false
            styleRef.is_add_pin_disabled = false
        }else{
            proxy.$showToast('任务内容不能为空')
        }
    }
    const change_editing_tap_action = () =>{
        styleRef.is_editing = !styleRef.is_editing
        setTimeout(() => { 
            if(styleRef.is_editing){ styleRef.container_height = 'min-height: 200px' }
            else { styleRef.container_height = 'min-height: 50px' }
        },500)
    }
    const add_time_tap_action = (get_current_date) =>{
        if(!styleRef.is_add_time_disabled){
            if(get_current_date && typeof get_current_date === 'function'){
                dataRef.input_data = `${dataRef.input_data}\n⏰  [ ${get_current_date()} ]`
            }else{
                dataRef.input_data = `${dataRef.input_data}\n⏰  [ 8:00 ~ 10:00 ]`
            }
            styleRef.is_add_time_disabled = true 
        }
    }
    const add_pin_tap_action = () =>{
        if(!styleRef.is_add_pin_disabled){
            dataRef.input_data = `${dataRef.input_data}\n📌  [ #工作 ]`
            styleRef.is_add_pin_disabled = true
        }
    }
    const textarea_value_change_action = (e) =>{
        if(-1 === dataRef.input_data.indexOf('⏰  [')){
            styleRef.is_add_time_disabled = false
        }else{
            styleRef.is_add_time_disabled = true
        }
        if(-1 === dataRef.input_data.indexOf('📌  [')){
            styleRef.is_add_pin_disabled = false
        }else{
            styleRef.is_add_pin_disabled = true
        }
    }
    return{
        styleRef,
        dataRef,
        add_tas_tap_action,
        change_editing_tap_action,
        add_time_tap_action,
        add_pin_tap_action,
        textarea_value_change_action
    }
}