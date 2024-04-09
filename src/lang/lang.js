//lang.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import cn from './cn.json'
import tw from './tw.json'
// import en from './en.json'
// import tw from './tw.json'
// import es from './es.json'

Vue.use(VueI18n)

const locale = 'tw'

const messages = {
    tw
}

const i18n = new VueI18n({
    /** 默认值 */
    locale,
    messages
})

export default i18n