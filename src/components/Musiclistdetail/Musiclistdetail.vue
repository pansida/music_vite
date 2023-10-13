<template>
  <div class="musicListDetail" v-if="musicList">
    <div class="listInfo">
      <div class="listAvatar">
        <img :src="musicList.coverImgUrl" alt="">
      </div>
      <div class="right">
        <div class="title">
          <div class="titleTag">歌单</div>
          <div class="titleContent">{{ musicList.name }}</div>
          <div></div>
        </div>
        <div class="user">
          <div class="userAvatar">
            <img :src="musicList.creator.avatarUrl" alt="">
          </div>
          <div class="userName" @click="handleUSer(musicList.creator.userId)">{{ musicList.creator.nickname }}</div>
          <div class="userCreateTime">{{ formatTime.getFormatTime(musicList.createTime) }}创建</div>
        </div>
        <div class="buttons">
          <div class="buttonPlayListAll" @click="playAll">
            <i class="iconfont icon-bofang"></i>
            播放全部
          </div>
          <div class="buttonShare">
            <i class="iconfont icon-zhuanfa" style="margin-right: 5px;"></i>分享
          </div>
        </div>
        <div class="tags">
          标签：
          <div v-if="musicList.tags.length" style="display: flex;">
            <div v-for="item in musicList.tags" :key="item" class="tag">{{ item }}</div>
          </div>
          <div v-else>
            暂无标签
          </div>
        </div>
        <div class="otherInfo">
          <div class="musicCount">歌曲：{{ musicList.trackCount }}</div>
          <div class="musicPlayCount">播放：{{ musicList.playCount }}</div>
        </div>
        <div class="desc">
          简介：{{ musicList.description ? musicList.description : '暂无简介' }}
        </div>
      </div>
    </div>
    <div class="musicListTab" ref="musicListTabRef">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" v-if="isLoginMusicList">
          <template #tab>
            <span class="tabTitle" :class="activeKey === '1' ? 'active' : ''">歌曲列表</span>
          </template>
          <MusicList :musicList="isLoginMusicList" />
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #tab>
            <span class="tabTitle" :class="activeKey === '2' ? 'active' : ''">评论</span>
          </template>
          <MusicReview v-if="activeKey === '2'"/>
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #tab>
            <span class="tabTitle" :class="activeKey === '3' ? 'active' : ''">收藏者</span>
          </template>
          <MusicCollect v-if="activeKey === '3'"/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
  <GoTop scrollobj=".musicListDetail" button="120px" right="70px" v-if="musicList"/>
</template>
  
<script setup lang="ts">
import GoTop from "../GoTop/GoTop.vue"
import { formatTime } from "@/utils/time"
import { musicInfo } from "@/request/Music/index"
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref,defineAsyncComponent} from "vue"
import { useHeaderStore } from "@/store/header"
import {useMusicPlayer} from "@/store/MusicPlayer"
const MusicList = defineAsyncComponent(()=>import("./MusicList/MusicList.vue"))
const MusicReview = defineAsyncComponent(()=>import("./MusicReview/MusicReview.vue"))
const MusicCollect = defineAsyncComponent(()=>import("./MusicCollect/MusicCollect.vue"))
const musicPlayer = useMusicPlayer()
const isLoginMusicList = ref<any>(null)
const headerStore = useHeaderStore()
const router = useRouter()
const route = useRoute()
const activeKey = ref("1")
let musicList = ref<any>(null)

onMounted(async () => {
  await hanldemusic()
})
// 获取当前音乐歌单 根据登录情况获取歌单
const hanldemusic = async () => {
  const res = await musicInfo.playListDetail(route.params.id as string)
  musicList.value = res.playlist
  if (!headerStore.isLogin) {
    isLoginMusicList.value = res.playlist.tracks
  }else{
    const ids = res.playlist.trackIds.map((item: any) =>item.id).join()
    const newres = await musicInfo.getListIdMusic(ids)
    isLoginMusicList.value = newres.songs
  }
}
// 播放全部歌曲
const playAll = ()=>{
  // 设置歌曲列表
  musicPlayer.musicList = isLoginMusicList.value
  // 判断歌曲播放形式
  if(musicPlayer.isRandomMusicBack){
    console.log(111);
    // 顺序播放
    musicPlayer.musicId = isLoginMusicList.value[0].id
  }else{
    // 随机播放
    console.log(222);
    musicPlayer.musicId = isLoginMusicList.value[Math.floor(Math.random() * isLoginMusicList.value.length)].id
  }
}

// 跳转用户信息
const handleUSer = (id: string) => {
  router.push(`/personal/${id}`)
}
</script> 
  
<style scoped lang="scss">
.musicListDetail {
  padding: 0 15px;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.listInfo {
  display: flex;
  padding: 25px 15px;

  .listAvatar {
    width: 180px;
    height: 180px;
    overflow: hidden;
    border-radius: 10px;
    margin-right: 15px;
    position: relative;

    img {
      width: 100%;
    }
  }

  .right {
    width: calc(100% - 200px);
    flex: 1;

    .title {
      display: flex;
      align-items: center;

      .titleTag {
        font-size: 12px;
        color: #ec4141;
        border: 1px solid #ec4141;
        padding: 1px 2px;
        border-radius: 2px;
        margin-right: 10px;
      }

      .titleContent {
        font-size: 20px;
        font-weight: 600;
        color: #373737;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 90%;
      }
    }

    .user {
      margin-top: 10px;
      display: flex;
      align-items: center;

      .userAvatar {
        width: 25px;
        height: 25px;
        margin-right: 10px;

        img {
          width: 100%;
          border-radius: 50%;
        }
      }

      .userName {
        color: #6191c2;
        margin-right: 15px;
        cursor: pointer;
      }
    }

    .buttons {
      display: flex;
      margin-top: 10px;

      .buttonPlayListAll {
        color: white;
        line-height: 32px;
        text-align: center;
        height: 32px;
        width: 100px;
        border-radius: 16px;
        background-color: #e53f3f;
      }

      .buttonShare {
        text-align: center;
        margin-left: 10px;
        width: 80px;
        line-height: 32px;
        height: 32px;
        border-radius: 16px;
        border: 1px solid #e6e6e6;
      }
    }

    .tags {
      margin-top: 10px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      height: 22px;
      line-height: 22px;

      .tag {
        font-size: 12px;
        width: 40px;
        margin-right: 10px;
        background-color: #e53f3f;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 8px;
        color: white;
      }
    }

    .otherInfo {
      display: flex;
      margin-bottom: 5px;

      .musicCount {
        margin-right: 10px;
      }
    }

    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 150px;
    }
  }
}

.musicListTab {
  padding: 0 15px;

  .tabTitle {
    color: black;
  }
}

.active {
  font-weight: bold;
}
</style>
