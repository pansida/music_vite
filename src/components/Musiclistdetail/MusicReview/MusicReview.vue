<template>
    <div class="review">
        <el-input
        v-model="textarea"
        maxlength="140" 
        :rows="3" 
        placeholder="留下你的评论" 
        show-word-limit
        resize="none"
        type="textarea" />
        <div class="submitCommentButton" @click="sendReview">评论</div>
    </div>
    <div class="commentList" v-if="reviewList">
        <div class="hotComments" v-if="hotComments.length !== 0">
            <div class="title">精彩评论</div>
            <Review :reviewList="hotComments"/>
        </div>
        <div class="hotComments">
            <div class="title">热门评论</div>
            <Review :reviewList="comments"/>
        </div>
    </div>
    <a-pagination v-model:current="current"
    :total="reviewList.total"
    show-less-items
    :pageSize="20"
    :showSizeChanger="false"
    @change="handleChange"
    v-if="reviewList"
    style="display: flex;justify-content: center;"/>
</template>
  
<script setup lang="ts">
import  Review from "@/components/Review/Review.vue"
import { musicInfo } from "@/request/Music";
import { message } from "ant-design-vue";
import {ref,onMounted} from "vue"
import {useRoute} from "vue-router"
const current = ref(1)
const textarea = ref('')
const route = useRoute()
const reviewList = ref<any>(null)
const hotComments = ref<any>(null)
const comments = ref<any>(null)
// 发送评论
const sendReview = async()=>{
    if(!textarea.value){
        message.warning("评论为空！")
        return
    }
    await musicInfo.getComment(2,route.params.id as string,textarea.value,true)
    textarea.value = ''
    message.success("发送成功！")
}
// 获取评论
const handleReview = async(offset=1)=>{
    const res = await musicInfo.getReview(route.params.id as string,offset)
    reviewList.value = res
    hotComments.value = res.hotComments?res.hotComments:[]
    comments.value = res.comments
}
// 分页按钮获取评论
const handleChange = async(page:number)=>{
    hotComments.value.splice(0,0)
    comments.value.splice(0,0)
    await handleReview(page)
}
onMounted(async()=>{
    await handleReview()
})
</script>
  
<style scoped lang="scss">
.review{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .submitCommentButton{
        margin-top: 10px;
        padding: 4px 15px;
        border: 1px solid #DCDFE6;
        border-radius: 15px;
        color: #606266;
        cursor: pointer;
        &:hover{
            background-color: #f2f2f2;
        }
    }
}
.hotComments{
    margin-bottom: 20px;
}
.title{
    font-size: 16px;
    color: rgb(26, 26, 26);
    font-weight: 600;
    padding: 10px 0;
}
</style>
