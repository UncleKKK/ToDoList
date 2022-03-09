import { _post_with_token, _post }  from '@/utils/network/request.js'
import{
    login_path,
    home_path,
    user_path,
    pin_path,
    history_path
} from '@/utils/network/request_path.js'
// -- login
export const request_login__ = (userName,passWord) =>{
    return new Promise((resolve, reject) => {
        _post(login_path.login,{
            userName,passWord
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_login__register = (userName,passWord,rePassWord) =>{
    return new Promise((resolve, reject) => {
        _post(login_path.register,{
            userName,passWord,rePassWord
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
// -- home
export const request_home__list = (page,pageSize) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(home_path.list,{
            page,pageSize
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_home__add = (content) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(home_path.add,{
            content
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_home__done = (tid,is_done) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(home_path.done,{
            tid,
            is_done
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_home__del = (tid) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(home_path.del,{
            tid
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
// -- user
export const request_user__info = () =>{
    return new Promise((resolve, reject) => {
        _post_with_token(user_path.info)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_user__send_email = (emailAddress) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(user_path.send_email,{
            emailAddress
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_user__check_email_code = (emailCode) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(user_path.check_email_code,{
            emailCode
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_user__unbind_email = () =>{
    return new Promise((resolve, reject) => {
        _post_with_token(user_path.unbind_email)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_user__send_sms = (phoneNum) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(user_path.send_sms,{
            phoneNum
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_user__check_sms_code = (smsCode) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(user_path.check_sms_code,{
            smsCode
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_user__unbind_sms = () =>{
    return new Promise((resolve, reject) => {
        _post_with_token(user_path.unbind_sms)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_user__feedback = (feedback_content) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(user_path.feedback,{
            feedback_content
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
// -- pin
export const request_pin__add = (content) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(pin_path.add,{
            content
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_pin__list = (page,pageSize) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(pin_path.list,{
            page,
            pageSize
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_pin__done = (pid,is_done) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(pin_path.done,{
            pid,
            is_done
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_pin__del = (pid) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(pin_path.del,{
            pid
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
// -- search
export const request_search__items = () =>{
    return new Promise((resolve, reject) => {
        _post_with_token(history_path.items)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}
export const request_search__list = (stype,tag,date,page) =>{
    return new Promise((resolve, reject) => {
        _post_with_token(history_path.list,{
            stype,tag,date,page
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}