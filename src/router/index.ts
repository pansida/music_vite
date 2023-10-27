import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { useHeaderStore } from "../store/header";
// import pinia from '@/store/index'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import index_list from "./index_list";
import { message } from "ant-design-vue";
// pinia.use(piniaPluginPersistedstate)
// const headerStore = useHeaderStore()

const Index = () => import("../components/Index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Index,
    redirect: "/discover/recommend",
    children: [...index_list],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
//@ts-ignore
router.beforeEach((to, from, next) => {
  const headerStore = useHeaderStore(); // 创建插件状态实例
  to.meta.headerStore = headerStore; // 将插件状态实例保存到路由元信息中
  //@ts-ignore
  if (to.meta.role === 1 && to.meta.headerStore.isLogin === true) {
    next();
    //@ts-ignore
  } else if (to.meta.role === 1 && to.meta.headerStore.isLogin === false) {
    message.error("用户未登录，无法查看!");
  } else if (to.meta.role === 0) {
    next();
  }
});

export default router;
