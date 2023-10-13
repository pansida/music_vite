<template>
    <div class="commentItem" v-for="item in reviewList" :key="item.commentId">
        <div class="commentCreatorAvatar">
            <img :src="item.user.avatarUrl + '?param=100y100'" alt="">
        </div>
        <div class="commentMain">
            <div class="commentContent">
                <span class="commentUserNickName" @click="handleNickName(item)">{{ item.user.nickname }}：</span>
                <span>{{ item.content }}</span>
            </div>
            <div class="replied" v-if="item.beReplied.length !== 0">
                <div v-for="item1 in item.beReplied" class="repliedItem">
                    <span class="repliedUser" @click="handleNickName(item1)">@{{ item1.user.nickname }}：</span>
                    <span class="repliedContent">{{ item1.content }}</span>
                </div>
            </div>
            <div class="commentBottom">
                <div class="commentCreatedTime">{{ item.timeStr }}</div>
                <div class="commentButtons">
                    <div @click="handleCount(item)">
                        <i class="iconfont icon-good"></i>{{ item.likedCount }}
                    </div>
                    <div>
                        <i class="iconfont icon-zhuanfa"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-pinglun"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps} from "vue"
import {useRouter} from "vue-router"
const router = useRouter()
defineProps<{
    reviewList: any
}>()

const handleNickName = (item:any)=>{
    // console.log(item);
    router.push(`/personal/${item.user.userId}`)
}
// 点赞功能
const handleCount = async(item:any)=>{
    console.log(item);
}

</script>
  
<style scoped lang="scss">
.commentItem {
    display: flex;
    margin: 5px 0;
    padding: 10px 0 20px;
    border-bottom: 1px solid #eee;
    font-size: 14px;

    .commentCreatorAvatar {
        width: 40px;
        height: 40px;
        margin-right: 10px;

        img {
            width: 100%;
            border-radius: 50%;
        }
    }

    .commentMain {
        width: calc(100% - 60px);

        .commentUserNickName {
            color: #5a8ab9;
            cursor: pointer;
        }

        .replied {
            background-color: #f4f4f4;
            margin: 7px 0;
            border-radius: 5px;

            .repliedItem {
                padding: 7px 10px;

                .repliedUser {
                    color: #5a8ab9;
                    cursor: pointer;
                }
            }
        }
        .commentBottom{
            display: flex;
            justify-content: space-between;
            margin-top: 2px;
            color: rgb(172, 172, 172);
            .commentButtons{
                display: flex;
                align-items: center;
                div{
                    padding: 0 8px;
                }
            }
        }
    }
}
</style>
