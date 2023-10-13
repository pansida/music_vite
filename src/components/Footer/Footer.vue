<template>
    <audio :src="musicPlayer.musicUrl ? musicPlayer.musicUrl : ''"
    ref="audioPlayer" 
    @play="changeState(true)"
    @pause="changeState(false)"
    @ended="changeMusic('next')"
    @timeupdate="timeupdate"
    ></audio>
    <div class="left">
        <div class="avatar">
            <img :src="musicPlayer.musicDetail.length!=0? musicPlayer.musicDetail.al.picUrl : avatar" alt="">
        </div>
        <div class="musicInfo" v-if="musicPlayer.musicDetail.length!=0">
            <div class="musicName">{{ musicPlayer.musicDetail.name}}</div>
            <div class="singer">{{ musicPlayer.musicDetail.al.name}}</div>
        </div>
    </div>
    <div class="center">
        <div class="buttons">
            <div @click="musicPlayer.isRandomMusicBack = !musicPlayer.isRandomMusicBack">
                <i class="iconfont" :class="musicPlayer.isRandomMusicBack ? 'icon-suijisenlin' : 'icon-xunhuan'"></i>
            </div>
            <div @click="musicPlayer.musicList.length != 0 ? changeMusic('pre') :''">
                <i class="iconfont icon-shangyishou"></i>
            </div>
            <div @click="musicPlayer.musicList.length != 0 ? changePlayState() : ''">
                <i class="iconfont" :class="musicPlayer.isMusicPlay ? 'icon-weibiaoti519' : 'icon-bofang'"></i>
            </div>
            <div @click="musicPlayer.musicList.length != 0 ? changeMusic('next') :''">
                <i class="iconfont icon-xiayishou"></i>
            </div>
            <div>
                <i class="iconfont icon-xihuan"></i>
            </div>
        </div>
        <div class="progressBar">
            <span class="currentTime">{{ formatTime.getsecondsPro(musicPlayer.currentTime) }}</span>
            <el-slider class="progressSlider"
            v-model="timeProgress"
            :show-tooltip="false"
            :disabled="musicPlayer.musicList.length == 0"
            @change="changeProgress"
            ></el-slider>
            <span class="totalTime">{{ formatTime.getsecondsPro(musicPlayer.duration) }}</span>
        </div>
    </div>
    <div class="right">
        <div class="volumeControl">
            <i class="iconfont icon-soound-min" @click="mutedMusic"></i>
            <el-slider class="progressSlider"
            v-model="mutedProgress" 
            :show-tooltip="false"
            :disabled="musicPlayer.musicList.length == 0"
            @input="changeAudioProgress"
            style="width: 60px;"
            ></el-slider>
        </div>
        <div class="playList">
            <i class="iconfont icon-24gl-playlist"></i>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import avatar from "@/assets/img/test.jpg"
import { ref, watch,} from "vue"
import { useMusicPlayer } from "@/store/MusicPlayer"
import { musicInfo } from "@/request/Music/index"
import { message } from "ant-design-vue";
import { formatTime } from "@/utils/time";
const musicPlayer = useMusicPlayer()
const audioPlayer = ref<HTMLAudioElement>(new Audio())!
const lastSecond =ref(0)
const timeProgress = ref(0)
const mutedProgress = ref(0)

