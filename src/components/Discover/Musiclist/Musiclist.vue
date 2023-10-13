<template>
    <div class="musicList" v-if="highquality" ref="musicListRef">
        <div class="highqualityEntry">
            <img :src="highquality.coverImgUrl" alt="" class="highqualityImg">
            <div class="cover">
                <img :src="highquality.coverImgUrl" alt="">
            </div>
            <div class="EntryInfo">
                <div class="tag"><i class="iconfont icon-good"></i>精品歌单</div>
                <div class="name">{{ highquality.name }}</div>
                <div class="desc">{{ highquality.copywriter }}</div>
            </div>
        </div>
        <div class="musicListNavBar" v-if="musicSort">
            <div class="SortTitle" @click="HandleAcitveModel">
                {{ activeTitle }}<i class="iconfont icon-arrow-right-bold"></i>
            </div>
            <div class="model" v-click-outside="handleOutSide" v-if="acitveModel">
                <div class="item" :class="activeTitle === item.name ? 'active' : ''" v-for="item in musicSort"
                    :key="item.name" @click="handleModel(item.name)">
                    <div>{{ item.name }}</div>
                </div>
            </div>
            <div class="right" v-if="musicSort">
                <div v-for="item in musicSortList" :key="item" :class="activeTitle === item ? 'active' : ''"
                    class="right-item" @click="handelSort(item)">
                    {{ item }}
                </div>
            </div>
        </div>
        <div class="listCard" v-if="listCard">
            <div v-for="item in listCard.playlists" :key="item.id" class="listCardItem" @click="router.push(`/musiclistdetail/${item.id}`)">
                <div class="image">
                    <img :src="item.coverImgUrl" alt="">
                </div>
                <div class="title">{{ item.name }}</div>
            </div>
            <a-pagination v-model:current="listOffset" :total="listCard.total" :pageSize="50" :showSizeChanger="false"
                @change="handleCurrent" />
        </div>
    </div>
    <GoTop scrollobj=".musicList" button="120px" right="70px" v-if="highquality"/>
</template>
  
<script setup lang="ts">
import GoTop from "@/components/GoTop/GoTop.vue"
import { musicInfo } from "@/request/Music";
import { ref, onMounted } from "vue"
import {useRouter} from "vue-router"
const router = useRouter()

const musicListRef = ref<HTMLElement>()
const listOffset = ref(0)
const listCard = ref<any>(null)
const isopen = ref(false)
const highquality = ref<any>(null)
const musicSort = ref<any>(null)
const acitveModel = ref(false)
const activeTitle = ref('华语')
const musicSortList = ref<any>([])
onMounted(async () => {
    handleHighquality()
    handleMusicSort()
    handleListCard()
})
// 获取顶部歌单卡片信息
const handleHighquality = async () => {
    const res = await musicInfo.getHighquality()
    highquality.value = res.playlists[0]
}
// 获取歌单分类
const handleMusicSort = async () => {
    const res = await musicInfo.getMusicSort()
    musicSort.value = res.sub
    musicSortList.value = musicSort.value.map((item: any) => {
        return item.name
    }).splice(0, 10)
}
// 获取歌单单个分类信息
const handleListCard = async () => {
    const res = await musicInfo.getListCard(activeTitle.value, listOffset.value)
    listCard.value = res
}
// 控制分类按钮
const HandleAcitveModel = () => {
    isopen.value = true
    acitveModel.value = !acitveModel.value
}
// 控制选项框点击其他位置关闭
const handleOutSide = () => {
    if (isopen.value) {
        isopen.value = false
    } else {
        acitveModel.value = false
    }
}
// 分页获取数据
const handleCurrent = (page: number) => {
    listOffset.value = page
    handleListCard() 
    musicListRef.value?.scrollTo({ top: 0}); 
}
// model触发更新
const handleModel = (name: string) => {
    activeTitle.value = name
    listOffset.value = 0
    handleListCard()
}
// 分类触发更新
const handelSort = (name: string) => {
    activeTitle.value = name
    listOffset.value = 0
    handleListCard()
}
</script>
  
<style scoped lang="scss">
.musicList {
    padding: 20px;
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    .highqualityEntry {
        position: relative;
        width: 100%;
        height: 180px;
        overflow: hidden;
        border-radius: 10px;
        display: flex;

        .highqualityImg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            z-index: 0;
            filter: blur(30px) brightness(70%);
            transform: translateY(-80px);
        }

        .cover {
            z-index: 2;
            margin: 10px;
            width: 160px;
            height: 160px;

            img {
                width: 160px;
                height: 160px;
                border-radius: 10px;
            }
        }

        .EntryInfo {
            display: flex;
            flex-direction: column;
            z-index: 2;

            .tag {
                color: #d59e54;
                border: 1px solid #d59e54;
                padding: 5px 10px;
                width: 94px;
                font-size: 14px;
                margin: 20px 10px 15px;
                border-radius: 15px;
            }

            .name {
                color: white;
                font-size: 18px;
                margin: 10px 0;
            }

            .desc {
                margin-top: 10px;
                margin-left: 10px;
                color: rgba(255, 255, 255, 0.5);
            }
        }
    }

    .musicListNavBar {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        position: relative;
        align-items: center;

        .model {
            position: absolute;
            top: 60px;
            width: 400px;
            border: 1px solid #ebeef5;
            border-radius: 10px;
            height: 220px;
            overflow: scroll;
            padding: 10px;
            display: flex;
            flex-wrap: wrap;
            z-index: 100;
            background-color: #fff;

            .item {
                font-size: 16px;
                width: 25%;
                text-align: center;
                color: rgb(85, 85, 85);
                padding: 5px 0;
                margin: 5px 0;
                cursor: pointer;
                border-radius: 30px;
                transform: scale(0.9);
            }

            .active {
                background-color: #fcebeb;
                color: #eb4f4f;
            }
        }

        .SortTitle {
            border-radius: 20px;
            border: 1px solid #ddd;
            padding: 5px 10px;
        }

        .right {
            display: flex;
            height: 100%;

            .right-item {
                margin: 4px 2px;
                padding: 6px 10px;
                cursor: pointer;
            }

            .active {
                background-color: #fdf5f5;
                color: #ec4747;
                border-radius: 11px;
            }
        }
    }

    .listCard {
        display: flex;
        flex-wrap: wrap;
        margin: 10px 0;
        justify-content: center;

        .listCardItem {
            width: 18%;
            margin: 0 2% 20px 0;
            overflow: hidden;
            cursor: pointer;

            .image {
                width: 100%;
                padding-bottom: 100%;
                height: 0;
                position: relative;

                img {
                    width: 100%;
                    border-radius: 10px;
                }
            }

            .title {
                margin-top: 8px;
                padding: 0 2px;
                font-size: 14px;
                color: black;
                line-height: 17px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }

}</style>
