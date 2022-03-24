import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import Cookies from 'js-cookie'
import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import 'element-plus/dist/index.css'
import '@/styles.scss' // global css
import SvgIcon from '@/components/SvgIcon.vue'

import App from './App.vue'
import store from './store'
import router from './router'

import * as filters from './filters'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(VueSvgIconPlugin, {
    tagName: 'icon'
})
app.config.globalProperties.$ELEMENT = { size: Cookies.get('size') || 'medium' };
app.component('svg-icon', SvgIcon)

app.config.globalProperties.$filters = {}

Object.keys(filters).forEach(key => {
    app.config.globalProperties.$filters[key] = filters[key]
})
app.mount('#app')
