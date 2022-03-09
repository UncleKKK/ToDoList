const __home_tabbarList = [{
    src:require('@/assets/todo_icon.svg'),
    title:'每日待办',
    is_active: true,
},{
    src:require('@/assets/pin_icon.svg'),
    title:'标记任务',
    is_active: false,
},{
    src:require('@/assets/message_icon.svg'),
    title:'历史任务',
    is_active: false,
},{
    src:require('@/assets/user_icon.svg'),
    title:'用户中心',
    is_active: false,
}]

const __user_itemList = [{
    title:'email :',
    input_data :'',
    input_code_data:'',
    button_title : '解除绑定',
    button_src : require('@/assets/unbind.svg'),
    is_bind : false,
    is_show_code:false,
    type:'email',
    is_have_button:true,
    component:'UserAnimationListBox'
  },{
    title:'手机号 :',
    input_data :'',
    input_code_data:'',
    button_title : '解除绑定',
    button_src : require('@/assets/unbind.svg'),
    is_bind : false,
    is_show_code:false,
    type:'phone',
    is_have_button:true,
    component:'UserAnimationListBox'
  },{
    title:'微信公众号 :',
    input_data :'',
    input_code_data:'',
    button_title : '解除绑定',
    button_src : require('@/assets/unbind.svg'),
    is_bind : false,
    is_show_code:false,
    type:'',
    is_have_button:true,
    text:'关注公众号并按照指引绑定账号即可',
    component:'UserTextListBox'
  },{
    title:'问题反馈 :',
    input_data :'',
    input_code_data:'',
    button_title : '解除绑定',
    button_src : require('@/assets/unbind.svg'),
    is_bind : false,
    is_show_code:false,
    type:'',
    is_have_button:true,
    component:'UserListBox'
}]
export {
    __home_tabbarList,
    __user_itemList
}