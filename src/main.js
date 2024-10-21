import './assets/base.css'
import mitt from 'mitt'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

// custom directive
import LongPress from '@/directive/longpress'

// arco
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

// markdown editor
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// vconsole
import VConsole from 'vconsole';
console.log(import.meta.env.MODE)
if (localStorage.getItem('debug') == '1') {
    new VConsole();
}

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

// 全局注册组件
import TitleLine from '@/components/TitleLine.vue'
import NvaModal from '@/components/modal/index.vue'
import NvaInput from '@/components/input/index.vue'
import NvaButton from '@/components/button/index.vue'
import NvaTextScroll from '@/components/text-scroll/index.vue'
import BoxView from '@/components/BoxView.vue'
import NvaTab from '@/components/tab/index.vue'
import NvaPagination from '@/components/pagination/index.vue'
import NvaDrawer from '@/components/drawer/DrawerPanel.vue'
import { NvaMessage } from '@/utils/message'

const bus = mitt()
const app = createApp(App)
app.config.globalProperties.$bus = bus
window.NvaMessage = NvaMessage

app.use(router)
app.directive('longpress', LongPress)
app.use(ArcoVue);
app.use(VueMarkdownEditor)

app.component('TitleLine', TitleLine)
app.component('NvaModal', NvaModal)
app.component('NvaInput', NvaInput)
app.component('NvaButton', NvaButton)
app.component('NvaTab', NvaTab)
app.component('NvaPagination', NvaPagination)
app.component('NvaTextScroll', NvaTextScroll)
app.component('NvaDrawer', NvaDrawer)
app.component('BoxView', BoxView)

app.mount('#app')
