import axios from 'axios'
import router  from '@/router'
import { get_storage_for_token } from '@/utils/storage'
axios.defaults.baseURL = process.env.VUE_APP_API
axios.defaults.timeout = 5 * 1000

export const _post = (path, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(path, params,{
            headers: {
                'content-type': 'application/json',
            }})
            .then(res => {
                res = res.data
                if(200 === res.code){
                    resolve(res.data)
                }else{
                    reject(res.msg)
                }
            })
            .catch(err => reject(err))
    })
}
export const _post_with_token = (path, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(path, params,{
            headers: {
                'content-type': 'application/json',
                'x-token':get_storage_for_token()
            }})
            .then(res => {
                res = res.data
                if(200 === res.code){
                    resolve(res.data)
                }else{
                    __router_to_login(res)
                    reject(res.msg)
                }
            })
            .catch(err => reject(err))
    })
}
const __router_to_login = (res) =>{
    if(4003 === res.code || 4002 === res.code){
        router.push({ name:'Login' })
    }
}
export const _get = (path, params = {}) => {
    return new  Promise((resolve ,reject) =>{
        let _path = params.id ? `${path}/${params.id}` : path
        axios.get(_path,{
            headers: {
                'content-type': 'application/json',
            }})
            .then(res =>{
                res = res.data
                if (200 === res.code){
                    resolve(res.data)
                }else{
                    reject(res.msg)
                }
            })
            .catch(error => reject(error))
    })
}