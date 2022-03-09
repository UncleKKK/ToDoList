import store from '@/store'

export function commit_loading_state(is_loading){
    store.commit({
        type:'set_loading',
        is_loading:is_loading
    })
}
export function commit_mobile_state(is_mobile){
    store.commit({
        type:'set_mobile',
        is_mobile:is_mobile
    })
}