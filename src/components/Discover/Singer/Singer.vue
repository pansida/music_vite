<template>
    <div class="singer">
        <div class="selectors">
            <div class="selectorItem">
                <div class="title">语种：</div>
                <NavBar :SecondNavBarData="languageSort" @clickSecondBarItem="handleArea" />
            </div>
            <div class="selectorItem">
                <div class="title">分类：</div>
                <NavBar :SecondNavBarData="typeSort" @clickSecondBarItem="handleSinger" />
            </div>
            <div class="selectorItem">
                <div class="title">筛选：</div>
                <NavBar :SecondNavBarData="initialSort" @clickSecondBarItem="handleInital" />
            </div>
        </div>
        <div class="listCardContainer">
            <div class="listCard" v-infinite-scroll="handleloading">
                <div class="listCardItem" v-for="item in listCard" :key="item" @click="handleMusicDetail(item.id)">
                    <div class="image">
                        <img :src="item.img1v1Url+'?param=400y400'" alt="">
                    </div>
                    <div class="title">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
    <GoTop scrollobj=".singer" button="120px" right="70px"/>
</template>
  
<script setup lang="ts">
import GoTop from "@/components/GoTop/GoTop.vue";
import NavBar from "./NavBar/NavBar.vue"
import { reactive} from "vue"
import { musicInfo } from "@/request/Music/index"
// import {useRouter} from "vue-router"
interface singer {
    language: number,
    type: number,
    initial: number | string
}
// const router = useRouter()
const listCard = reactive<any>([])
let count: number = 1
const singer = reactive<singer>({
    language: -1,
    type: -1,
    initial: -1,
})
const languageSort = [
    { area: -1, name: "全部" },
    { area: 7, name: "华语" },
    { area: 96, name: "欧美" },
    { area: 8, name: "日本" },
    { area: 16, name: "韩国" },
    { area: 0, name: "其它" },
]
const typeSort = [
    { type: -1, name: "全部" },
    { type: 1, name: "男歌手" },
    { type: 2, name: "女歌手" },
    { type: 3, name: "乐队" },
]
const initialSort = [
    { initial: -1, name: "热门" },
    { initial: "a", name: "A" },
    { initial: "b", name: "B" },
    { initial: "c", name: "C" },
    { initial: "d", name: "D" },
    { initial: "e", name: "E" },
    { initial: "f", name: "F" },
    { initial: "g", name: "G" },
    { initial: "h", name: "H" },
    { initial: "i", name: "I" },
    { initial: "j", name: "J" },
    { initial: "k", name: "K" },
    { initial: "l", name: "L" },
    { initial: "m", name: "M" },
    { initial: "n", name: "N" },
    { initial: "o", name: "O" },
    { initial: "p", name: "P" },
    { initial: "q", name: "Q" },
    { initial: "r", name: "R" },
    { initial: "s", name: "S" },
    { initial: "t", name: "T" },
    { initial: "u", name: "U" },
    { initial: "v", name: "V" },
    { initial: "w", name: "W" },
    { initial: "x", name: "X" },
    { initial: "y", name: "Y" },
    { initial: "z", name: "Z" },
    { initial: 0, name: "#" },
]
// 清空数组触发方法
const clearlistCard = async()=>{
    count = 1
    listCard.splice(0, listCard.length)
    await getSearchSinger()
}
const handleArea = async(index: number) => {
    singer.language = languageSort[index].area
    await clearlistCard()
}
const handleSinger = async (index: number) => {
    singer.type = typeSort[index].type
    await clearlistCard()
}
const handleInital = async (index: number) => {
    singer.initial = initialSort[index].initial
    await clearlistCard()
}
// 发送歌手请求
const getSearchSinger = async () => {
    const res = await musicInfo.getArtist(singer.language, singer.type, singer.initial, count)
    count++;
    listCard.push(...res.artists)
}
const handleloading = async () => {
    await getSearchSinger()
}
// 跳转相关页面
const handleMusicDetail = (id: number) => {
    console.log(id);
    // router.push(`/singerdetail/${id}`)
    alert("暂时不做")
}


</script>
  
<style scoped lang="scss">
.singer{
    height: 100%;
    overflow-y: scroll;
}
.selectorItem {
    display: flex;
    flex-wrap: wrap;

    .title {
        width: 50px;
        text-align: center;
        line-height: 36px;
    }
}

.listCardContainer {
    width: 100%;
    display: flex;
    justify-content: center;

    .listCard {
        display: flex;
        flex-wrap: wrap;
        margin: 10px 0;

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
}
</style>
