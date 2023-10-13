<template>
    <div class="ranking">
        <div class="offical" v-if="musicOfficalTop.length !== 0">
            <div class="title">官方榜</div>
            <div v-for="item in 4" :key="item" class="officalItem">
                <div class="listCover" @click="handleMusicDetail(item - 1)">
                    <img :src="musicOfficalTop[item - 1]?.coverImgUrl" alt="">
                </div>
                <div class="listContainer" v-if="musicOfficalTopData.length !== 0">
                    <el-table :data="getData(item - 1)" :show-header="false" empty-text="" stripe
                        @row-dblclick="handleDblclick(item - 1, $event)" :virtual-scroll="true">
                        <el-table-column prop="id" width="50px" />
                        <el-table-column prop="name" />
                        <el-table-column prop="avatar" fixed="right" />
                    </el-table>
                    <div class="checkAll" @click="handleMusicDetail(item - 1)">
                        查看全部
                        <i class="iconfont icon-arrow-right-bold"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="global" v-if="musicGlobalTop.length !== 0">
            <div class="title">全球榜</div>
            <div class="listCard">
                <div v-for="item in musicGlobalTop" :key="item.id" class="listCardItem"
                @click="router.push(`/musiclistdetail/${item.id}`)">
                    <div class="image">
                        <img :src="item.coverImgUrl" alt="">
                    </div>
                    <div class="title">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <GoTop scrollobj=".ranking" button="120px" right="70px" />
</template>
  
<script setup lang="ts">
import GoTop from "@/components/GoTop/GoTop.vue"
import { musicInfo } from "@/request/Music"
import { useMusicPlayer } from "@/store/MusicPlayer";
import { ref, reactive, onMounted } from "vue"
import { useRouter } from "vue-router"
const MusicPlayer = useMusicPlayer()
const router = useRouter()
// 官方榜
let musicOfficalTop = ref<any>([])
// 官方榜歌曲
const musicOfficalTopData = reactive<any>([])
const musicOfficalDetail = reactive<any>([])
// 全球榜
const musicGlobalTop = ref<any>([])
onMounted(async () => {
    await getRanking()
    musicOfficalTop.value.forEach(async (item: any, index: number) => {
        await getMusicListDetail(item.id, index)
    })
})
// 获取榜单
const getRanking = async () => {
    const res = await musicInfo.getMusicTop()
    musicOfficalTop.value = res.splice(0, 4)
    musicGlobalTop.value = res
}
// 获取官方榜歌曲
const getMusicListDetail = async (id: string, index: number) => {
    const res = await musicInfo.playListDetail(id, false);
    musicOfficalTopData[index] = res.playlist.tracks.slice(0, 5)
    musicOfficalDetail[index] = res.playlist.tracks
}

// 获取榜单歌曲
const getData = (index: number) => {
    return musicOfficalTopData[index]?.map((item: any, index: number) => {
        return {
            id: index < 10 ? `0${index + 1}` : index + 1,
            name: item.name,
            avatar: item.ar[0].name,
            musicId: item.id
        }
    })
}
// 跳转歌单
const handleMusicDetail = (index: number) => {
    router.push(`/musiclistdetail/${musicOfficalTop.value[index].id}`)
}
// 双击播放歌曲
const handleDblclick = (index: number, row: any) => {
    MusicPlayer.musicId = row.musicId
    MusicPlayer.musicList = musicOfficalDetail[index]
}
</script>
  
<style scoped lang="scss">
.ranking {
    padding: 0 10px;
    height: 100%;
    overflow-y: scroll;
    .title {
        font-size: 20px;
    }

    .officalItem {
        display: flex;
        margin: 20px 0 50px 0;
        width: 100%;

        .listCover {
            width: 200px;
            height: 200px;
            margin-right: 20px;
            cursor: pointer;

            img {
                width: 100%;
                border-radius: 10px;
            }
        }

        .listContainer {
            width: calc(100% - 220px);
        }

        .checkAll {
            color: rgb(134, 134, 134);
            font-size: 14px;
            transform: scale(0.9) translateX(-5%);
            width: 100px;
            height: 30px;
            line-height: 30px;
            cursor: pointer;
        }
    }
}

.listCard {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;

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
</style>