// 点击播放按钮
const changePlayState = () => {
    !musicPlayer.isMusicPlay ? playMusic() : pauseMusic()
}
// 开始或暂停音乐，改变音乐播放状态
const changeState = (state: boolean) => {
    musicPlayer.isMusicPlay = state
}
// 播放音乐
const playMusic = async() => {
        await audioPlayer.value?.play()
}
// 暂停音乐
const pauseMusic = () => {
    audioPlayer.value?.pause()
}
// 静音
const mutedMusic = ()=>{
    audioPlayer.value.muted = !audioPlayer.value.muted
    // 改变声音状态
    audioPlayer.value.muted ? mutedProgress.value = 0 : mutedProgress.value = 100
}
// 获取音乐当前音量进度
const getVolume = () => {
    mutedProgress.value = audioPlayer.value.volume *100
}
// 根据滑块改变声音大小
const changeAudioProgress = (val:number)=>{
    audioPlayer.value.volume = val/100
}
// 根据id找到musiclist中的musicDetail 并获取歌曲总时间
const getMusicDetailFromMusicList = () => {
    let index = musicPlayer.musicList.findIndex((item: any) => {
        return item.id === musicPlayer.musicId
    })
    if (index !== -1) {
        // 获取当前音乐index
        musicPlayer.currentMusicIndex = index
        // 获取当前音乐信息
        musicPlayer.musicDetail = musicPlayer.musicList[index]
        // 获取当前总时间
        musicPlayer.duration = formatTime.getseconds(musicPlayer.musicDetail.dt)
    }

}
// 切换下一首歌
const changeMusic = (type: string, id = '') => {
    if (type === "click") {
        // 点击修改音乐id
        musicPlayer.musicId = id
    }
    else if (type === 'pre') {
        let currentMusicIndex = musicPlayer.currentMusicIndex
        let preIndex: number;
        // 是否随机播放
        if (!musicPlayer.isRandomMusicBack) {
            // 顺序播放
            preIndex = currentMusicIndex - 1 < 0 ? musicPlayer.musicList.length - 1 : currentMusicIndex - 1
        }
        else if (musicPlayer.isRandomMusicBack) {
            // 随机播放
            // 歌曲只有一首情况
            if (musicPlayer.musicList.length === 1) {
                preIndex = currentMusicIndex
            } else {
                preIndex = currentMusicIndex
                // 随机出自己外的歌曲
                while (preIndex == currentMusicIndex) {
                    preIndex = Math.floor(Math.random() * musicPlayer.musicList.length)
                }
            }
        }
        // 更新id
        // @ts-ignore (必定执行，防止报红忽略)
        musicPlayer.musicId = musicPlayer.musicList[preIndex].id

    }
    else if (type === 'next') {
        let currentMusicIndex = musicPlayer.currentMusicIndex
        let nextIndex: number;
        // 是否随机播放
        if (!musicPlayer.isRandomMusicBack) {
            // 顺序播放
            nextIndex = currentMusicIndex + 1 === musicPlayer.musicList.length ? 0 : currentMusicIndex + 1
        }
        else if (musicPlayer.isRandomMusicBack) {
            // 随机播放
            // 歌曲只有一首情况
            if (musicPlayer.musicList.length === 1) {
                nextIndex = currentMusicIndex
            } else {
                nextIndex = currentMusicIndex
                // 随机出自己外的歌曲
                while (nextIndex == currentMusicIndex) {
                    nextIndex = Math.floor(Math.random() * musicPlayer.musicList.length)
                }
            }
        }
        // 更新id
        // @ts-ignore (必定执行，防止爆红忽略)
        musicPlayer.musicId = musicPlayer.musicList[nextIndex].id  
    }
}
// 获取音乐url
const getMusicDetail = async (musicId: string) => {
    // 开始加载音乐
    musicPlayer.isMusicLoad = true
    const res = await musicInfo.getMusicUrl(musicId)
    // 获取不到url
    if (res.data[0].url == null) {
        message.error("该歌曲暂无版权，将为您播放下一首歌曲")
        // 切换到下一首歌
        changeMusic('next')
        return
    } else {
        musicPlayer.musicUrl = res.data[0].url
        // 音乐加载完毕
        musicPlayer.isMusicLoad = false
    }
}
// 获取音乐播放当前时间
const timeupdate = ()=>{
    musicPlayer.currentTime = audioPlayer.value?.currentTime!
    // 取整判断避免进度不动
    if( Math.floor(musicPlayer.currentTime) !== lastSecond.value){
        lastSecond.value = Math.floor(musicPlayer.currentTime)
        musicPlayer.currentTime = Math.floor(musicPlayer.currentTime)
        // 进度百分比
        timeProgress.value = Math.floor(Math.floor(musicPlayer.currentTime)/musicPlayer.duration *100)
    }
}
// 通过拖动进度条改变音乐播放进度
const changeProgress = (val:number)=>{
    musicPlayer.currentTime = val *musicPlayer.duration/100
    audioPlayer.value.currentTime = musicPlayer.currentTime
}
// 监听音乐id变化(设置当前音乐详情、url)
watch(() => musicPlayer.musicId, async(musicId) => {
    // 暂停音乐
    pauseMusic()
    // 根据id找到musiclist中的musicDetail 并获取歌曲总时间
    getMusicDetailFromMusicList()
    // 获取音乐url
    await getMusicDetail(musicId)
    // 播放音乐
    musicPlayer.isMusicPlay = true
    // 获取音乐当前音量
    getVolume()
})
// 监听音乐播放情况
watch(() => musicPlayer.isMusicPlay, (musicPlay) => {
    // 播放状态true
    if (musicPlay) {
        // 播放歌曲
        playMusic()
    } else {
        //暂停歌曲
        pauseMusic()
    }
})
</script>
  
<style scoped lang="scss">
.left {
    display: flex;
    align-items: center;
    width: 200px;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 10px;
    cursor: pointer;

    img {
        width: 100%;
    }
}

.musicInfo {
    color: rgb(37, 37, 37);
    font-size: 14px;
    width: 140px;

    .musicName {
        margin-bottom: 4px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .singer {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
}

.center {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .buttons {
        display: flex;
        align-items: center;
        height: 26px;

        div {
            width: 50px;
            text-align: center;
            margin: 0 5px;
        }

        i {
            font-size: 30px;
            color: #313131;
            ;
        }
    }

    .progressBar {
        display: flex;
        align-items: center;

        .currentTime {
            transform: scale(0.85);
            color: #aaa;
            margin: 0 10px;
            width: 30px;
            text-align: center;
        }

        .totalTime {
            transform: scale(0.85);
            color: #aaa;
            margin: 0 5px;
            width: 30px;
            text-align: center;
        }

        .progressSlider {
            width: 300px;
        }
    }
}

.right {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .volumeControl {
        display: flex;
        align-items: center;
        margin-right: 15px;

        i {
            margin-right: 10px;
            font-size: 20px;
        }
    }
}
</style>
