import { createApp } from 'vue'
import Toast from '@/components/PublicComponents/Toast.vue'
 
// 创建挂载实例
let create_mount = (opts) => {
    const mount_node = document.createElement('div')
    document.body.appendChild(mount_node)
 
    const app = createApp(Toast, {
        ...opts,
        remove() {
            app.unmount(mount_node)
            document.body.removeChild(mount_node)
        }
    })
    return app.mount(mount_node)
}
export const show_toast = (message) =>{
    const inst = create_mount({message : message})
    setTimeout(() => {
        inst.$attrs.remove()
    },2100 + 400*2)
}