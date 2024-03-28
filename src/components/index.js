//全局化註冊

import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'

export const componentPlugin = {
    install(app) {
        // app.component('組件名', 配置對象);
        app.component(ImageView, ImageView)
        app.component(Sku, Sku)
    }
}