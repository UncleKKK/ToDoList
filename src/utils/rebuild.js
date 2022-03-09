/*
    params:
        res : user_info response
        dataRef: dataRef.__user_itemList.item
    dataRef.item:
    {
        title:'email 地址  :',
        input_data :'wxin24521@sina.cn',
        button_title : '解除绑定',
        button_src : require('@/assets/unbind.svg'),
        is_bind : false,
        is_show_code:false,
        type:'email',
        is_have_button:true,
    }
*/
const __rebuild_user_data = (res,dataRef) =>{
    dataRef.forEach((item,index) => {
        switch(index){
            // -- email
            case 0:
                item.button_title = res.email ? '解除绑定':'绑定'
                item.type = 'email'
                item.is_bind = res.email ? true : false
                item.button_src = res.email ? require('@/assets/unbind.svg'):require('@/assets/bind.svg')
                item.input_data = res.email ? res.email : ''
                break
            case 1:
                item.button_title = res.phone ? '解除绑定':'绑定'
                item.type = 'phone'
                item.is_bind = res.phone ? true : false
                item.button_src = res.phone ? require('@/assets/unbind.svg'):require('@/assets/bind.svg')
                item.input_data = res.phone ? res.phone : ''
                break
            case 2:
                item.button_title = res.u_wx ? '解除绑定':'绑定'
                item.is_bind = res.u_wx ? true : false
                item.button_src = res.u_wx ? require('@/assets/unbind.svg'):require('@/assets/bind.svg')
                break
            case 3:
                item.button_title = 'Done'
                break
        }
    })
}
const __rebuild_search_data = (dataRef) =>{
    const _dataRef = dataRef
    for (const key in _dataRef) {
        _dataRef[key].values.forEach((item,index) => {
            dataRef[key].values[index] = {
                is_selected:index === 0 ? true : false,
                value: item
            }
        })
    }
}
const __rebuild_home_and_pin_list_data = (dataRef) =>{
    dataRef.forEach(item => {
        item.is_edit = false
    })
}
export {
    __rebuild_user_data,
    __rebuild_search_data,
    __rebuild_home_and_pin_list_data
}