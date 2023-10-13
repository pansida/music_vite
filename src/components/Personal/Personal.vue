<template>
   <div class="user_personal" v-if="userinfo">
      <div class="header_user">
         <img :src="userinfo.profile.avatarUrl" alt="" width="150" height="150"
            style="border-radius: 50%;margin-top: 15px;">
         <div class="header_user_description">
            <div class="user_name_layout">
               <div class="user_name">{{ userinfo.profile.nickname }}</div>
               <a-button type="default" class="layout" :icon="h(LogoutOutlined)" @click="handleLayout">退出登录</a-button>
            </div>
            <div class="level">Lv{{ userinfo.level }}</div>
            <a-divider style="margin: 6px 0;" />
            <div class="dataNums">
               <div class="numItem">
                  <div class="numItemTop">{{ userinfo.profile.eventCount }}</div>
                  <div class="numItemBottom">动态</div>
               </div>
               <div class="numItem">
                  <div class="numItemTop">{{ userinfo.profile.newFollows }}</div>
                  <div class="numItemBottom">关注</div>
               </div>
               <div class="numItem">
                  <div class="numItemTop">{{ userinfo.profile.followeds }}</div>
                  <div class="numItemBottom">粉丝</div>
               </div>
            </div>
            <div class="otherInfo">
               <div class="otherInfoItem">
                  <div class="otherInfoKey">用户id：</div>
                  <div class="ptherInfoValue">{{ userinfo.profile.userId }}</div>
               </div>
               <div class="otherInfoItem">
                  <div class="otherInfoKey">所在地区：</div>
                  <div class="ptherInfoValue">{{ userinfo.profile.province + " " + userinfo.profile.city }}</div>
               </div>
               <div class="otherInfoItem">
                  <div class="otherInfoKey">各人介绍：</div>
                  <div class="ptherInfoValue">{{ userinfo.profile.signature === "" ? "暂无介绍" : userinfo.profile.signature }}
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="musicList">
         <div class="musicListTitle" v-if="createdMusicList.length !== 0">{{ userinfo.profile.nickname }}创建的歌单({{
            createdMusicList.length }})</div>
         <div class="musicListContent">
            <div class="listCardItem" v-for="item in createdMusicList" :key="item.createTime"
               @click="HandleRouter(item.id)">
               <div class="image">
                  <img :src="item.coverImgUrl" alt="">
               </div>
               <div class="title">{{ item.name }}</div>
            </div>
         </div>
         <div class="musicListTitle" v-if="collectedMusicList.length !== 0">{{ userinfo.profile.nickname }}搜藏的歌单({{
            createdMusicList.length }})</div>
      </div>
      <div class="musicListContent">
         <div class="listCardItem" v-for="item in collectedMusicList" :key="item.createTime"
            @click="HandleRouter(item.id)">
            <div class="image">
               <img :src="item.coverImgUrl" alt="">
            </div>
            <div class="title">{{ item.name }}</div>
         </div>
      </div>
   </div>
</template>
  
<script setup lang="ts">
import { LogoutOutlined} from '@ant-design/icons-vue';
import { ref, onBeforeMount, h,watch } from "vue"
import {message} from "ant-design-vue"
import { userInfo } from "@/request/UserInfo/index"
import { useRoute, useRouter } from "vue-router"
import {useHeaderStore} from "@/store/header"
const headerStore = useHeaderStore()
let userinfo = ref<any>(null)
let createdMusicList = ref<any>([])
let collectedMusicList = ref<any>([])
const route = useRoute()
const router = useRouter()
onBeforeMount(async () => {
   await getUserinfo()
   getPlaylist()   
})

watch(()=>route.params.id,async()=>{
   await getUserinfo()
   getPlaylist()
})

// 获取用户信息
const getUserinfo = async () => {
   userinfo.value = await userInfo.getDetail(route.params.id as string)
}

// 获取音乐歌单
const getPlaylist = async () => {
   const {playlist} = await userInfo.getPlaylist(route.params.id as string)
   const index = playlist.findIndex((item: any) => item.subscribed === true)
   createdMusicList.value = playlist.slice(0, index)
   collectedMusicList.value = playlist.slice(index)
}
// 跳转相对应歌单
const HandleRouter = (id: string) => {
   router.push(`/musiclistdetail/${id}`)
}
// 退出登录
const handleLayout = ()=>{
   message.success("退出登录成功！")
   headerStore.isLogin = false
   headerStore.id = ''
   localStorage.removeItem('headerLogin')
   router.push('/')
}

</script>
  
<style scoped lang="scss">
.user_personal {
   padding: 0 15px;
   display: flex;
   height: 82vh;
   flex-direction: column;
   overflow: scroll;

   .header_user {
      margin: 30px 10px;
      display: flex;
      box-sizing: border-box;

      .header_user_description {
         display: flex;
         flex-direction: column;
         margin-left: 20px;
         flex: 1;

         .user_name_layout {
            display: flex;
            justify-content: space-between;

            .user_name {
               color: #373737;
               font-size: 22px;
               font-weight: bold;
            }

            .layout {
               margin-right: 20px;
               border-radius: 20px;
               font-size: 14px;
            }
         }

         .level {
            font-size: 12px;
            padding: 2px 8px;
            width: 40px;
            text-align: center;
            margin: 10px 0;
            background-color: #f0f0f0;
            border-radius: 10px;
            color: #373737;
         }

         .dataNums {
            display: flex;
            margin: 10px 0 5px;
            text-align: center;

            .numItem:first-child {
               border-left: none;
               padding-left: 3px;
               padding-right: 25px;
            }

            .numItem:not(:first-child) {
               border-left: 1px solid #eee;
               padding: 0 25px;
               text-align: center;
               cursor: pointer;
            }

            .numItemTop {
               color: #373737;
               font-size: 22px;
               font-weight: bold;
            }
         }

         .otherInfoItem {
            margin: 5px 0;
            display: flex;

            .otherInfoKey {
               color: #2e2e2e;
            }
         }
      }
   }
}

.musicListTitle {
   color: #373737;
   font-weight: bold;
   font-size: 16px;
}

.musicListContent {
   display: flex;
   flex-wrap: wrap;
   margin: 10px 0;

   .listCardItem {
      width: 18.4%;
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
