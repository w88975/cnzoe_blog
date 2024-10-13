import './assets/base.css'
import mitt from 'mitt'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

// arco
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

// markdown editor
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

// 全局注册组件
import TitleLine from '@/components/TitleLine.vue'
import NvaModal from '@/components/modal/index.vue'
import NvaInput from '@/components/input/index.vue'
import NvaButton from '@/components/button/index.vue'


const bus = mitt()
const app = createApp(App)
app.config.globalProperties.$bus = bus

app.use(router)
app.use(ArcoVue);
app.use(VueMarkdownEditor)
app.component('TitleLine', TitleLine)
app.component('NvaModal', NvaModal)
app.component('NvaInput', NvaInput)
app.component('NvaButton', NvaButton)
app.mount('#app')