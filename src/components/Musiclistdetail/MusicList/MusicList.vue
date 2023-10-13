<template>
    <el-table :data="data" stripe style="width: 100%" :row-key="(row: any) => row.id" highlight-current-row lazy
        :row-class-name="tableRowClassName" @row-dblclick="handleDblclick">
        <el-table-column prop="musicNumber" label="" width="50" />
        <el-table-column prop="musicTitle" label="音乐主题" />
        <el-table-column prop="musicAvatarName" label="歌手" />
        <el-table-column prop="musicAlbum" label="专辑" />
        <el-table-column prop="musicTime" label="时长" />
    </el-table>
    <div v-if="!headerStore.isLogin" class="loginTips">登录后才能查看完整歌单</div>
</template>
<script setup lang="ts">
import { formatTime } from "@/utils/time"
// import { onMounted } from "vue"
import { useHeaderStore } from "@/store/header"
import { useMusicPlayer } from "@/store/MusicPlayer"
const headerStore = useHeaderStore()
const musicPlayer = useMusicPlayer()
const props = defineProps<{
    musicList: any
}>()
const { musicList } = props

const data = musicList.map((item: any, index: number) => {
    return {
        musicNumber: index + 1 < 10 ? '0' + (index + 1) : index + 1,
        musicTitle: item.name,
        musicAvatarName: item.ar[0].name,
        musicAlbum: item.al.name,
        musicTime: formatTime.getMinutes(item.dt),
        musicId: item.id,
        musicAvatarUrl: item.al.picUrl
    }
})
const handleDblclick = async (row: any) => {
    // 获取当前点击歌曲id
    musicPlayer.musicId = row.musicId
    console.log(musicList);
    // 将歌曲列表存入pinia
    musicPlayer.musicList = musicList
}
const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
    return (musicPlayer.musicList[musicPlayer.currentMusicIndex]?.id === musicList[musicPlayer.currentMusicIndex].id && rowIndex === musicPlayer.currentMusicIndex) ? 'active' : ''
}
</script>
  
<style scoped lang="scss">
.loginTips {
    display: flex;
    justify-content: center;
    color: #ccc;
}

.el-table {
    :deep(.el-table__inner-wrapper) {
        .active {
            color: #ec4141
        }
    }
}
</style>
