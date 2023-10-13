<template>
  <div>
    <div class="swiper" v-if="swiperList">
      <el-carousel :interval="4000" type="card" height="200px" class="carousel">
        <el-carousel-item v-for="item in swiperList" :key="item.targetId">
          <img :src="item.imageUrl" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="RecommendedList" v-if="personalizMusic">
      <div class="RecommendedTitle">推荐歌单<i class="iconfont icon-arrow-right-bold"></i></div>
      <div class="RecommendedContent">
        <div class="Recommended-item" v-for="item in personalizMusic" :key="item.id" @click="handleMusicList(item.id)">
          <img :src="item.picUrl" alt="">
          <div class="Recommended-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { musicInfo } from "@/request/Music";
import { onMounted, ref } from "vue"
import {useRouter} from "vue-router"
const router = useRouter()
const swiperList = ref<any>(null)
const personalizMusic = ref<any>(null)
onMounted(() => {
  getSwiperList()
  getPersonalizList()
})
// 获取swiper图
const getSwiperList = async () => {
  const res = await musicInfo.getSwiperUrl()
  swiperList.value = res.banners
}
// 获取推荐歌单
const getPersonalizList = async () => {
  const res = await musicInfo.getPersonalized()
  personalizMusic.value = res.result
}
// 跳转详情歌单
const handleMusicList = (id:string)=>{
  router.push(`/musiclistdetail/${id}`)
}

</script>
  
<style scoped lang="scss">
.swiper {
  width: 1100px;
  margin: auto;
}

.carousel {
  width: 100%;
}

.el-carousel__item {
  height: 200px;

  img {
    height: 200px;
    border-radius: 20px;
  }
}

.RecommendedList {
  margin-top: 40px;

  .RecommendedTitle {
    font-size: 20px;
    font-weight: bold;
    color: black;
  }
}

.RecommendedContent {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  .Recommended-item {
    margin: 0 2% 20px 0;
    display: flex;
    width: 18%;
    flex-direction: column;
    cursor: pointer;
    img {
      width: 100%;
      border-radius: 10px;
    }

    .Recommended-name {
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
}</style>
