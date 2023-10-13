<template>
  <div class="navBar">
    <a-menu v-model:selectedKeys="current" class="navBarHeader" mode="horizontal" :items="items" @click="handleNav"/>
  </div>
  <div class="router">
    <router-view></router-view>
  </div>
</template>
  
<script setup lang="ts">
import { MenuProps } from 'ant-design-vue';
import { ref, watch, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
const route = useRoute()
const router = useRouter()
const current = ref<string[]>(['/discover/recommend']);
const items = ref<MenuProps['items']>([
  {
    key: '/discover/recommend',
    label: '个性推荐',
    title: '个性推荐',
  },
  {
    key: '/discover/musiclist',
    label: '歌单',
    title: '歌单',
  },
  {
    key: '/discover/ranking',
    label: '排行榜',
    title: '排行榜',
  },
  {
    key: '/discover/singer',
    label: '歌手',
    title: '歌手',
  },
])
watch(() => route.path, (val) => {
  current.value = [val]
})
const handleNav = ({ key }: { key: string }) => {
  router.push(key)
}
onMounted(() => {
  current.value = [route.path]
})
</script>
<style scoped lang="scss">
.navBar {
  height: 65px;
  padding: 10px 0 20px 20px;
  position: fixed;
  background: #fff;
  z-index: 100;
  width: 90%;

  .navBarHeader {
    width: 100%;
  }

  .tabTitle {
    color: black;
    font-size: 16px;
  }

  :deep(.ant-menu-item-selected) {
    font-size: 18px;
    font-weight: 600;
    color: black
  }

  :deep(.ant-menu-item-active) {
    border: none;
  }
}

.router {
  padding: 0 15px;
  margin-top: 70px;
  height: calc(100vh - 195px);
  overflow-y: scroll;
  overflow-x: hidden;
}

.active {
  font-weight: bold;
}
</style>
