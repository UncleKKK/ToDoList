export const _base_url = 'http://127.0.0.1:9999/api'

// -- login
export const login_path = {
    login: '/user/login',
    register:'/user/register'
}
// -- 首页
export const home_path = {
    add:'/todo/add',
    list:'/todo/list',
    done:'/todo/done',
    del:'/todo/del'
}
// -- 用户
export const user_path = {
    info:'/user/info',
    send_email:'/user/sendEmail',
    check_email_code:'/user/checkEmailCode',
    unbind_email:'/user/unbindEmail',
    send_sms:'/user/sendSms',
    check_sms_code:'/user/checkSmsCode',
    unbind_sms:'/user/unbindSms',
    feedback:'/user/feedback',
}
export const history_path = {
    items:'/search/searchItems',
    list:'/search/getItemList'
}
// -- 标记任务
export const pin_path = {
    add:'/pin/add',
    list:'/pin/list',
    done:'/pin/done',
    del:'/pin/del'
}