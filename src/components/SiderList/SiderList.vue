<template>
    <a-menu id="dddddd" v-model:selectedKeys="selectedKeys" style="width: 199px" mode="inline" :items="items"
        @click="handleClick"></a-menu>
</template>
  
<script setup lang="ts">
import { reactive, ref, VueElement, h } from 'vue';
import { useRouter, useRoute, RouteLocationRaw } from "vue-router"
import type { MenuProps, ItemType } from 'ant-design-vue';

const router = useRouter()
const route = useRoute()
interface SiderList {
    name: string,
    route: string,
    icon: string,
}

const siderList = reactive<SiderList[]>([
    {
        name: "发现音乐",
        route: "/discover/recommend",
        icon: "icon-yinle"
    },
    {
        name: "视频",
        route: "/video",
        icon: "icon-duanshipinhuati"
    },
    {
        name: "收藏",
        route: "/favorites",
        icon: "icon-more"
    },
    {
        name: "每日推荐",
        route: "/recommendmusic",
        icon: "icon-good"
    }
])
const selectedKeys = ref<string[]>(['/discover/recommend']);

function getItem(
    label: VueElement | string,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group',
): ItemType {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as ItemType;
}

const items: ItemType[] = reactive([
    ...siderList.map(item => {
        return getItem(item.name, item.route, () => h('i', {
            class: `iconfont ${item.icon}`
        }))
    })
]);
const handleClick: MenuProps['onClick'] = ({ key }) => {
    if (route.path === key) {
        return
    }
    router.push(key as RouteLocationRaw)
};

</script>
  
<style scoped lang="scss">
.ant-menu {
    border: none;

    :deep(.ant-menu-item) {
        text-align: left;
        color: black;
        width: 98%;
        margin-right: 0;

        // &:focus {
        //     border-radius: 0;
        //     background-color: #f5f5f6;

        //     span {
        //         font-weight: 900;
        //     }

        //     i {
        //         font-weight: 900;
        //     }
        // }

        // &:hover {
        //     border-radius: 0;
        //     background-color: #f5f5f6;
        // }

    }
}</style>
