import './assets/base.css'
import mitt from 'mitt'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

// markdown editor
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});


const bus = mitt()
const app = createApp(App)
app.config.globalProperties.$bus = bus

app.use(router)
app.use(VueMarkdownEditor)
app.mount('#app')
