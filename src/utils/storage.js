const _token_key = 'token'

const set_storage = (key,value) =>{
    localStorage.setItem(key,value)
}
const get_storage = (key) => {
    return localStorage.getItem(key)
}
const set_storage_for_token = (value) => {
    set_storage(_token_key,value)
}
const get_storage_for_token = () =>{
    return get_storage(_token_key)
}
const remove_storage_for_token = () =>{
    localStorage.removeItem(_token_key)
}
export {
    set_storage_for_token,
    get_storage_for_token,
    remove_storage_for_token
}