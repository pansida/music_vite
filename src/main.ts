import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store/index';
import router from "./router/index"
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import "./assets/css/base.css"
import clickOutside from './mixin/clickOutside';
const app = createApp(App)

app.use(Antd)
app.use(pinia)
app.use(router)
app.directive('click-outside', clickOutside);

app.mount('#app')
